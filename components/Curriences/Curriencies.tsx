/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

import {BottomInfo} from 'components/BottomInfo/BottomInfo';
import {Popup} from 'components/Popup/Popup';
import Screen from 'components/Screen';
import ArrowsHorizontal from 'assets/svg/ArrowsHorizontal';
import ArrowsVertical from 'assets/svg/ArrowsVertical';
import {colors} from 'constants/colors';
import {getDateStringFromUTCString} from 'constants/utils';
import {ICoin} from 'constants/interfaces';

const INIT_DATA = {symbol: '', image: '', id: ''};

export function Currencies(): React.JSX.Element {
  const [coins, setCoins] = useState<ICoin[]>([]);
  const [leftCurrencyValue, setLeftCurrencyValue] = useState<string>('1');
  const [rightCurrencyValue, setRightCurrencyValue] = useState<string>('0');
  const [leftCurrencyData, setLeftCurrencyData] = useState<ICoin>(INIT_DATA);
  const [rightCurrencyData, setRightCurrencyData] = useState<ICoin>(INIT_DATA);
  const [isVisibleLeftModal, setIsVisibleLeftModal] = useState<boolean>(false);
  const [isVisibleRightModal, setIsVisibleRightModal] =
    useState<boolean>(false);
  const [lastData, setLastData] = useState<string>('');
  const InputTypes = {Left: 'left', Right: 'right'};

  const fillCoinsWithData = useCallback(
    (data: any, left: ICoin, right: ICoin, isReverse: boolean) => {
      const findExchangeCoin =
        data.tickers[0].converted_last[right.symbol.toLowerCase()];
      const dynamicValue = +leftCurrencyValue * findExchangeCoin;
      if (!isReverse) {
        setRightCurrencyValue(dynamicValue.toString());
      }
      setLeftCurrencyData({
        image: left.image,
        symbol: left.symbol.toUpperCase(),
        id: left.id,
      });
      setRightCurrencyData({
        image: right.image,
        symbol: right.symbol.toUpperCase(),
        id: right.id,
        convertedLast: data.tickers[0].converted_last,
      });
    },
    [leftCurrencyValue],
  );

  const loadCompareData = useCallback(
    async (left: ICoin, right: ICoin, id = left.id, isReverse = false) => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/tickers`,
      );
      const data = await res.json();
      const formattedDate = getDateStringFromUTCString(
        data.tickers[0].last_fetch_at,
      );
      setLastData(formattedDate);
      getDateStringFromUTCString;
      fillCoinsWithData(data, left, right, isReverse);
    },
    [fillCoinsWithData],
  );

  const loadData = useCallback(async () => {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false',
    );
    const data = await res.json();
    if (data.status) {
      Alert.alert('Failure', data.status.error_message, [
        {text: 'OK', onPress: () => {}},
      ]);
      throw data.status.error_message;
    }
    const filteredCoins = data.filter(
      (coin: ICoin) =>
        coin.symbol.toLowerCase() === 'eth' ||
        coin.symbol.toLocaleLowerCase() === 'btc' ||
        coin.symbol.toLocaleLowerCase() === 'usdt',
    );
    setCoins(filteredCoins);
    loadCompareData(filteredCoins[0], filteredCoins[1]);
  }, [loadCompareData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onChangeInputValue = (value: string, type: string) => {
    if (value === '0') {
      setLeftCurrencyValue('');
      return;
    }
    type === InputTypes.Left && setLeftCurrencyValue(value);
    const symbol =
      rightCurrencyData.symbol === 'usdt' ? 'usd' : rightCurrencyData.symbol;
    const dynamicValue = +rightCurrencyData.convertedLast[symbol.toLowerCase()] * +value;
    setRightCurrencyValue(dynamicValue.toString());
  };

  const changeCurrencyData = (coin: ICoin, type: string) => {
    if (type === InputTypes.Left) {
      loadCompareData(coin, rightCurrencyData, coin.id);
      setLeftCurrencyData(coin);
      setIsVisibleLeftModal(c => !c);
      return;
    }
    setRightCurrencyData({
      ...coin,
      convertedLast: rightCurrencyData.convertedLast,
    });
    const symbol = coin.symbol === 'usdt' ? 'usd' : coin.symbol;
    setRightCurrencyValue(
      rightCurrencyData.convertedLast[symbol.toString()].toString(),
    );
    setIsVisibleRightModal(c => !c);
  };

  const reverseCurrencies = () => {
    loadCompareData(
      rightCurrencyData,
      leftCurrencyData,
      rightCurrencyData.id.toLowerCase(),
      true,
    );

    const copyValue = leftCurrencyValue;
    setLeftCurrencyValue(rightCurrencyValue.toString());
    setRightCurrencyValue(copyValue);
  };

  const renderInput = (type: string) => {
    const image =
      type === InputTypes.Left
        ? leftCurrencyData.image
        : rightCurrencyData.image;
    const symbol =
      type === InputTypes.Left
        ? leftCurrencyData.symbol
        : rightCurrencyData.symbol;

    const isOpen =
      type === InputTypes.Left ? isVisibleLeftModal : isVisibleRightModal;

    const openModal = () => {
      if (type === InputTypes.Left) {
        setIsVisibleLeftModal(c => !c);
      }
      if (type === InputTypes.Right) {
        setIsVisibleRightModal(c => !c);
      }
    };

    return (
      <View style={styles.inputContainer}>
        {type === InputTypes.Left ? (
          <TextInput
            value={leftCurrencyValue}
            style={styles.textInput}
            onChangeText={value => onChangeInputValue(value, type)}
            keyboardType="decimal-pad"
            returnKeyType="done"
          />
        ) : (
          <View style={styles.disabledTextInputWrapper}>
            <Text style={styles.disabledTextInput} numberOfLines={1}>{rightCurrencyValue}</Text>
          </View>
        )}
        <View style={styles.coinContainer}>
          <View style={styles.coinInfoContainer}>
            {image && (
              <Image source={{uri: image || ''}} style={styles.image} />
            )}
            {symbol ? (
              <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
            ) : (
              <Text style={styles.noData}>No {'\n'} data</Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.openModalButton}
            onPress={() => {
              !!coins.length && openModal();
            }}>
            <ArrowsVertical color={colors.black} height={30} width={12} />
          </TouchableOpacity>
        </View>
        {isOpen && (
          <Popup
            isVisible={isOpen}
            dataCoins={coins}
            changeCurrencyData={changeCurrencyData}
            type={type}
          />
        )}
      </View>
    );
  };

  return (
    <Screen>
      <View style={styles.container}>
        {renderInput(InputTypes.Left)}
        <TouchableOpacity
          style={styles.reverseCurrienciesButton}
          onPress={reverseCurrencies}>
          <ArrowsHorizontal color={colors.gray} height={20} width={20} />
        </TouchableOpacity>
        {renderInput(InputTypes.Right)}
      </View>
      <BottomInfo
        lastData={lastData}
        leftCurrencyData={leftCurrencyData}
        rightCurrencyData={rightCurrencyData}
        rightCurrencyValue={rightCurrencyValue}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    zIndex: 1,
  },
  inputContainer: {
    borderColor: colors.borderGray,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    flex: 1,
  },
  textInput: {
    fontWeight: '600',
    flexGrow: 3,
    textAlign: 'right',
    marginRight: 10,
    padding: 5,
    width: '60%',
  },
  disabledTextInputWrapper: {
    flexGrow: 3,
    flexDirection: 'row',
    alignSelf: 'center',
    marginRight: 10,
    padding: 5,
    width: '60%',
  },
  disabledTextInput: {
    fontWeight: '600',
    flexGrow: 3,
    textAlign: 'right',
    width: '60%',
  },
  image: {
    width: 25,
    height: 25,
  },
  coinContainer: {
    flexDirection: 'row',
    borderColor: colors.borderGray,
    borderLeftWidth: 1,
    padding: 5,
  },
  coinInfoContainer: {
    width: '40%',
    alignItems: 'center',
  },
  symbol: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 2,
  },
  noData: {
    textAlign: 'center',
  },
  openModalButton: {
    alignSelf: 'center',
    paddingLeft: 5,
  },
  reverseCurrienciesButton: {
    alignSelf: 'center',
    marginHorizontal: 5,
  },
});
