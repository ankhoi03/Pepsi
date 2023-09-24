import {StyleSheet, View, Pressable} from 'react-native';
import React from 'react';
import {Background, Header, RegularText, PepsiList, MyList} from '@components';
import {selectImageUrls, useAppSelector} from '@data';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootMainParamLists} from '@screens/navigation';
import {fonts, images} from '@assets';
import {colors} from '@utils';

type GiftScreenProps = NativeStackScreenProps<RootMainParamLists>;

const _GiftScreen: React.FC<GiftScreenProps> = props => {
  const allImages = useAppSelector(selectImageUrls);
  const {navigation} = props;
  const goBack = () => navigation.goBack();

  const [isTab, setIsTab] = React.useState(true);

  return (
    <Background
      image={allImages[images.Background_Avg]}
      style={styles.background}>
      <Header
        iconBack={true}
        iconLogout={true}
        title={'QUÀ TẶNG'}
        onPressBack={goBack}
      />
      <View style={styles.tab}>
        <Pressable
          onPress={() => setIsTab(true)}
          style={[
            styles.tabButton,
            {backgroundColor: isTab ? colors.red_pepsi : colors.white},
          ]}>
          <RegularText
            content={'Đổi quà'}
            style={[
              styles.tabButtonTitle,
              {color: isTab ? colors.white : colors.red_pepsi},
            ]}
          />
        </Pressable>
        <Pressable
          onPress={() => setIsTab(false)}
          style={[
            styles.tabButton,
            {backgroundColor: !isTab ? colors.red_pepsi : colors.white},
          ]}>
          <RegularText
            content={'Quà của tôi'}
            style={[
              styles.tabButtonTitle,
              {color: !isTab ? colors.white : colors.red_pepsi},
            ]}
          />
        </Pressable>
      </View>
      {isTab ? <PepsiList /> : <MyList />}
    </Background>
  );
};

export const GiftScreen = React.memo(_GiftScreen);

const styles = StyleSheet.create({
  background: {
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: '10%',
    gap: 30,
  },
  tab: {
    width: '85%',
    height: 44,
    borderRadius: 8,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonTitle: {
    fontFamily: fonts.b721,
    fontSize: 18,
    bottom: 3,
  },
});
