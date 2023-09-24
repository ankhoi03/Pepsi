import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {MyGift, MyItem} from '@components/item';
import {selectImageUrls, useAppSelector} from '@data';
import {images} from '@assets';

const _MyList = () => {
  const allImages = useAppSelector(selectImageUrls);
  const ListItem: MyItem[] = [
    {
      id: 1,
      name: 'Pepsi Bucket Hat',
      image: allImages[images.gift_hat],
      quantity: 3,
      status: 'Đã nhận',
    },
    {
      id: 2,
      name: 'Pepsi Jacket',
      image: allImages[images.gift_jacket],
      quantity: 1,
      status: 'Đã nhận',
    },
    {
      id: 3,
      name: 'Pepsi Tumbler',
      image: allImages[images.gift_mugs],
      quantity: 2,
      status: 'Đã nhận',
    },
    {
      id: 4,
      name: 'Sony speaker',
      image: allImages[images.gift_sony],
      quantity: 1,
      status: 'Đã nhận',
    },
  ];
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.list}>
        {ListItem.map(item => (
          <MyGift key={item.id} item={item} />
        ))}
      </View>
    </ScrollView>
  );
};

export const MyList = React.memo(_MyList);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
});
