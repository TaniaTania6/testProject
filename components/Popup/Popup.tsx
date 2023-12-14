import React, {useEffect, type FC} from 'react';
import {Keyboard, FlatList, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  ZoomIn,
} from 'react-native-reanimated';
import {colors} from 'constants/colors';
import {CoinItem} from 'components/CoinItem/CoinItem';
import {ICoin} from 'constants/interfaces';

interface IPopupProps {
  isVisible: true;
  dataCoins: ICoin[];
  changeCurrencyData: (coin: ICoin, type: string) => void;
  type: string;
}
const width = Dimensions.get('window').width;

export const Popup: FC<IPopupProps> = ({
  isVisible,
  dataCoins,
  changeCurrencyData,
  type,
}) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(isVisible ? 1 : 0);
    if (!isVisible) {
      Keyboard.dismiss();
    }
  }, [isVisible, opacity]);

  if (!isVisible) {
    return null;
  }

  return (
    <Animated.View
      style={[styles.animatedBlock, {width: width / 2 - 25}]}
      entering={ZoomIn}>
      <FlatList
        data={dataCoins}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <CoinItem
            coin={item}
            changeCurrencyData={changeCurrencyData}
            type={type}
          />
        )}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedBlock: {
    backgroundColor: colors.gray,
    borderRadius: 5,
    position: 'absolute',
    top: 55,
    padding: 10,
    zIndex: 2,
  },
});
