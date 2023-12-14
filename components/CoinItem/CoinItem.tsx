import React, {FC} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {colors} from 'constants/colors';
import {ICoin} from 'constants/interfaces';

interface ICoinItemProps {
  coin: ICoin;
  changeCurrencyData: (coin: ICoin, type: string) => void;
  type: string;
}

export const CoinItem: FC<ICoinItemProps> = ({
  coin,
  changeCurrencyData,
  type,
}) => {
  return (
    <TouchableOpacity
      style={styles.containerItem}
      onPress={() => changeCurrencyData(coin, type)}>
      <View style={styles.coinName}>
        <Image source={{uri: coin.image}} style={styles.image} />
        <View style={styles.containerNames}>
          <Text style={styles.text}>{coin.name}</Text>
          <Text style={styles.textSymbol}>{coin.symbol}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.textPrice}> ${coin.current_price}</Text>
        {coin.price_change_percentage_24h && (
          <Text
            style={[
              styles.pricePercentage,
              coin.price_change_percentage_24h > 0
                ? styles.priceUp
                : styles.priceDown,
            ]}>
            {coin.price_change_percentage_24h.toFixed(2)}%
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerNames: {
    marginLeft: 10,
  },
  coinName: {
    flexDirection: 'row',
  },
  text: {
    color: colors.white,
  },
  textPrice: {
    color: colors.white,
    fontWeight: 'bold',
  },
  pricePercentage: {
    textAlign: 'right',
  },
  priceUp: {
    color: colors.green,
    fontWeight: 'bold',
  },
  priceDown: {
    color: colors.red,
    fontWeight: 'bold',
  },
  image: {
    width: 25,
    height: 25,
  },
  textSymbol: {
    color: colors.white,
    textTransform: 'uppercase',
  },
});
