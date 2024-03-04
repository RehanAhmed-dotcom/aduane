import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import BackButton from '@src/components/BackButton';
import Button from '@src/components/Button';
import ErrorMessage from '@src/components/ErrorMessage';
import Loader from '@src/components/Loader';
import {userLoggedIn} from '@src/redux/actions/userActions';
import {useAppDispatch} from '@src/redux/hooks';
import {userResendcode, verifyEmail} from '@src/utilis/APIs';

const CELL_COUNT = 4;
const VerifyEmail = ({navigation, route}: any) => {
  const {phone,userdata,email} = route.params;

  const [value, setValue] = useState<string>('');
  const [valueErr, setValueErr] = useState<boolean>(false);
  const [codeErr, setCodeErr] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const _verifyEmail = async () => {
    try {
      if (value && value.length === CELL_COUNT) {
        setLoader(true);
        const data = new FormData();
        data.append('pin', value);
        data.append('email', userdata.email);
        data.append('phoneno', phone);
        const res = await verifyEmail(data);
        setLoader(false);
        if (res && res.status === 'success') {
          userLoggedIn(userdata)(dispatch);
          navigation.navigate('Splash2');
        } else {
          if (value.length === CELL_COUNT) {
            setCodeErr('This verification token is invalid.');
          }
          setValueErr(true);
        }
      } else {
        setValueErr(true);
      }
    } catch (err) {
      console.log("Error",err)
      setLoader(false);
      setValueErr(true);
      setCodeErr(err.message);
    }
  };

  const _userResendRegister = async () => {
      try {
        setLoader(true);
        const data = new FormData();
        data.append('phone', phone);
        data.append('email',userdata.email);
        const res = await userResendcode(data);
        setLoader(false);
        console.log("Regisetttter responce",res)
        if (res && res.status === 'success') {

          // _verifyEmail();
        } 
      } catch (err) {
         console.log('Err while again reg', err);
        // setnumberErr(err.phoneno);
        setLoader(false);
        // errorHandler(err);
      }
    
  };

 
  return (
    <SafeAreaView style={styles.container}>
      {loader && <Loader loader={loader} />}
      {/* <BackButton style={{marginTop: 20}} /> */}
      <View style={styles.secondView}>
        <Text style={styles.register}>
          Enter 4 digit code send to your registered phone number.
        </Text>
      </View>
      <View style={{paddingHorizontal: 25, marginVertical: 20}}>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={text => {
            setValueErr(false);
            setCodeErr('');
            setValue(text);
          }}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View
              // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[
                symbol
                  ? styles.cellRoot
                  : valueErr
                  ? styles.cellRoot2
                  : styles.cellRoot1,
                isFocused && styles.focusCell,
              ]}>
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
      </View>
      {codeErr ? <ErrorMessage message={codeErr} /> : null}
      <View style={styles.lastView}>
        <View
          // onPress={() => navigation.navigate('EnterCode')}
          style={styles.redButton}>
          <Button onPress={_verifyEmail} name={'Verify'} />
        </View>
        <View style={styles.text}>
          <Text style={{fontSize: 12}}>
            Didn't recieve a verification code?
          </Text>
          <View style={styles.resendView}>
            <TouchableOpacity onPress={()=>_userResendRegister()}>
              <Text style={styles.resend}>Resend code </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.resend}>|</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
              <Text style={styles.resend}> Change Email or number</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  secondView: {
    paddingHorizontal: 20,
    marginTop: hp(10),
  },
  register: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  resend: {
    fontSize: 12,
    color: 'red',
  },
  resendView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  lastView: {
    flex: 1,
    marginHorizontal: 25,
  },
  redButton: {
    marginTop: hp(3),
  },
  codeFieldRoot: {
    marginTop: 20,
  },
  focusCell: {
    borderColor: '#000',
  },
  cellRoot: {
    width: 40,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cellRoot2: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'red',
    borderBottomWidth: 1,
  },
  cellRoot1: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#797979',
    borderBottomWidth: 1,
  },
  cellText: {
    color: 'grey',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default VerifyEmail;
