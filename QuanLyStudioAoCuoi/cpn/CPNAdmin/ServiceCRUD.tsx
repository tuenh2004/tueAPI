import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  RefreshControl, // Thêm Alert từ react-native
} from 'react-native';
import axios from 'axios';
import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';

const ServiceCRUD = () => {
  const [data, setData] = useState([]);
  const [editingNews, setEditingNews] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [imageURI, setImageURI] = useState('');
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.1.27:3000/getListService');
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = () => {
    fetchData();
  };
  const onRefresh = async () => {
    setRefreshing(true);
    // Thực hiện các thao tác cần thiết để làm mới dữ liệu
    await fetchData();
    setRefreshing(false);
  };

  const handleEdit = item => {
    setEditingNews(item);
    setEditedName(item.name);
    setEditedContent(item.content);
    setImageURI(item.image);
    setModalVisible(true);
  };

  const uploadImageToFirebase = async uri => {
    try {
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
      const reference = storage().ref(`images/${filename}`);
      await reference.putFile(uri);
      const downloadURL = await reference.getDownloadURL();
      return downloadURL;
    } catch (error) {
      console.error('Lỗi khi tải ảnh lên Firebase:', error);
    }
  };

  const handleDelete = async id => {
    try {
      Alert.alert(
        'Xác nhận',
        'Bạn có chắc chắn muốn xóa tin tức này không?',
        [
          {
            text: 'Hủy',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Xóa',
            onPress: async () => {
              const news = data.find(item => item._id === id);
              if (news && news.image) {
                // Xóa ảnh trên Firebase trước khi xóa tin tức
                await storage().refFromURL(news.image).delete();
              }
              await axios.delete(
                `http://192.168.1.27:3000/deleteservice/${id}`,
              );
              // Sau khi xóa, cập nhật lại danh sách tin tức
              fetchData();
            },
            style: 'destructive',
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      console.error('Lỗi khi xóa tin tức:', error);
    }
  };

  const selectImage = async () => {
    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 500,
        maxHeight: 500,
      });
      if (!response.didCancel && !response.error) {
        const imageUri = response.assets[0].uri;
        setImageURI(imageUri);
      }
    } catch (error) {
      console.error('Lỗi khi chọn ảnh từ thư viện:', error);
    }
  };

  const handleSave = async () => {
    try {
      let imageURL = editingNews.image; // Giữ nguyên link ảnh cũ mặc định

      // Nếu người dùng đã chọn hình ảnh mới, tải hình ảnh mới lên Firebase và lấy link URL mới
      if (imageURI !== editingNews.image) {
        imageURL = await uploadImageToFirebase(imageURI);
        if (!imageURL) {
          console.error('Không thể tải ảnh lên Firebase');
          return;
        }
      }

      await axios.put(
        `http://192.168.1.27:3000/updateservice/${editingNews._id}`,
        {
          name: editedName,
          content: editedContent,
          image: imageURL,
        },
      );
      setModalVisible(false);
      fetchData();
    } catch (error) {
      console.error('Lỗi khi sửa tin tức:', error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={{marginVertical: 10}}>
        <Text>ID: {item._id}</Text>
        <Text>Tiêu đề: {item.name}</Text>
        <Text>Nội dung: {item.content}</Text>
        <Image
          source={{uri: item.image}}
          style={{width: 100, height: 100, marginVertical: 10}}
        />
        <Button title={'Sửa'} onPress={() => handleEdit(item)} />
        <Button title={'Xóa'} onPress={() => handleDelete(item._id)} />
      </View>
    );
  };

  return (
    <View style={{flex: 1, padding: 10}}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Nhập tiêu đề"
              value={editedName}
              onChangeText={setEditedName}
              style={styles.input}
            />
            <TextInput
              placeholder="Nhập nội dung"
              value={editedContent}
              onChangeText={setEditedContent}
              style={[styles.input, {height: 100}]}
              multiline
            />
            <Button title="Chọn ảnh" onPress={selectImage} />
            {imageURI ? (
              <Image source={{uri: imageURI}} style={styles.image} />
            ) : null}
            <Button title="Lưu" onPress={handleSave} />
            <Button title="Hủy" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.ContenContainer}
        onPress={() => {
          navigation.navigate('AddService', {
            refreshData: fetchData, // Truyền hàm refreshData vào props của Addnews
          });
        }}>
        <Image source={require('../../assets/plus.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  ContenContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F56B3',
    position: 'absolute',
    bottom: 30,
    right: 30,
    borderRadius: 50,
  },
  icon: {
    width: 26,
    height: 26,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});

export default ServiceCRUD;
