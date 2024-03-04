import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Button from '@src/components/Button';
import ErrorMessage from '@src/components/ErrorMessage';
import Header from '@src/components/Header';
import Loader from '@src/components/Loader';
import TextInput from '@src/components/TextInput';
import {useAppSelector} from '@src/redux/hooks';
import {userChangePassword} from '@src/utilis/APIs';
import {Error} from '@src/utilis/types';
import {Form, isIOS} from '@src/utilis';

const ChangePassword = ({navigation}: any) => {
  const {user} = useAppSelector(({USER}) => USER);

  const [currentPass, setCurrentPass] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [currentPassErr, setCurrentPassErr] = useState<boolean>(false);
  const [passwordErr, setPasswordErr] = useState<boolean>(false);
  const [changePassErr, setChangePassErr] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);

  const _userChangePassword = async () => {
    if (_validate()) {
      try {
        setLoader(true);
        const token = user?.api_token;
        const data = new FormData();
        data.append('old_password', currentPass);
        data.append('password', password);
        data.append('password_confirmation', confirmPassword);
        const res = await userChangePassword({data, token});
        setLoader(false);
        if (res && res.status === 'success') {
          navigation.goBack();
        } else {
          setChangePassErr('Something went wrong! Please try again.');
        }
      } catch (err) {
        setLoader(false);
        errorHandler(err);
      }
    }
  };

  const _validate = () => {
    if (!currentPass && !password && !confirmPassword) {
      resetErrStates(true);
      return false;
    } else if (!currentPass) {
      setCurrentPassErr(true);
      return false;
    } else if (!password) {
      setPasswordErr(true);
      return false;
    } else if (!password && !confirmPassword) {
      setPasswordErr(true);
      return false;
    } else if (password != confirmPassword) {
      setPasswordErr(true);
      return false;
    }
    setChangePassErr('');
    return true;
  };

  const resetErrStates = (error: boolean) => {
    setCurrentPassErr(error);
    setPasswordErr(error);
    setChangePassErr('');
  };

  const errorHandler = (err: Error) => {
    const currentPassErr = err['old_password'];
    const passwordErr = err['password'];
    if (currentPassErr) {
      setChangePassErr(currentPassErr[0]);
    } else if (passwordErr) {
      setChangePassErr(passwordErr[0]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loader && <Loader loader={loader} />}
      <View style={{marginLeft: isIOS ? 10 : 0}}>
        <Header title="Change Password" />
      </View>
      <Form style={{flex: 1}} behavior="padding">
        <View style={styles.secondView}>
          <TextInput
            value={currentPass}
            onChangeText={(text: string) => {
              setCurrentPass(text);
              currentPassErr && resetErrStates(false);
              changePassErr ? setChangePassErr('') : null;
            }}
            Labelcolor={'grey'}
            placeholderColor={'black'}
            borderColor={'#ccc'}
            label={'Old Password'}
            secureTextEntry
            error={currentPassErr}
          />
          <TextInput
            value={password}
            onChangeText={(text: string) => {
              setPassword(text);
              passwordErr && resetErrStates(false);
            }}
            Labelcolor={'grey'}
            placeholderColor={'black'}
            borderColor={'#ccc'}
            label={'New Password'}
            secureTextEntry
            error={passwordErr}
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
            label={'Confirm New Password'}
            secureTextEntry
            error={passwordErr}
          />
        </View>
        <View style={{height: 20}}>
          {changePassErr ? <ErrorMessage message={changePassErr} /> : null}
        </View>
        <View style={styles.BottomView}>
          <View style={styles.redButton}>
            <Button onPress={_userChangePassword} name={'Update Password'} />
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
    paddingHorizontal: isIOS ? 10 : 0,
    marginTop: hp(5),
  },
  BottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 0,
  },
  redButton: {
    marginBottom: hp(3),
    margin: isIOS ? 10 : 0,
  },
});

export default ChangePassword;
