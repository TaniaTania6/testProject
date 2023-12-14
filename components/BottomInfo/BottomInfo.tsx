import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from 'constants/colors';
import {ICoin} from 'constants/interfaces';

interface IBottomInfoProps {
  leftCurrencyData: ICoin;
  rightCurrencyData: ICoin;
  rightCurrencyValue: string;
  lastData: string;
}

export const BottomInfo: FC<IBottomInfoProps> = ({
  lastData,
  leftCurrencyData,
  rightCurrencyData,
  rightCurrencyValue,
}) => {
  return (
    <View style={styles.container}>
      <Text
        style={
          styles.exchange
        }>{`1 ${leftCurrencyData.id} = ${rightCurrencyValue} ${rightCurrencyData.id}`}</Text>
      <Text style={styles.dataInfo}>
        {`Данные носят ознакомительный характер ${lastData}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    marginHorizontal: 10,
  },
  exchange: {
    color: colors.black,
  },
  dataInfo: {
    color: colors.gray,
  },
});
