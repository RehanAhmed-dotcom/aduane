import React, { useState, useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Foundation from 'react-native-vector-icons/Foundation';

import Loader from '@src/components/Loader';
import UpdateInputModal from '@src/components/UpdateInputModal';
import { userLoggedIn } from '@src/redux';
import { useAppDispatch, useAppSelector } from '@src/redux/hooks';
import { userEditProfile } from '@src/utilis/APIs';
import { isIOS } from '@src/utilis';

const UpdateProfile = ({ navigation }: any) => {
  const { user } = useAppSelector(({ USER }) => USER);

  const [name, setName] = useState<string>(user?.name);
  const [nameErr, setNameErr] = useState(false);
  const [address, setAddress] = useState<string>(user?.address);
  const [addressErr, setAddressErr] = useState(false);
  const [isNameVisible, setIsNameVisible] = useState(false);
  const [isAddressVisible, setIsAddressVisible] = useState(false);
  const [img, setImg] = useState('');
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState<boolean>(
    user?.is_notification,
  );
  const [loader, setLoader] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (img) {
      _userEditProfile();
    }
  }, [img]);

  useEffect(() => {
    if (isNotificationsEnabled != user?.is_notification) _userEditProfile();
  }, [isNotificationsEnabled]);

  const _userEditProfile = async () => {
    if (_validate()) {
      try {
        setLoader(true);
        const token = user?.api_token;
        const data = new FormData();
        name && data.append('name', name);
        address && data.append('address', address);
        img &&
          data.append('image', {
            uri: img,
            type: 'image/jpeg',
            name: 'image' + new Date() + '.jpg',
          });
        isNotificationsEnabled && data.append('is_notification', isNotificationsEnabled);
        const res = await userEditProfile({ data, token });
        setIntialStates();
        if (res && res.status === 'success') {
          userLoggedIn(res.userdata)(dispatch);
        }
      } catch (err) {
        console.log("error", err.response)
        setIntialStates();
      }
    }
  };

  const _validate = () => {
    if (isNameVisible && !name.trim()) {
      setNameErr(true);
      return false;
    } else if (isAddressVisible && !address.trim()) {
      setAddressErr(true);
      return false;
    }
    return true;
  };

  const setIntialStates = () => {
    setLoader(false);
    setIsNameVisible(false);
    setIsAddressVisible(false);
    setImg('');
  };

  const choosePic = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImg(image.path);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {loader && <Loader loader={loader} />}
      <View style={styles.containerView}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backIcon}>
          <AntDesign name="left" color="white" size={20} />
        </TouchableOpacity>
        <Text style={styles.register}>Profile </Text>
        <View style={{ width: 30 }}></View>
      </View>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <TouchableOpacity
          onPress={() => {
            choosePic();
          }}
          style={styles.imgContainer}>
          {!img && !user?.image ? (
            <Image
              source={require('../../images/placeholder.png')}
              style={{ height: 100, width: 100, borderRadius: 50 }}
            />
          ) : (
            <Image
              source={{ uri: img ? img : user?.image }}
              style={{ height: 100, width: 100, borderRadius: 50 }}
            />
          )}
          <View style={{ alignItems: 'center', bottom: 15 }}>
            <View style={styles.camera}>
              <EvilIcons name={'camera'} size={15} />
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <View
            style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{user?.name}</Text>
            <TouchableOpacity
              onPress={() => {
                setName(user?.name);
                setNameErr(false);
                setIsNameVisible(true);
              }}
              style={styles.edit}>
              <Text style={{ fontSize: 12 }}>EDIT</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
            <Text style={styles.textinfo}>{user?.address}</Text>
            <TouchableOpacity
              onPress={() => {
                setAddress(user?.address);
                setAddressErr(false);
                setIsAddressVisible(true);
              }}
              style={[styles.edit, { left: 5 }]}>
              <Text style={{ fontSize: 12 }}>EDIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ paddingLeft: 10, marginTop: 30 }}>
        <Text style={{ color: 'grey' }}>NOTIFICATIONS</Text>
      </View>
      <View style={{ paddingHorizontal: 40 }}>
        <View style={styles.option}>
          <View style={styles.option1}>
            <Image
              source={require('../../images/notification_fild_icon.png')}
              style={{ height: 15, width: 15 }}
            />
            <Text style={{ marginLeft: 10 }}>Notification</Text>
          </View>
          <Switch
            trackColor={{ false: 'red', true: 'grey' }}
            thumbColor={isNotificationsEnabled ? 'red' : 'grey'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              setIsNotificationsEnabled(!isNotificationsEnabled);
            }}
            value={isNotificationsEnabled}
          />
        </View>
      </View>
      <View style={{ paddingLeft: 10, marginTop: 30 }}>
        <Text style={{ color: 'grey' }}>MORE</Text>
      </View>
      <View style={{ paddingHorizontal: 40 }}>
        <View style={styles.option}>
          <View style={styles.option1}>
            <AntDesign name="exclamationcircle" size={15} />
            <Text style={{ marginLeft: 10 }}>Report a Problem</Text>
          </View>
          <AntDesign name={'right'} size={10} />
        </View>
        <View style={styles.option}>
          <View style={styles.option1}>
            <AntDesign name="heart" size={15} />
            <Text style={{ marginLeft: 10 }}>Help</Text>
          </View>
          <AntDesign name={'right'} size={10} />
        </View>
        <View style={styles.option}>
          <View style={styles.option1}>
            <Foundation name="info" size={20} />
            <Text style={{ marginLeft: 10 }}>Terms and Conditions</Text>
          </View>
          <AntDesign name={'right'} size={10} />
        </View>
      </View>
      <UpdateInputModal
        isVisible={isNameVisible}
        onClose={() => {
          setIsNameVisible(false);
        }}
        value={name}
        onChangeText={(text: string) => {
          setName(text);
        }}
        error={nameErr}
        inputProps={{
          autoCapitalize: 'words',
        }}
        label={'Full Name *'}
        onUpdate={_userEditProfile}
      />
      <UpdateInputModal
        isVisible={isAddressVisible}
        onClose={() => {
          setIsAddressVisible(false);
        }}
        value={address}
        onChangeText={(text: string) => {
          setAddress(text);
        }}
        error={addressErr}
        inputProps={{
          autoCapitalize: 'sentences',
          multiline: true,
        }}
        label={'Area Address *'}
        onUpdate={_userEditProfile}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  containerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',
  },
  backIcon: {
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    marginLeft: isIOS ? 15 : 0,
  },
  imgContainer: {
    borderRadius: 50,
  },
  register: {
    fontSize: 14,
    marginTop: 5,
  },
  camera: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinfo: {
    color: 'grey',
    width: '85%'
  },
  edit: {
    left: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
    width: 40,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  option1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default UpdateProfile;
