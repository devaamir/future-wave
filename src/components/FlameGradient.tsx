import React from 'react';
import { ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../theme';

interface FlameGradientProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const FlameGradient: React.FC<FlameGradientProps> = ({ children, style }) => {
  return (
    <LinearGradient
      colors={[colors.secondary, colors.accent, colors.yellow]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={style}
    >
      {children}
    </LinearGradient>
  );
};

export const TealGradient: React.FC<FlameGradientProps> = ({ children, style }) => {
  return (
    <LinearGradient
      colors={[colors.primary, colors.tealActive]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={style}
    >
      {children}
    </LinearGradient>
  );
};
