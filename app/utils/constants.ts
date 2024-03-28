import { Dimensions } from "react-native";

const { height: screenHeight, width: screenWidth } = Dimensions.get('window')

const wait = async (ms: number = 300) => await new Promise(res => setTimeout(res, ms));

const constants = {
    screenHeight,
    screenWidth,
    wait
};

export default constants;