import React from 'react';
import { ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface FlameGradientProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const FlameGradient: React.FC<FlameGradientProps> = ({ children, style }) => {
  return (
    <LinearGradient
      colors={['#E74C3C', '#F39C12', '#F1C40F']}
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
      colors={['#4ECDC4', '#26A69A']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={style}
    >
      {children}
    </LinearGradient>
  );
};
