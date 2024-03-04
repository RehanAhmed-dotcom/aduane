import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Loader from '@src/components/Loader';
import UpdateInputModal from '@src/components/UpdateInputModal';
import { userLoggedIn } from '@src/redux';
import { useAppDispatch, useAppSelector } from '@src/redux/hooks';
import { userEditProfile } from '@src/utilis/APIs';
import Button from '@src/components/Button';
import { userLoggedOut } from '@src/redux/actions';
import { isIOS } from '@src/utilis';

const Profile = ({ navigation }: any) => {
  const { user } = useAppSelector(({ USER }) => USER);

  const [isVisible, setIsVisible] = useState(false);
  const [phone, setPhone] = useState<string>(user?.phoneno);
  const [phoneErr, setPhoneErr] = useState(false);
  const [loader, setLoader] = useState(false);

  const tabBarHeight = useBottomTabBarHeight();
  const dispatch = useAppDispatch();
  // const {bottom} = useSafeAreaInsets();


  const _userEditProfile = async () => {
    if (_validate()) {
      try {
        setLoader(true);
        const token = user?.api_token;
        const data = new FormData();
        data.append('phoneno', phone);
        const res = await userEditProfile({ data, token });
        setLoader(false);
        setIsVisible(false);
        if (res && res.status === 'success') {
          userLoggedIn(res.userdata)(dispatch);
        }
      } catch (err) {
        setLoader(false);
      }
    }
  };

  const _validate = () => {
    if (!phone.trim()) {
      setPhoneErr(true);
      return false;
    }
    return true;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingBottom: tabBarHeight,
      }}>
      {loader && <Loader loader={loader} />}
      <View
        style={{
          height: hp(25),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.imgContainer}>
          <Image
            source={
              user?.image
                ? { uri: user?.image }
                : require('../../images/placeholder.png')
            }
            style={{ height: 100, width: 100, borderRadius: 50 }}
          />
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{user?.name}</Text>

        <View
          style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
          <Text style={styles.textinfo}>{user?.email}</Text>
        </View>
        {/* {user.phoneno ? <View
          style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
          <Text style={styles.textinfo}>{user?.phoneno}</Text>
          <TouchableOpacity
            onPress={() => setIsVisible(true)}
            style={styles.edit}>
            <Text style={{ fontSize: 12 }}>EDIT</Text>
          </TouchableOpacity>
        </View> : null} */}
      </View>
      <View style={{ paddingLeft: 10, marginTop: 10 }}>
        <Text>User</Text>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('UpdateProfile')}
          style={styles.option}>
          <FontAwesome name="user-alt" size={15} />
          <Text style={{ marginLeft: 30 }}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChangePassword')}
          style={styles.option}>
          <MaterialCommunityIcons name="lock" size={15} />
          <Text style={{ marginLeft: 30 }}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <FontAwesome name="user-alt" size={15} />
          <Text style={{ marginLeft: 30 }}>About Aduane</Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingLeft: 10, marginTop: 10 }}>
        <Text>Finances</Text>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('OrderHistory')}
          style={styles.option}>
          <Image
            resizeMode="contain"
            source={require('../../images/icon_foodtray.png')}
            style={{ height: 15, width: 15 }}
          />
          <Text style={{ marginLeft: 30 }}>Order History</Text>
        </TouchableOpacity>
      </View>

      <UpdateInputModal
        isVisible={isVisible}
        onClose={() => {
          setIsVisible(false);
        }}
        value={phone}
        onChangeText={(text: string) => {
          setPhone(text);
        }}
        error={phoneErr}
        inputProps={{
          keyboardType: 'number-pad',
          returnKeyType: 'done',
        }}
        label={'Mobile Number *'}
        onUpdate={_userEditProfile}
      />

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          marginBottom: isIOS ? tabBarHeight : 20,
          marginHorizontal: isIOS ? 10 : 0,
        }}>
        <Button name="Sign Out" onPress={() => userLoggedOut()(dispatch)} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {},
  imgContainer: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  textinfo: {
    color: 'grey',
  },
  edit: {
    left: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    width: 40,
  },
  edit1: {
    left: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    width: 40,
    marginLeft: 25,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
});
export default Profile;
