import React, { FC } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from 'react-native';
import { fontsCatalogue } from '../../assets/fonts/fontsCatalogue';
import { colors } from '../../utils/colors';
import CustomText from './CustomText';


interface Props {
  onPress: () => void;
  label: string | undefined;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
}

const CustomButton: FC<Props> = ({
  onPress = () => { },
  label,
  style,
  labelStyle,
  disabled = false,
  loading = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.buttonStyle,
        disabled && {
          backgroundColor: colors.americanSilver,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <CustomText
          style={[styles.labelstyle, labelStyle]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {label}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonStyle: {
    width: '100%',
    height: (50),
    backgroundColor: colors.mistyNavy,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 48,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  labelstyle: {
    color: colors.white,
    fontSize: (16),
    fontWeight: '600',
    lineHeight: (20),
    fontFamily: fontsCatalogue.Roboto.bold,
  },
});
