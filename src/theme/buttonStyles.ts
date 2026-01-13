import { StyleSheet } from 'react-native';
import { theme } from './index';

export const buttonStyles = StyleSheet.create({
  // Primary gradient button (main actions) - Teal to darker teal
  primaryGradient: {
    borderRadius: 12,
  },
  primaryGradientColors: ['#4ECDC4', '#26A69A'],
  primaryGradientStart: { x: 0, y: 0 },
  primaryGradientEnd: { x: 1, y: 0 },
  
  // Secondary gradient button (banners, highlights) - Red to orange flame
  secondaryGradient: {
    borderRadius: 12,
  },
  secondaryGradientColors: ['#E74C3C', '#F39C12'],
  secondaryGradientStart: { x: 0, y: 0 },
  secondaryGradientEnd: { x: 1, y: 0 },
  
  // Accent gradient (flame effect) - Full flame gradient
  accentGradient: {
    borderRadius: 12,
  },
  accentGradientColors: ['#E74C3C', '#F39C12', '#F1C40F'],
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
    color: '#FFFFFF',
  },
  
  // Outlined button
  outlinedButton: {
    borderWidth: 1,
    borderColor: '#4ECDC4',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center' as const,
    backgroundColor: 'transparent',
  },
  
  outlinedButtonText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#4ECDC4',
  },
  
  // Small button variants
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  
  smallButtonText: {
    fontSize: 12,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
  
  // Floating action button
  floatingButton: {
    position: 'absolute' as const,
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowColor: '#000',
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
  primary: ['#4ECDC4', '#26A69A'],        // Teal gradient
  secondary: ['#E74C3C', '#F39C12'],      // Red to orange
  accent: ['#E74C3C', '#F39C12', '#F1C40F'], // Full flame gradient
  success: '#27AE60',                     // Green from logo
  warning: '#F39C12',                     // Orange from flame
  error: '#E74C3C',                       // Red from logo
};
