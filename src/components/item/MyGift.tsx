import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {colors, size} from '@utils';
import {selectImageUrls, useAppSelector} from '@data';
import {fonts, images} from '@assets';
import {FlexText, RegularText} from '@components/text';
import {MyItem} from './interface';

interface ItemProps {
  item: MyItem;
}

const _MyGift: React.FC<ItemProps> = props => {
  const {item} = props;
  const allImages = useAppSelector(selectImageUrls);
  const status = [
    {
      bold: false,
      contentStyle: styles.blueText,
      content: 'Trạng thái: ',
    },
    {
      bold: true,
      contentStyle: styles.greenText,
      content: item.status,
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.topView}>
          <Image source={{uri: item.image}} style={styles.gift} />
        </View>
        <View style={styles.bottomView}>
          <RegularText content={item.name} style={styles.name} />
          <FlexText children={status} />
        </View>
      </View>
      <View style={styles.tagView}>
        <Image source={{uri: allImages[images.ic_tag]}} style={styles.tag} />
        <RegularText
          content={item.quantity.toString()}
          style={styles.tagContent}
        />
      </View>
    </View>
  );
};

export const MyGift = React.memo(_MyGift);

const styles = StyleSheet.create({
  container: {
    width: size.width * 0.4,
    aspectRatio: 2 / 3,
  },
  item: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  topView: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gift: {
    width: size.width * 0.35,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  bottomView: {
    flex: 1,
    gap: 6,
    backgroundColor: colors.yellow_outline,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagView: {
    position: 'absolute',
    top: 12,
    right: -7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tag: {
    width: size.width * 0.175,
    aspectRatio: 1.75 / 1,
    resizeMode: 'contain',
  },
  tagContent: {
    position: 'absolute',
    alignSelf: 'center',
    fontFamily: fonts.b721,
    fontSize: 18,
  },
  name: {
    fontFamily: fonts.b721,
    fontSize: 14,
    color: colors.blue_pepsi,
    lineHeight: 16,
  },
  quantity: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 14,
    color: colors.white,
  },
  blueText: {
    color: colors.blue_pepsi,
    fontSize: 12,
  },
  greenText: {
    color: colors.green,
    fontSize: 12,
  },
});
