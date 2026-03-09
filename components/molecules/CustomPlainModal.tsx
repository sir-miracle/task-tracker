import React, { FC } from 'react';
import Modal from 'react-native-modal';
import { StyleSheet, ViewStyle } from 'react-native';
import { height, width } from '../../utils/utilityFunctions';

interface Props {
  isVisible: boolean;
  children: any;
  cancel?: () => void;
  style?: ViewStyle;
}
const CustomPlainModal: FC<Props> = ({
  isVisible = false,
  children,
  cancel,
  style,
}) => {
  return (
    <Modal
      style={[styles.modalRoot, style]}
      isVisible={isVisible}
      onBackdropPress={cancel}
      onBackButtonPress={cancel}
      useNativeDriver
      animationOutTiming={200}
      backdropTransitionOutTiming={0}
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
    >
      {children}
    </Modal>
  );
};

export default CustomPlainModal;

const styles = StyleSheet.create({
  modalRoot: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    marginRight:'auto',
    marginLeft:'auto',
  },
});