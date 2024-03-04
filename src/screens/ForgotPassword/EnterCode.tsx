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
import {setCodeValue} from '@src/redux/actions/appActions';
import {useAppDispatch, useAppSelector} from '@src/redux/hooks';
import {userComformationCode} from '@src/utilis/APIs';
import {isIOS} from '@src/utilis';
import {validateNumber} from '@src/utilis/validator';

const CELL_COUNT = 4;
const EnterCode = ({navigation}: any) => {
  const {email} = useAppSelector(({APPSTATE}) => APPSTATE);

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

  const _userComformationCode = async () => {
    try {
      if (value && value.length === CELL_COUNT) {
        setLoader(true);
        const data = new FormData();
        data.append('token', value);
        {
          validateNumber(email) && data.append('phoneno', email);
        }
        const res = await userComformationCode(data);
        setLoader(false);
        if (res && res.status === 'success') {
          setCodeValue(value)(dispatch);
          navigation.navigate('UpdatePassword');
        } else {
          if (value.length === CELL_COUNT) {
            setCodeErr('This password reset token is invalid.');
          }
          setValueErr(true);
        }
      } else {
        setValueErr(true);
      }
    } catch (err) {
      setLoader(false);
      setValueErr(true);
      setCodeErr(err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loader && <Loader loader={loader} />}
      <BackButton style={{marginTop: 20, marginLeft: isIOS ? 10 : 0}} />
      <View style={styles.secondView}>
        {/* <Text style={styles.register}>
          Enter 4 digit code send to your registered email.
        </Text> */}
        <Text style={styles.register}>Enter 4 digit code sent to {email}.</Text>
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
          <Button onPress={_userComformationCode} name={'Verify'} />
        </View>
        <View style={styles.text}>
          <Text style={{fontSize: 12}}>
            Didn't recieve a verification code?
          </Text>
          <View style={styles.resendView}>
            <TouchableOpacity>
              <Text style={styles.resend}>Resend code </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.resend}>|</Text>
            </TouchableOpacity>
            <TouchableOpacity>
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

export default EnterCode;
