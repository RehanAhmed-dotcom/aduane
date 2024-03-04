import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Button from '@src/components/Button';
import Loader from '@src/components/Loader';
import TextInput from '@src/components/TextInput';
import { userLoggedIn } from '@src/redux';
import { useAppDispatch } from '@src/redux/hooks';
import { userRegister } from '@src/utilis/APIs';
import { validateEmail, validateNumber } from '@src/utilis/validator';
import BackButton from '@src/components/BackButton';
import { isIOS } from '@src/utilis';
import { NavigationProps } from '@src/utilis/types';
import Header from '@src/components/Header';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Register = ({ navigation }: NavigationProps) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+233');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [hallName, setHallName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [city, setCity] = useState('');
  const [loader, setLoader] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [nameErr, setNameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);
  const [addressErr, setAddressErr] = useState(false);
  const [cityErr, setCityErr] = useState(false);
  const [userRegisterErr, setUserRegisterErr] = useState('');
  const [numberErr, setnumberErr] = useState('');

  const [Loc, setLoc] = useState("")
  const [Lat, setlatitude] = useState("")
  const [Lng, setlongitude] = useState("")

  const dispatch = useAppDispatch();

  const _userRegister = async () => {
    if (_validate()) {
      try {
        setLoader(true);
        const data = new FormData();
        data.append('name', name);
        // data.append('phoneno', phone);
        data.append('phoneno', phone);
        data.append('email', email);
        data.append('password', password);
        data.append('password_confirmation', confirmPassword);
        data.append('address', formatedAddress(address, hallName, roomNumber));
        data.append('city', city);
        {
          hallName && data.append('hall_name', hallName);
        }
        {
          roomNumber && data.append('room_no', roomNumber);
        }
        const res = await userRegister(data);
        console.log("responce inside success", res)
        setLoader(false);
        if (res && res.status === 'success') {
          navigation.navigate('VerifyEmail', {
            phone,
            email,
            userdata: res.userdata
          });
        } else {
          setUserRegisterErr('Something went wrong! Please try again.');
        }
      } catch (err) {
        console.log("responce out success", err)
        console.log('Err', err.phoneno);
        setnumberErr(err.phoneno);
        setLoader(false);
        errorHandler(err);
      }
    }
  };

  const resetErrStates = (error: boolean) => {
    setNameErr(error);
    setEmailErr(error);
    setPasswordErr(error);
    setPhoneErr(error);
    setAddressErr(error);
    setCityErr(error);
    setUserRegisterErr('');
  };

  const _validate = () => {
    if (
      !name.trim() &&
      !validateEmail(email) &&
      !phone &&
      !validateNumber(phone) &&
      !password &&
      !confirmPassword &&
      !address.trim() &&
      !city.trim()
    ) {
      resetErrStates(true);
      return false;
    } else if (!name.trim()) {
      setNameErr(true);
      return false;
    } else if (!validateEmail(email)) {
      setEmailErr(true);
      return false;
    }
    else if (!phone) {
      setPhoneErr(true);
      return false;
    }
    else if (!validateNumber(phone)) {
      setPhoneErr(true);
      return false;
    }
    else if (!password) {
      setPasswordErr(true);
      return false;
    } else if (!password && !confirmPassword) {
      setPasswordErr(true);
      return false;
    } else if (password != confirmPassword) {
      setPasswordErr(true);
      return false;
    } else if (!address.trim()) {
      setAddressErr(true);
      return false;
    } else if (!city.trim()) {
      setCityErr(true);
      return false;
    }
    setUserRegisterErr('');
    return true;
  };

  const errorHandler = (err: any) => {
    const emailErr = err['email'];
    const firstNameErr = err['firstname'];
    const passwordErr = err['password'];
    const phoneErr = err['phoneno'];
    if (emailErr) {
      setUserRegisterErr(emailErr[0]);
    } else if (firstNameErr) {
      setUserRegisterErr(firstNameErr[0]);
    } else if (passwordErr) {
      setUserRegisterErr(passwordErr[0]);
    }
    else if (phoneErr) {
      setUserRegisterErr(phoneErr[0]);
      setnumberErr(phoneErr);
    }
  };

  function formatedAddress(str1: string, str2: string, str3: string) {
    var res = str1 + ' ' + str2 + ' ' + str3;

    return res;
  }

  const Container = isIOS ? SafeAreaView : ScrollView;
  const Form = isIOS ? KeyboardAvoidingView : View;

  return (

    <View style={styles.container}>
      <Form style={{ flex: 1 }} behavior="padding">
        {loader && <Loader loader={loader} />}

        <BackButton style={{ marginTop: 20, marginLeft: isIOS ? 10 : 0 }} />
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.secondView}
          >
          <Text style={styles.register}>Register</Text>

          <TextInput
            value={name}
            onChangeText={(text: string) => {
              setName(text);
              nameErr && resetErrStates(false);
            }}
            Labelcolor={'grey'}
            placeholderColor={'black'}
            borderColor={'#ccc'}
            label={'Full Name *'}
            error={nameErr}
            autoCapitalize="words"
          />
          <TextInput
            value={email}
            onChangeText={(text: string) => {
              setEmail(text);
              emailErr && resetErrStates(false);
            }}
            Labelcolor={'grey'}
            placeholderColor={'black'}
            borderColor={'#ccc'}
            label={'Email *'}
            error={emailErr}
          />
          <View>
            <TextInput
              value={phone}
              onChangeText={(text: string) => {
                setPhone(text);
                phoneErr && resetErrStates(false);
                setnumberErr('');
              }}
              // style={{paddingLeft: 32}}
              Labelcolor={'grey'}
              placeholderColor={'black'}
              borderColor={'#ccc'}
              label={'Mobile Number *'}
              error={phoneErr}
            // keyboardType="phone-pad"
            />
            {/* */}
          </View>
          {/* <View style={{position: 'absolute', top: '28.5%', left: '5%'}}>
            <Text style={{fontSize: 12, color: 'grey', fontWeight: 'bold'}}>
              {numState}
            </Text>
          </View> */}

          <TextInput
            value={password}
            onChangeText={(text: string) => {
              setPassword(text);
              passwordErr && resetErrStates(false);
            }}
            Labelcolor={'grey'}
            placeholderColor={'black'}
            borderColor={'#ccc'}
            label={'Password *'}
            error={passwordErr}
            secureTextEntry
          />
          <TextInput
            value={confirmPassword}
            onChangeText={(text: string) => {
              setConfirmPassword(text);
              passwordErr && resetErrStates(false);
            }}
            Labelcolor={'grey'}
            placeholderColor={'black'}
            borderColor={'#ccc'}
            label={'Confirm Password *'}
            error={passwordErr}
            secureTextEntry
          />
           <GooglePlacesAutocomplete
              styles={{
                container: {
                  borderColor: 'red',
                  color: 'red',
                },
                textInputContainer: {
                  title: 'location',
                  borderColor: 'red',
                  width:"100%",
                  alignSelf: 'center',
                  color: 'red',
                },

                textInput: {
                  width: '100%',
                  height: 40,
                  color: 'black',
                  backgroundColor:null,
                  borderBottomWidth: .5,
                  borderColor: 'grey',
                  paddingLeft:0,
                  borderRadius:2,
                  fontWeight:'bold',
                  fontSize:12,
                  marginTop:20,
                  alignSelf: 'center',
                },
                placeholderStyle: {
                  color: 'red',
                },
              }}
              placeholder="Area address *"
              placeholderTextColor="red"
              minLength={2} // minimum length of text to search
              autoFocus={false}
              returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
              listViewDisplayed={false} // true/false/undefined
              fetchDetails={true}
              onFail={(e)=>console.log("------",e)}
              renderDescription={row => row.description}
              //   keyboardShouldPersistTaps="handled"
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true

           
                setAddress(details.formatted_address);
              }}
              query={{
                key: 'AIzaSyB_QADDoeNBO5RzDF6HtPHhSkj4jnOCwMo',
                language: 'en',
              }}
            />
          {/* <TextInput
            value={address}
            onChangeText={(text: string) => {
              setAddress(text);
              addressErr && resetErrStates(false);
            }}
            Labelcolor={'grey'}
            placeholderColor={'black'}
            borderColor={'#ccc'}
            label={'Area Address *'}
            error={addressErr}
            autoCapitalize="sentences"
          /> */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput
              containerStyle={{ width: '45%' }}
              value={hallName}
              onChangeText={(text: string) => {
                setHallName(text);
              }}
              Labelcolor={'grey'}
              placeholderColor={'black'}
              borderColor={'#ccc'}
              label={'Hall Name'}
              autoCapitalize="sentences"
            />
            <TextInput
              containerStyle={{ width: '45%', marginRight: 10 }}
              value={roomNumber}
              onChangeText={(text: string) => {
                setRoomNumber(text);
              }}
              Labelcolor={'grey'}
              placeholderColor={'black'}
              borderColor={'#ccc'}
              label={'Room Number '}
              autoCapitalize="sentences"
            />
          </View>
          <GooglePlacesAutocomplete
              styles={{
                container: {
                  borderColor: 'red',
                  color: 'red',
                },
                textInputContainer: {
                  title: 'location',
                  borderColor: 'red',
                  width:"100%",
                  alignSelf: 'center',
                  color: 'red',
                

                },

                textInput: {
                  width: '100%',
                  height: 40,
                  color: 'black',
                  backgroundColor:null,
                  borderBottomWidth: .5,
                  borderColor: 'grey',
                  fontWeight:'bold',
                  fontSize:12,
                  paddingLeft:0,
                  borderRadius:2,
                  marginTop:20,
                  alignSelf: 'center',
                },
                placeholderStyle: {
                  color: 'red',
                },
              }}
              placeholder="City *"
              placeholderTextColor="red"
              minLength={2} // minimum length of text to search
              autoFocus={false}
              returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
              listViewDisplayed={false} // true/false/undefined
              fetchDetails={true}
              onFail={(e)=>console.log("------",e)}
              renderDescription={row => row.description}
              //   keyboardShouldPersistTaps="handled"
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true

            
                setCity(details.formatted_address);
                // setlocation(details.formatted_address);
              }}
              query={{
                key: 'AIzaSyB_QADDoeNBO5RzDF6HtPHhSkj4jnOCwMo',
                language: 'en',
              }}
            />
          {/* <TextInput
            value={city}
            onChangeText={(text: string) => {
              setCity(text);
              cityErr && resetErrStates(false);
            }}
            Labelcolor={'grey'}
            placeholderColor={'black'}
            borderColor={'#ccc'}
            label={'City *'}
            error={cityErr}
            autoCapitalize="words"
          /> */}
          {/* {userRegisterErr ? (
            <Text style={{ textAlign: 'center', color: 'red' }}>
              {userRegisterErr}
            </Text>
          ) : null} */}

          {numberErr ? (
            <Text style={{ textAlign: 'center', color: 'red' }}>{numberErr}</Text>
          ) : null}
          <View style={styles.redButton}>
            <Button onPress={_userRegister} name={'Register'} />
          </View>

          <View style={styles.agreement}>
            <Text style={{ fontSize: 12 }}>
              By registering you agree to{' '}
              <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                Terms & Conditions
              </Text>
            </Text>
          </View>
          <View style={styles.agreement1}>
            <Text style={{ fontSize: 12 }}>
              and{' '}
              <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                Privacy Policy
              </Text>
              <Text> of the food</Text>
            </Text>
          </View>
        </ScrollView>
      </Form>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  secondView: {
    paddingHorizontal: 10,
    marginTop: hp(5),
    flexGrow: 1,
    
    paddingBottom: isIOS ? 50 : 50,
  },
  register: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  redButton: {
    marginTop: hp(3),
  },
  agreement: {
    alignItems: 'center',
    marginTop: isIOS ? 10 : 0,

  },
  agreement1: {
    alignItems: 'center',
  },
});
export default Register;
