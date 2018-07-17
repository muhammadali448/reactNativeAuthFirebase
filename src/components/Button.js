import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Button = ({ onPress, children }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
            onPress={onPress}
                style={styles.button}
            >
                <Text style={{color: 'white'}}> {children} </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#03a9f4',
        padding: 10
    }
}

export default Button;