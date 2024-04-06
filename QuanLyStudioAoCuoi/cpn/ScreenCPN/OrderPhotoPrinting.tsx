import React, {useState} from 'react';
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import axios from 'axios';
import DropdownComponent from '../CustomCPN/DropdownComponent.tsx';

const OrderPhotoPrinting = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [size, setSize] = useState('');

  const onSelectImage = async () => {
    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 500,
        maxHeight: 500,
        selectionLimit: 0,
      });
      if (!response.didCancel && !response.error) {
        const images = response.assets.map(asset => asset.uri);
        setSelectedImages(prevImages => [...prevImages, ...images]);
      }
    } catch (error) {
      console.error('Lỗi khi chọn ảnh từ thư viện:', error);
    }
  };
  const validateOrder = (
    name,
    email,
    address,
    quantity,
    size,
    selectedImages,
  ) => {
    // Kiểm tra xem các trường thông tin đã được điền đầy đủ chưa
    if (
      !name ||
      !email ||
      !address ||
      !quantity ||
      !size ||
      selectedImages.length === 0
    ) {
      return {
        isValid: false,
        message: 'Vui lòng điền đầy đủ thông tin và chọn ít nhất một hình ảnh.',
      };
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        message: 'Email không hợp lệ. Vui lòng nhập đúng định dạng.',
      };
    }

    return {isValid: true};
  };

  const handleSubmit = async () => {
    const validationResult = validateOrder(
      name,
      email,
      address,
      quantity,
      size,
      selectedImages,
    );
    if (!validationResult.isValid) {
      Alert.alert('Lỗi', validationResult.message);
      return;
    }
    try {
      const downloadURLs = await Promise.all(
        selectedImages.map(async uri => {
          const filename = uri.substring(uri.lastIndexOf('/') + 1);
          const reference = storage().ref(`images/${filename}`);
          await reference.putFile(uri);
          return reference.getDownloadURL();
        }),
      );

      console.log('URL của các hình ảnh:', downloadURLs);

      const orderData = {
        name,
        email,
        address,
        quantity,
        size,
        images: downloadURLs, // Thêm URL của hình ảnh vào dữ liệu đơn hàng
      };

      // Gửi dữ liệu đơn hàng cùng URL của hình ảnh lên MongoDB thông qua backend Node.js
      await axios.post('http://192.168.1.27:3000/photoPrinting', orderData);

      Alert.alert('Thông báo', 'Đơn hàng đã được gửi thành công!');
    } catch (error) {
      console.error('Lỗi khi gửi đơn hàng:', error);
      Alert.alert('Lỗi', 'Đã có lỗi xảy ra khi gửi đơn hàng.');
    }
  };
  const handleSizeSelect = selectedSize => {
    setSize(selectedSize);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Đăng kí in ảnh</Text>
        <TextInput
          placeholder="Nhâp tên"
          onChangeText={txt => setName(txt)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          onChangeText={txt => setEmail(txt)}
          style={styles.input}
        />
        <TextInput
          placeholder="Địa chỉ"
          onChangeText={txt => setAddress(txt)}
          style={styles.input}
        />
        <TextInput
          placeholder="Số lượng cần in"
          onChangeText={txt => setQuantity(txt)}
          style={styles.input}
        />
        <DropdownComponent onSizeSelect={handleSizeSelect} />
        <View style={styles.selectedImagesContainer}>
          {selectedImages.map((uri, index) => (
            <Image
              key={index}
              source={{uri}}
              style={styles.image}
              resizeMode="contain"
            />
          ))}
        </View>
        <Button title="Chọn ảnh từ thư viện" onPress={onSelectImage} />
        <Button title="Đăng kí" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  selectedImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default OrderPhotoPrinting;
