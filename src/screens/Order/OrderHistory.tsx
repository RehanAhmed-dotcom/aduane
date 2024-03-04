import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Header from '@src/components/Header';
import Order from '@src/components/Order';
import Loader from '@src/components/Loader';
import {ordersList} from '@src/utilis/APIs';
import {useAppSelector} from '@src/redux/hooks';
import {NavigationProps} from '@src/utilis/types';

const OrderHistory = ({navigation}: NavigationProps) => {
  const {user} = useAppSelector(({USER}) => USER);

  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {});
    _ordersList();
    return unsubscribe;
  }, [navigation]);

  const _ordersList = async () => {
    try {
      const token = user?.api_token;
      setLoader(true);
      const res = await ordersList(token);
      setLoader(false);
      if (res && res.status === 'success') {
        setOrders(res.order_list);
      }
    } catch (error) {
      setLoader(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loader && <Loader loader={loader} />}
      <View style={{paddingHorizontal: 15}}>
        <Header title="Order History" />
      </View>
      <View style={{marginTop: 20}}>
        <Image
          resizeMode="contain"
          source={require('../../images/credit_cards.png')}
          style={{height: 150, width: '100%'}}
        />
      </View>
      <View style={{marginTop: 20, paddingHorizontal: 15}}>
        <Text>Transactions</Text>
      </View>
      <View style={styles.flat}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 35}}
          data={orders}
          renderItem={({item}) => <Order item={item} />}
          keyExtractor={item => `${item.id}`}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flat: {
    height: hp(65),
    marginTop: 20,
    backgroundColor: '#ccc',
    paddingHorizontal: 15,
  },
});

export default OrderHistory;
