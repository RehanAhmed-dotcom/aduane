import React from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';

export default function Loader({loader}: {loader: boolean}) {
  return (
    <Modal transparent={true} animationType={'none'} visible={loader}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator color="red" size={'large'} animating={loader} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
