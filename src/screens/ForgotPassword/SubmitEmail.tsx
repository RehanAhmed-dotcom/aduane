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
import Loader from '@src/components/Loader';
import TextInput from '@src/components/TextInput';
import {setResetPassEmail} from '@src/redux/actions/appActions';
import {useAppDispatch} from '@src/redux/hooks';
import {userForgotPassword} from '@src/utilis/APIs';
import {validateEmail, validateNumber} from '@src/utilis/validator';
import {isIOS} from '@src/utilis';
import ErrorMessage from '@src/components/ErrorMessage';

const SubmitEmail = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [forgotErr, setForgotErr] = useState('');
  const [loader, setLoader] = useState(false);

  const dispatch = useAppDispatch();

  const _userForgotPassword = async () => {
    try {
      if (_validate(email)) {
        setLoader(true);
        const data = new FormData();
        {
          validateEmail(email) && data.append('email', email);
        }
        {
          validateNumber(email) && data.append('phoneno', email);
        }
        const res = await userForgotPassword(data);
        setLoader(false);
        if (res && res.status === 'success') {
          setResetPassEmail(email)(dispatch);
          navigation.navigate('EnterCode');
        } else {
          setForgotErr('Something went wrong! Please try again.');
        }
      }
    } catch (err) {
      setForgotErr(err.message);
      setLoader(false);
    }
  };

  const _validate = (email: string) => {
    if (!validateEmail(email) && !validateNumber(email)) {
      setEmailErr(true);
      return false;
    }
    return true;
  };

  const Form = isIOS ? KeyboardAvoidingView : View;

  return (
    <SafeAreaView style={styles.container}>
      {loader && <Loader loader={loader} />}
      <BackButton style={{marginTop: 20, marginLeft: isIOS ? 10 : 0}} />
      <Form style={{flex: 1}} behavior="padding">
        <View style={styles.secondView}>
          <Text style={styles.register}>Forgot Password</Text>
          <Text style={{color: '#ccc', marginTop: 20}}>
            Please enter your registered email or mobile number to reset your
            password.
          </Text>
          <View>
            <TextInput
              value={email}
              onChangeText={(text: string) => {
                setEmail(text);
                emailErr && setEmailErr(false);
              }}
              Labelcolor={'grey'}
              placeholderColor={'black'}
              borderColor={'#ccc'}
              label={'Email / Mobile Number'}
              error={emailErr}
            />
          </View>
          <ErrorMessage message={forgotErr} />
        </View>
        <View style={styles.BottomView}>
          <View style={styles.redButton}>
            <Button onPress={_userForgotPassword} name={'Recover Password'} />
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

export default SubmitEmail;
