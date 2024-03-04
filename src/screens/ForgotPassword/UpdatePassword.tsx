import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import BackButton from '@src/components/BackButton';
import Button from '@src/components/Button';
import ErrorMessage from '@src/components/ErrorMessage';
import Loader from '@src/components/Loader';
import TextInput from '@src/components/TextInput';
import {useAppSelector} from '@src/redux/hooks';
import {isIOS} from '@src/utilis';
import {userResetPassword} from '@src/utilis/APIs';
import {validateEmail, validateNumber} from '@src/utilis/validator';

const UpdatePassword = ({navigation}: any) => {
  const {email, codeValue} = useAppSelector(({APPSTATE}) => APPSTATE);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErr, setPasswordErr] = useState(false);
  const [confirmPasswordErr, setConfirmPasswordErr] = useState(false);
  const [passwordResetErr, setPasswordResetErr] = useState('');
  const [loader, setLoader] = useState(false);

  const _userResetPassword = async () => {
    if (_validate()) {
      try {
        setLoader(true);
        const data = new FormData();
        {
          validateNumber(email) && data.append('phoneno', email);
        }
        {
          validateEmail(email) && data.append('email', email);
        }

        data.append('token', codeValue);
        data.append('password', password);
        data.append('password_confirmation', confirmPassword);

        const res = await userResetPassword(data);
        setLoader(false);
        if (res && res.status === 'success') {
          navigation.navigate('Login');
        } else {
          setPasswordResetErr('Something went wrong! Please try again.');
        }
      } catch (err) {
        setPasswordResetErr(err.message);
        setLoader(false);
      }
    }
  };

  const _validate = () => {
    if (!password && !confirmPassword) {
      setPasswordErr(true);
      setConfirmPasswordErr(true);
      return false;
    } else if (password != confirmPassword) {
      setPasswordErr(true);
      setConfirmPasswordErr(true);
      return false;
    } else if (!password) {
      setPasswordErr(true);
      return false;
    } else if (!confirmPassword) {
      setPasswordErr(true);
      return false;
    }
    return true;
  };

  const _restErrorState = () => {
    setPasswordErr(false);
    setConfirmPasswordErr(false);
    setPasswordResetErr('');
  };

  const Form = isIOS ? KeyboardAvoidingView : View;

  return (
    <SafeAreaView style={styles.container}>
      {loader && <Loader loader={loader} />}
      <BackButton style={{marginTop: 20, marginLeft: isIOS ? 10 : 0}} />
      <Form style={{flex: 1}} behavior="padding">
        <View style={styles.secondView}>
          <Text style={styles.register}>Reset Password</Text>
          <Text style={{color: '#ccc', marginTop: 20}}>
            Please enter your password
          </Text>

          <TextInput
            value={password}
            onChangeText={(text: string) => {
              setPassword(text);
              passwordErr && _restErrorState();
            }}
            Labelcolor={'grey'}
            placeholderColor={'black'}
            borderColor={'#ccc'}
            label={'New Password'}
            error={passwordErr}
          />

          <TextInput
            value={confirmPassword}
            onChangeText={(text: string) => {
              setConfirmPassword(text);
              confirmPasswordErr && _restErrorState();
            }}
            Labelcolor={'grey'}
            placeholderColor={'black'}
            borderColor={'#ccc'}
            label={'Confirm New Password'}
            error={confirmPasswordErr}
          />

          {passwordResetErr ? (
            <ErrorMessage message={passwordResetErr} />
          ) : null}
        </View>
        <View style={styles.BottomView}>
          <View style={styles.redButton}>
            <Button onPress={_userResetPassword} name={'Recover Password'} />
          </View>
        </View>
      </Form>
    </SafeAreaView>
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
  },
  register: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  BottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  redButton: {
    marginBottom: hp(3),
  },
});

export default UpdatePassword;
