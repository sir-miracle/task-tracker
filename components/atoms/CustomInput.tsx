import {
  KeyboardType,
  ReturnKeyTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { FC, useState } from 'react';
import { colors } from '../../utils/colors';
import CustomText from './CustomText';
import { Eye, EyeOff } from 'lucide-react-native';
import { fontsCatalogue } from '../../assets/fonts/fontsCatalogue';

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (val: string) => void;
  style?: TextStyle;
  rootStyle?: ViewStyle;
  isForPassword?: boolean;
  keyboardType?: KeyboardType;
  editable?: boolean;
  placeholderStyle?: string;
  onEnterPressed?: () => void;
  returnKeyType?: ReturnKeyTypeOptions;
  disabled?: boolean;
  maxLength?: number;
  numberOfLines?: number;
  multiline?: boolean;
  autoCorrect?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  headerText?: string;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  headerTextStyle?: TextStyle;
  wrapperStyle?: ViewStyle;
  error?: boolean;
  leftIcon?: React.ReactNode;
  onLeftIconPress?: () => void;
  required?: boolean;
}
const CustomInput: FC<Props> = ({
  wrapperStyle,
  headerTextStyle,
  headerText,
  placeholder,
  placeholderStyle,
  value,
  onChangeText = () => { },
  style,
  rootStyle,
  isForPassword = false,
  editable = true,
  maxLength,
  numberOfLines = 1,
  multiline = false,
  autoCorrect = false,
  keyboardType = 'default',
  onEnterPressed = () => { },
  returnKeyType = 'next',
  onBlur = () => { },
  onFocus = () => { },
  rightIcon,
  onRightIconPress,
  error = false,
  leftIcon,
  onLeftIconPress,
  required = false,
}) => {
  const [focus, setFocus] = useState<boolean>(false);
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  return (
    <View style={[{ width: '100%' }, wrapperStyle]}>
      {headerText && (
        <CustomText style={[styles.headerText, headerTextStyle]}>
          {headerText}
          {required && <Text style={styles.required}>*</Text>}
        </CustomText>
      )}
      <View
        style={[
          styles.root,
          focus && styles.focusRoot,
          error && styles.errorRoot,
          rootStyle,
        ]}
      >
        {leftIcon && (
          <View style={{ marginRight: 15, width: '10%' }}>
            <TouchableOpacity onPress={onLeftIconPress}>
              {leftIcon}
            </TouchableOpacity>
          </View>
        )}
        <TextInput
          secureTextEntry={isForPassword && isSecureEntry}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, error && styles.errorInput, style]}
          onFocus={() => {
            setFocus(true);
            onFocus();
          }}
          onBlur={() => {
            setFocus(false);
            onBlur();
          }}
          maxLength={maxLength}
          numberOfLines={numberOfLines}
          multiline={multiline}
          autoCorrect={autoCorrect}
          editable={editable}
          placeholderTextColor={
            placeholderStyle ? placeholderStyle : colors.lightGray
          }
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onSubmitEditing={onEnterPressed}
        />

        {isForPassword && (
          <View style={styles.eyeContainer}>
            <TouchableOpacity
              onPress={() => setIsSecureEntry(!isSecureEntry)}
              style={{ padding: 10 }}
            >
              {
                isSecureEntry ?
                  <Eye size={20} color={colors.overCast} />
                  :
                  <EyeOff size={20} color={colors.overCast} />
              }
            </TouchableOpacity>
          </View>
        )}
        {rightIcon && (
          <View style={styles.eyeContainer}>
            <TouchableOpacity onPress={onRightIconPress}>
              {rightIcon}
            </TouchableOpacity>
          </View>
        )}
        {!isForPassword && !rightIcon && <View style={{ flex: 1 }} />}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  eyeContainer: {
    maxWidth: '20%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  headerText: {
    color: colors.blackPearl,
    fontFamily: fontsCatalogue.Roboto.regular,
    fontWeight: '400',
    fontSize: (16),
    lineHeight: (20),
    marginBottom: 8,
  },
  input: {
    width: '70%',
    color: colors.blackPearl,
    fontWeight: '400',
    fontSize: (16),
    fontFamily: fontsCatalogue.Roboto.regular,
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  root: {
    width: '100%',
    height: (54),
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 'auto',
    marginLeft: 'auto',
    borderWidth: 1,
    borderColor: colors.mistyBlue + '80',
    flexDirection: 'row',
    alignItems: 'center',
  },
  focusRoot: {
    borderColor: colors.mistyNavy,
    borderWidth: 1,
  },
  errorRoot: {
    backgroundColor: colors.gentlePeach,
  },
  errorInput: {
    color: colors.naturalRed,
  },
  required: {
    color: colors.naturalRed,
  },
});
