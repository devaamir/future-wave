import { colors, darkColors, useColors } from './colors';
import { fonts, fontSizes } from './fonts';
import { buttonStyles, buttonColors } from './buttonStyles';
import { ThemeProvider, useTheme } from './ThemeContext';

export const theme = {
  colors,
  fonts,
  fontSizes,
  defaultFont: fonts.regular,
};

// Gradient presets matching logo colors
export const gradients = {
  flame: [colors.secondary, colors.accent, colors.yellow],
  teal: [colors.primary, colors.tealActive],
  green: [colors.leafGreen, colors.darkGreen],
  redOrange: [colors.secondary, colors.accent],
};

export { colors, darkColors, useColors, fonts, fontSizes, buttonStyles, buttonColors, ThemeProvider, useTheme };
