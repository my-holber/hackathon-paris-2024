import { StyleSheet, TouchableOpacity, View,  ViewStyle, StyleProp } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';


interface ButtonCameraProps {
    onPress: () => void;
    styles?: StyleProp<ViewStyle>;
}
export default function ButtonCamera({ onPress, styles = {} }: ButtonCameraProps) {
    const [isPressed, setIsPressed] = useState(false);

    function _onPress() {
        onPress();
        setIsPressed(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        setTimeout(() => {
            setIsPressed(false);
        }, 300);
    }

    return (
        <TouchableOpacity
            onPress={() => _onPress()}
            style={styles}
        >
            <View style={[ stylesBtn.container, isPressed && stylesBtn.container_pressed ]}>

            </View>
        </TouchableOpacity>
    );
}

const stylesBtn = StyleSheet.create({
    container: {
        borderWidth: 10,
        borderColor: "#007acc",
        color: "#b8ffff",
        width: 100,
        height: 100,
        borderRadius: "50%",
    },
    container_pressed: {
        borderColor: "#008deb",
        transform: [{ scale: 1.1 }],
    },
});