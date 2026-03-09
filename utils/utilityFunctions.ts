import { Dimensions } from "react-native";

const dimensions = Dimensions.get('window');
export const height = dimensions.height;
export const width = dimensions.width;

export const validateEmail = (email: string): boolean => {
    if (email?.trim()?.length > 0) {
        if (/^\w+([\.+-]?\w+)*@\w+([\.+-]?\w+)*(\.\w{2,3})+$/.test(email.trim())) {
            return true;
        } else return false;
    } else return false;
};

export const validateNumbers = (value: string) => {
    if (Number.isNaN(Number(value))) {
        return false;
    } else {
        return true;
    }
};

export const capitalize = (word: string | undefined) => {
    if (word === undefined || word === null) return '';
    return word?.charAt(0).toUpperCase() + word?.slice(1);
};

