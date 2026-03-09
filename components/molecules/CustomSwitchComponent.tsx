import { Switch, View, ViewStyle } from 'react-native'
import React from 'react'
import { colors } from '@/utils/colors'

const CustomSwitchComponent = (
    {
        value,
        onValueChange,
        wrapperStyle
    }:
        {
            value: boolean,
            onValueChange: (value: boolean) => void,
            wrapperStyle?: ViewStyle
        }) => {
    return (
        <View style={[wrapperStyle]}>
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: colors.iceyGray, true: colors.largeGreen }}
                thumbColor={colors.white}
                style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
        </View>
    )
}

export default CustomSwitchComponent
