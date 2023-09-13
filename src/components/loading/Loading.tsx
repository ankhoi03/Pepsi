import {StyleSheet, ActivityIndicator, View, StatusBar} from 'react-native';
import React from 'react';
import {colors, size} from '@utils';
import {fonts} from '@assets';
import {RegularText} from '@components/text';
import Modal from 'react-native-modal';
import {selectLoadingStatus, useAppSelector} from '@data';

const _Loading = () => {
  const showLoading = useAppSelector(selectLoadingStatus);
  return (
    <>
      {showLoading ? (
        <View style={styles.loading}>
          <StatusBar
            translucent
            backgroundColor={'rgba(0, 0, 0, 0.4)'}
            barStyle={'light-content'}
          />
          <Modal isVisible={true} style={styles.modal} backdropOpacity={0.4}>
            <View style={styles.dialog}>
              <ActivityIndicator size="large" color={colors.blue_01} />
              <RegularText style={styles.loadingText} content="Loading..." />
            </View>
          </Modal>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export const Loading = React.memo(_Loading);

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialog: {
    justifyContent: 'center',
    alignItems: 'center',
    width: size.width * 0.45,
    aspectRatio: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    gap: 10,
  },
  incaditor: {
    color: colors.blue_pepsi,
  },
  loadingText: {
    fontSize: 22,
    fontFamily: fonts.b721,
    color: colors.blue_01,
  },
});
