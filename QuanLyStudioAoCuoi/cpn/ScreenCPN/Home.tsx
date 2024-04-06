import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import Slide from '../CustomCPN/Slide.tsx';
import PlusButton from '../CustomCPN/PlusButton.tsx';
import CustomItemService from '../CustomCPN/CustomItemService.tsx';
import CustomItemNews from '../CustomCPN/CustomItemNews.tsx';
import CustomItemReviews from '../CustomCPN/CustomItemReviews.tsx';
import CustomItemVideo from '../CustomCPN/CustomItemVideo.tsx';
import CustomItemProduct from '../CustomCPN/CustomItemProduct.tsx';
import CustomItemAlbum from '../CustomCPN/CustomItemAlbum.tsx';

const Home = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);

  const [featuredData, setFeaturedData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get('http://172.20.10.4:3000/featuredData');
      setFeaturedData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };
  const renderServiceItem = ({item}) => {
    return (
      <View style={styles.featuredItemContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <FlatList
          horizontal
          data={item.items}
          renderItem={({item}) => {
            return <CustomItemService item={item} />;
          }}
          keyExtractor={subItem => subItem.id}
        />
      </View>
    );
  };
  const renderReviewItem = ({item}) => {
    return (
      <View style={styles.featuredItemContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <FlatList
          horizontal
          data={item.items}
          renderItem={({item}) => {
            return <CustomItemReviews item={item} />;
          }}
          keyExtractor={subItem => subItem.id}
        />
      </View>
    );
  };
  const renderVideoItem = ({item}) => {
    return (
      <View style={styles.featuredItemContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <FlatList
          horizontal
          data={item.items}
          renderItem={({item}) => {
            return <CustomItemVideo item={item} />;
          }}
          keyExtractor={subItem => subItem.id}
        />
      </View>
    );
  };
  const renderNewsItem = ({item}) => {
    return (
      <View style={styles.featuredItemContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <FlatList
          horizontal
          data={item.items}
          renderItem={({item}) => {
            return <CustomItemNews item={item} />;
          }}
          keyExtractor={subItem => subItem.id}
        />
      </View>
    );
  };
  const renderProductItem = ({item}) => {
    return (
      <View style={styles.featuredItemContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <FlatList
          horizontal
          data={item.items}
          renderItem={({item}) => {
            return <CustomItemProduct item={item} />;
          }}
          keyExtractor={subItem => subItem.id}
        />
      </View>
    );
  };
  const renderAlbumItem = ({item}) => {
    return (
      <View style={styles.featuredItemContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <FlatList
          horizontal
          data={item.items}
          renderItem={({item}) => {
            return <CustomItemAlbum item={item} />;
          }}
          keyExtractor={subItem => subItem.id}
        />
      </View>
    );
  };

  const renderFeaturedItem = ({item}) => {
    switch (item.title) {
      case 'Dịch vụ nổi bật':
        return renderServiceItem({item});
      case 'Album nổi bật':
        return renderAlbumItem({item});
      case 'Sản phẩm mới nhất':
        return renderProductItem({item});
      case 'Tin tức mới nhất':
        return renderNewsItem({item});
      case 'Video nổi bật':
        return renderVideoItem({item});
      case 'Đánh giá nổi bật':
        return renderReviewItem({item});
      default:
        return null;
    }
  };

  const handleDetail = item => {
    navigation.navigate('DetailService', {item});
  };

  return (
    <View style={styles.container}>
      <Slide />
      <FlatList
        data={featuredData}
        renderItem={renderFeaturedItem}
        keyExtractor={item => item.title}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  featuredItemContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subItem: {
    marginRight: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default Home;
