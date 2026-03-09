import { StyleSheet, View } from 'react-native'
import React from 'react'
import CustomPlainModal from './CustomPlainModal'
import { CustomText } from '../atoms'
import { height, width } from '../../utils/utilityFunctions'
import { colors } from '@/utils/colors'

const LoadingModal = ({ isVisible, message = 'Processing...' }: { isVisible: boolean, message?: string }) => {
    return (
        <CustomPlainModal isVisible={isVisible}>
            <View style={styles.container}>
                {/* <Loader /> */}
                <CustomText>{message}</CustomText>
            </View>
        </CustomPlainModal>
    )
}

export default LoadingModal

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        height: height,
        width: width,
    },
})