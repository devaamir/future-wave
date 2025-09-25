/**
 * @format
 */

import React from 'react';
import { AppRegistry, Text, TextInput } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Override Text component to disable font scaling
const originalTextRender = Text.render;
Text.render = function (...args) {
  const origin = originalTextRender.apply(this, args);
  return React.cloneElement(origin, {
    allowFontScaling: false,
  });
};

// Override TextInput component to disable font scaling
const originalTextInputRender = TextInput.render;
TextInput.render = function (...args) {
  const origin = originalTextInputRender.apply(this, args);
  return React.cloneElement(origin, {
    allowFontScaling: false,
  });
};

AppRegistry.registerComponent(appName, () => App);
