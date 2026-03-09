import React, { FC } from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import { fontsCatalogue } from '../../assets/fonts/fontsCatalogue';
import { colors } from '../../utils/colors';
import { height, width } from '../../utils/utilityFunctions';
import { CustomText } from '../atoms';


interface Props {
  modalVisible: boolean;
  closeModal: () => void;
  children: any;
  headerText?: string;
  scrollOffset?: number;
  style?: ViewStyle;
  isDragToClose?: boolean;
  headerStyle?: ViewStyle;
  headerTextStyle?: TextStyle;
  useConstantHeight?: boolean;
  constantHeight?: number;
  centerHeader?: boolean;
  useTop?: boolean;
  rootStyle?: ViewStyle;
  onModalHide?: () => void;
}
const CustomBottomModal: FC<Props> = ({
  modalVisible,
  closeModal = () => { },
  headerText,
  scrollOffset = 6,
  children,
  style,
  isDragToClose = true,
  headerStyle,
  headerTextStyle,
  useConstantHeight = false,
  constantHeight = height * 0.85,
  centerHeader = false,
  useTop = true,
  rootStyle,
  onModalHide,
}) => {
  return (
    <View>
      <Modal
        animationOut={'zoomOutUp'}
        isVisible={modalVisible}
        coverScreen={true}
        backdropOpacity={0.3}
        onSwipeComplete={closeModal}
        swipeDirection={isDragToClose ? ['down'] : []}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        scrollOffset={scrollOffset}
        propagateSwipe={true}
        style={[styles.modalRoot, style]}
        onModalHide={onModalHide}
      >
        <View
          style={[
            styles.root,
            useConstantHeight && { height: constantHeight },
            rootStyle,
          ]}
        >
          <View style={styles.stud} />
          {useTop && (
            <View style={[styles.top, headerStyle]}>
              {centerHeader && <View />}
              <CustomText style={[styles.header, headerTextStyle]}>
                {headerText}
              </CustomText>
            </View>
          )}
          <View>{children}</View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomBottomModal;

const styles = StyleSheet.create({
  stud: {
    width: 77,
    height: 4,
    backgroundColor: colors.eerieBlack,
    borderRadius: 24,
    alignSelf: 'center',
  },
  top: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 8,
  },
  root: {
    width: width * 0.92,
    minHeight: height * 0.3,
    maxHeight: height * 0.9,
    backgroundColor: colors.white,
    borderRadius: 24,
    paddingBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  modalRoot: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 0,
  },
  header: {
    color: colors.eerieBlack,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    fontFamily: fontsCatalogue.Roboto.regular,
  },
});
