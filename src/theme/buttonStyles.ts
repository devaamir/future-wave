import { StyleSheet } from 'react-native';
import { theme } from './index';

export const buttonStyles = StyleSheet.create({
  // Primary gradient button (main actions)
  primaryGradient: {
    borderRadius: 12,
  },
  primaryGradientColors: ['#00C6A7', '#2EB5E5'],
  primaryGradientStart: { x: 0, y: 0 },
  primaryGradientEnd: { x: 1, y: 0 },
  
  // Secondary gradient button (banners, highlights)
  secondaryGradient: {
    borderRadius: 12,
  },
  secondaryGradientColors: ['#1A3C8E', '#00C6A7'],
  secondaryGradientStart: { x: 0, y: 0 },
  secondaryGradientEnd: { x: 1, y: 0 },
  
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
    borderColor: '#1A3C8E',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center' as const,
    backgroundColor: 'transparent',
  },
  
  outlinedButtonText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#1A3C8E',
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
  primary: ['#00C6A7', '#2EB5E5'],
  secondary: ['#1A3C8E', '#00C6A7'],
  accent: '#1A3C8E',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};
