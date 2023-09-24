import {StyleSheet, ScrollView, Image} from 'react-native';
import React from 'react';
import {Background, FlexText, Header} from '@components';
import {selectImageUrls, useAppSelector} from '@data';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootMainParamLists} from '@screens/navigation';
import {images} from '@assets';
import {colors, size} from '@utils';

type GuideScreenProps = NativeStackScreenProps<RootMainParamLists>;

const _GuideScreen: React.FC<GuideScreenProps> = props => {
  const allImages = useAppSelector(selectImageUrls);
  const {navigation} = props;
  const goBack = () => navigation.goBack();
  const step1 = [
    {
      bold: true,
      content: 'Bước 1: ',
    },
    {
      bold: false,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius in pulvinar feugiat rutrum libero volutpat.',
    },
  ];
  const step2 = [
    {
      bold: true,
      content: 'Bước 2: ',
    },
    {
      bold: false,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius in pulvinar feugiat rutrum libero volutpat.',
    },
  ];
  const step3 = [
    {
      bold: true,
      content: 'Bước 3: ',
    },
    {
      bold: false,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius in pulvinar feugiat rutrum libero volutpat.',
    },
  ];
  return (
    <Background
      image={allImages[images.Background_Avg]}
      style={styles.background}>
      <Header
        iconBack={true}
        iconLogout={true}
        title={'HƯỚNG DẪN'}
        onPressBack={goBack}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <Image
          source={{uri: allImages[images.guide_1]}}
          style={styles.banner}
        />
        <FlexText children={step1} style={styles.text} />
        <Image
          source={{uri: allImages[images.guide_2]}}
          style={styles.banner}
        />
        <FlexText children={step2} style={styles.text} />
        <Image
          source={{uri: allImages[images.guide_3]}}
          style={styles.banner}
        />
        <FlexText children={step3} style={styles.text} />
      </ScrollView>
    </Background>
  );
};

export const GuideScreen = React.memo(_GuideScreen);

const styles = StyleSheet.create({
  background: {
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: '10%',
    gap: 16,
  },
  scrollView: {
    alignItems: 'center',
    gap: 16,
  },
  banner: {
    width: size.width * 0.8,
    aspectRatio: 1,
    borderRadius: 12,
    resizeMode: 'contain',
  },
  text: {
    color: colors.white,
    fontSize: 18,
    width: size.width * 0.7,
    textAlign: 'center',
    lineHeight: 24,
  },
});
