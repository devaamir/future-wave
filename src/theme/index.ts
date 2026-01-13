import { colors } from './colors';
import { fonts, fontSizes } from './fonts';
import { buttonStyles, buttonColors } from './buttonStyles';

export const theme = {
  colors,
  fonts,
  fontSizes,
  defaultFont: fonts.regular,
};

// Gradient presets matching logo colors
export const gradients = {
  flame: ['#E74C3C', '#F39C12', '#F1C40F'],
  teal: ['#4ECDC4', '#26A69A'],
  green: ['#27AE60', '#1E8449'],
  redOrange: ['#E74C3C', '#F39C12'],
};

export { colors, fonts, fontSizes, buttonStyles, buttonColors };
