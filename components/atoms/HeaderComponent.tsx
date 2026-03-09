import { Pressable, StyleSheet, View, ViewStyle } from 'react-native'
import React from 'react'
import { colors } from '@/utils/colors'
import { fontsCatalogue } from '../../assets/fonts/fontsCatalogue'
import { ChevronLeft, X } from 'lucide-react-native'
import CustomText from './CustomText'


const HeaderComponent = ({
    title,
    onGoBack,
    showBackButton = true,
    useCloseIcon = false,
    hasProfilePics = false,
    onProfilePicPress = () => { },
    backButtonStyle = {},
    backButtonIconColor
}:
    {
        title: string,
        onGoBack: () => void,
        showBackButton?: boolean,
        useCloseIcon?: boolean,
        hasProfilePics?: boolean
        onProfilePicPress?: () => void
        profileUrl?: string
        backButtonStyle?: ViewStyle
        backButtonIconColor?: string
    }) => {
    const iconColor = backButtonIconColor || colors.eerieBlack;

    return (
        <View style={styles.row}>
            {showBackButton && (
                <Pressable
                    onPress={hasProfilePics ? onProfilePicPress : onGoBack}
                    hitSlop={12}
                    style={[styles.backButton, backButtonStyle]}
                >
                    {useCloseIcon ? (
                        <X size={24} color={iconColor} strokeWidth={2} />
                    ) : (
                        <ChevronLeft size={24} color={iconColor} strokeWidth={2} />
                    )}
                </Pressable>
            )}
            <CustomText style={styles.title}>
                {title}
            </CustomText>
        </View>
    )
}

export default HeaderComponent

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        width: '100%',
    },
    title: {
        fontFamily: fontsCatalogue.Roboto.medium,
        fontSize: 16,
        fontWeight: '500',
        color: colors.mistyNavy
    },
    backButton: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 100,
        width: 34,
        height: 34,
        shadowColor: colors.eerieBlack,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5,
    }
})