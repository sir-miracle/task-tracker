import { StyleSheet, TextInput, TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native'
import React, { } from 'react'
import { Search } from 'lucide-react-native'

const SearchComponent = (
    { placeholder = 'Search',
        onFocus = () => { },
        onBlur = () => { },
        onSearch = () => { },
        setSearchText,
        searchText,
        style,
        ...props
    }: {
        placeholder?: string,
        onFocus?: () => void,
        onBlur?: () => void,
        onSearch?: () => void,
        setSearchText: (text: string) => void,
        searchText: string,
        style?: ViewStyle,
        props?: ViewProps
    }) => {

    return (
        <View
            className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3"
            {...props}
            style={[styles.container, style]}
        >
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                className="flex-1 text-gray-800"
                value={searchText}
                onChangeText={(text) => setSearchText(text)}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <TouchableOpacity onPress={onSearch}>
                <Search size={20} color="#9CA3AF" />
            </TouchableOpacity>
        </View>
    )
}

export default SearchComponent

const styles = StyleSheet.create({
    container: {},
})