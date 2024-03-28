import React, { memo } from 'react';
import { StyleSheet, TextInput, StyleProp, ViewStyle, TextInputProps, TouchableOpacityProps, ActivityIndicator, TouchableHighlight } from 'react-native';
import Colors from '../../styles/Colors';
import Feather from 'react-native-vector-icons/Feather'
import Font from '../../styles/Font';
import Animated from 'react-native-reanimated';

interface IInput {
    viewStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<ViewStyle>;
    onSearch: TouchableOpacityProps['onPress'];
    loading: boolean;
};

type Input = IInput & TextInputProps;

const Input: React.FC<Input> = ({ viewStyle, inputStyle, onSearch, loading, ...props }) => {

    return (
        <Animated.View style={[styles.container, viewStyle]}>
            <TextInput
                style={[styles.input, inputStyle]}
                placeholderTextColor={Colors.btnBg}
                {...props}
            />
            <TouchableHighlight underlayColor={Colors.btnBg} disabled={loading} onPress={onSearch} style={styles.button} activeOpacity={0.7}>
                {loading ?
                    <ActivityIndicator size={'small'} color={Colors.white} />
                    :
                    <Feather name='chevron-right' size={20} color={Colors.white} />
                }
            </TouchableHighlight>
        </Animated.View>
    )
};

const styles = StyleSheet.create({
    container: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
    },
    input: {
        paddingHorizontal: 10,
        backgroundColor: Colors.white,
        height: "100%",
        width: '70%',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        color: Colors.black,
        fontSize: 14,
        fontFamily: Font.MontserratSemiBold,
    },
    button: {
        width: 40,
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.black,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 1,
        borderColor: Colors.white
    },
});

export default memo(Input);