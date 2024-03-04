import React, { useState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';

import Button from '@src/components/Button';
import Loader from '@src/components/Loader';
import TextInput from '@src/components/TextInput';
import { userLoggedIn } from '@src/redux';
import { Form } from '@src/utilis';
import { userLogin } from '@src/utilis/APIs';
import { validateEmail } from '@src/utilis/validator';

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const [emailErr, setEmailErr] = useState<boolean>(false);
  const [passwordErr, setPasswordErr] = useState<boolean>(false);
  const [loginErr, setLoginErr] = useState<string>('');

  const dispatch = useDispatch();

  const _userLogin = async () => {
    if (_validate()) {
      try {
        setLoader(true);
        const data = new FormData();
        data.append('email', email);
        data.append('password', password);
        const res = await userLogin(data);
        setLoader(false);
        if (res && res.status === 'success') {
          userLoggedIn(res.userdata)(dispatch);
          navigation.navigate('Splash2');
        } else {
          setLoginErr('Something went wrong! Please try again.');
        }
      } catch (err: any) {
        console.log("Error", err.response)
        setLoader(false);
        setLoginErr(err.message);
      }
    }
  };

  const _validate = () => {
    if (!validateEmail(email) && !password) {
      resetErrStates(true);
      return false;
    } else if (!validateEmail(email)) {
      setEmailErr(true);
      return false;
    } else if (!password) {
      setPasswordErr(true);
      return false;
    }
    setLoginErr('');
    return true;
  };

  const resetErrStates = (error: boolean) => {
    setEmailErr(error);
    setPasswordErr(error);
    setLoginErr('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {loader && <Loader loader={loader} />}
      <ImageBackground
        source={require('@src/images/LoginImg.png')}
        resizeMode="cover"
        style={styles.backImg}>

        {/* <Image source={{ uri: "https://allkevindesign.online/assets/images/product-images/76746_.jpg" }} style={{ height: 100, width: 200 }} /> */}
        <View style={styles.firstView} />
        <Form style={{ flex: 1 }} behavior="padding">
          <View style={styles.secondView}>
            <TextInput
              value={email}
              onChangeText={(text: string) => {
                setEmail(text);
                emailErr && resetErrStates(false);
              }}
              Labelcolor={'white'}
              placeholderColor={'white'}
              borderColor={'white'}
              label={'Email ID/Number'}
              error={emailErr}
            />

            <TextInput
              value={password}
              onChangeText={(text: string) => {
                setPassword(text);
                passwordErr && resetErrStates(false);
              }}
              Labelcolor={'white'}
              placeholderColor={'white'}
              borderColor={'white'}
              label={'Password'}
              error={passwordErr}
              secureTextEntry
            />

            <TouchableOpacity
              onPress={() => navigation.navigate('SubmitEmail')}
              style={styles.forgot}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
            onPress={() => navigation.navigate('TabNavigator')}
            style={styles.skip}>
            <Text style={styles.forgotText}>Skip</Text>
          </TouchableOpacity> */}
            <View style={styles.redButton}>
              <Button onPress={_userLogin} name={'Login'} />
            </View>
            {loginErr ? (
              <Text style={{ textAlign: 'center', color: 'red', top: 10 }}>
                {loginErr}
              </Text>
            ) : null}
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              style={styles.register}>
              <Text style={styles.forgotText}>
                Don't have an account?
                <Text style={styles.red}> Register Now</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </Form>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backImg: {
    height: '100%',
    width: '100%',
  },
  firstView: {
    flex: 0.8,
  },
  secondView: {
    flex: 1,
    marginHorizontal: 20,
  },
  emailUpperText: {
    color: 'white',
    fontSize: 12,
  },
  emailInput: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    fontSize: 12,
    color: 'white',
    height: 40,
  },
  emailLowerText: {
    color: 'white',
    marginTop: hp(5),
    fontSize: 12,
  },
  passInput: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    fontSize: 12,
    color: 'white',
    height: 40,
  },
  forgotText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  forgot: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  skip: {
    alignItems: 'center',
    marginTop: 5,
  },
  register: {
    alignItems: 'center',
    marginTop: hp(4),
  },
  red: {
    color: 'red',
  },
  redButton: {
    marginTop: 10,
  },
});

export default Login;
