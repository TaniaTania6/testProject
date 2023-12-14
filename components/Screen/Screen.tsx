import React, {FunctionComponent, PropsWithChildren} from 'react';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import {colors} from 'constants/colors';

type Props = {
  style?: StyleProp<ViewStyle>;
} & PropsWithChildren;

const Screen: FunctionComponent<Props> = ({children, style}) => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={[styles.screen, style, {marginTop: insets.top}]}>
      {children}
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
