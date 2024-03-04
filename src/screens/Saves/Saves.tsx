import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import SaveItem from '@src/components/SaveItem';
import {useAppSelector} from '@src/redux/hooks';
import {isIOS} from '@src/utilis';
import {favoritesList, toggleFavorite} from '@src/utilis/APIs';
import {IRestaurant} from '@src/utilis/types';
import Loader from '@src/components/Loader';
import FallbackText from '@src/components/FallBackText';

const Saves = ({navigation}: any) => {
  const {user} = useAppSelector(({USER}) => USER);

  const [favorites, setFavorites] = useState([]);
  const [loader, setLoader] = useState(false);

  const token = user?.api_token;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      _favoritesList();
    });

    return unsubscribe;
  }, [navigation]);

  const _favoritesList = async () => {
    try {
      setLoader(true);
      const res = await favoritesList(token);
      setLoader(false);
      if (res && res.status === 'success') {
        setFavorites(res.favourite);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  const _toggleFavorite = async (id: number | undefined) => {
    try {
      const data = new FormData();
      data.append('restaurant_id', id);
      const res = await toggleFavorite({data, token});
      if (res && res.status === 'success') {
        _favoritesList();
      }
    } catch (error) {}
  };

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingBottom: tabBarHeight,
      }}>
      {loader && <Loader loader={loader} />}
      <View style={styles.topView}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Saves</Text>
        <Image
          source={
            user?.image
              ? {uri: user?.image}
              : require('@src/images/placeholder.png')
          }
          style={styles.img}
        />
      </View>
      {!loader && !favorites.length && (
        <FallbackText message="Restaurants not saved yet." />
      )}
      <View style={styles.bottomView}>
        <FlatList
          data={favorites}
          renderItem={({item}: {item: IRestaurant}) => (
            <SaveItem
              id={item.id}
              thumbnail={item.thumbnail}
              title={item.title}
              onPress={() => navigation.navigate('Details', {restaurant: item})}
              toggleFavorite={() => _toggleFavorite(item.restaurant_id)}
              admin_rate={item.admin_rate}
              is_off_notification={true}
            />
          )}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topView: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    marginLeft: isIOS ? 10 : 0,
  },
  img: {
    height: 30,
    width: 30,
    marginRight: isIOS ? 10 : 0,
    borderRadius: 30,
  },
  bottomView: {
    marginTop: 10,
  },
});
export default Saves;
