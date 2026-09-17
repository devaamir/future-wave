import React from 'react';
import { Keyboard, TouchableWithoutFeedback, View, StyleProp, ViewStyle } from 'react-native';

interface DismissKeyboardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

/**
 * Wraps its children in a TouchableWithoutFeedback that dismisses
 * the keyboard when the user taps outside any text input.
 */
const DismissKeyboard: React.FC<DismissKeyboardProps> = ({ children, style }) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={[{ flex: 1 }, style]}>{children}</View>
  </TouchableWithoutFeedback>
);

export default DismissKeyboard;
