import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Coin} from '@components/coin';
import {GiftItem, PepsiItem} from '@components/item';
import {selectImageUrls, useAppSelector} from '@data';
import {images} from '@assets';

const _PepsiList = () => {
  const allImages = useAppSelector(selectImageUrls);
  const ListItem: PepsiItem[] = [
    {
      id: 1,
      name: 'Pepsi Bucket Hat',
      image: allImages[images.gift_hat],
      price: 80,
      quantity: 600,
    },
    {
      id: 2,
      name: 'Pepsi Jacket',
      image: allImages[images.gift_jacket],
      price: 300,
      quantity: 10,
    },
    {
      id: 3,
      name: 'Pepsi Tote Bag',
      image: allImages[images.gift_bag],
      price: 100,
      quantity: 10,
    },
    {
      id: 4,
      name: 'Pepsi Tumbler',
      image: allImages[images.gift_mugs],
      price: 300,
      quantity: 300,
    },
    {
      id: 5,
      name: 'Electronic lunch bo',
      image: allImages[images.gift_electronic],
      price: 700,
      quantity: 10,
    },
    {
      id: 6,
      name: 'Sony speaker',
      image: allImages[images.gift_sony],
      price: 1000,
      quantity: 10,
    },
  ];
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Coin />
      <View style={styles.list}>
        {ListItem.map(item => (
          <GiftItem key={item.id} item={item} />
        ))}
      </View>
    </ScrollView>
  );
};

export const PepsiList = React.memo(_PepsiList);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 16,
    gap: 16,
  },
});
