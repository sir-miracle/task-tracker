import React, { FC } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fontsCatalogue } from '../../assets/fonts/fontsCatalogue';

interface Props extends TextProps {
  style?: StyleProp<TextStyle>;
  noLineHeight?: boolean;
  children?: string | React.ReactNode;
}

const CustomText: FC<Props> = ({ style, noLineHeight, children, ...props }) => {
  return (
    <Text
      {...props}
      style={[styles.textStyle, !noLineHeight && styles.lineHeight, style]}
    >
      {children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  textStyle: {
    color: colors.matteGraphite,
    fontSize: 12,
    fontWeight: '400',
    fontFamily: fontsCatalogue.Roboto.regular,
    lineHeight: 20,
  },
  lineHeight: {
    lineHeight: 20,
  },
});
