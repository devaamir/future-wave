import { StyleSheet } from 'react-native';
import { theme } from './index';
import { colors } from './';

export const buttonStyles = StyleSheet.create({
  // Primary gradient button (main actions) - Teal to darker teal
  primaryGradient: {
    borderRadius: 12,
  },
  primaryGradientColors: [colors.primary, colors.tealActive],
  primaryGradientStart: { x: 0, y: 0 },
  primaryGradientEnd: { x: 1, y: 0 },
  
  // Secondary gradient button (banners, highlights) - Red to orange flame
  secondaryGradient: {
    borderRadius: 12,
  },
  secondaryGradientColors: [colors.secondary, colors.accent],
  secondaryGradientStart: { x: 0, y: 0 },
  secondaryGradientEnd: { x: 1, y: 0 },
  
  // Accent gradient (flame effect) - Full flame gradient
  accentGradient: {
    borderRadius: 12,
  },
  accentGradientColors: [colors.secondary, colors.accent, colors.yellow],
  accentGradientStart: { x: 0, y: 0 },
  accentGradientEnd: { x: 1, y: 0 },
  
  // Button content padding
  buttonContent: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  
  // Button text styles
  buttonText: {
    fontSize: 14,
    fontFamily: theme.fonts.bold,
    color: colors.white,
  },
  
  // Outlined button
  outlinedButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center' as const,
    backgroundColor: 'transparent',
  },
  
  outlinedButtonText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: colors.primary,
  },
  
  // Small button variants
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  
  smallButtonText: {
    fontSize: 12,
    fontFamily: theme.fonts.bold,
    color: colors.white,
  },
  
  // Floating action button
  floatingButton: {
    position: 'absolute' as const,
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowColor: colors.blackShort,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  
  floatingButtonContent: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
});

export const buttonColors = {
  primary: [colors.primary, colors.tealActive],        // Teal gradient
  secondary: [colors.secondary, colors.accent],      // Red to orange
  accent: [colors.secondary, colors.accent, colors.yellow], // Full flame gradient
  success: colors.leafGreen,                     // Green from logo
  warning: colors.accent,                     // Orange from flame
  error: colors.secondary,                       // Red from logo
};
