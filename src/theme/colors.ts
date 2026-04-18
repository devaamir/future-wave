import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const light = {
  // Brand
  primary: '#4ECDC4',
  primaryDark: '#4DB8AC',
  primaryDeep: '#2BAE9B',
  secondary: '#E74C3C',
  accent: '#F39C12',

  // Flame gradient
  flameStart: '#E74C3C',
  flameMid: '#F39C12',
  flameEnd: '#F1C40F',

  // Green
  leafGreen: '#27AE60',
  darkGreen: '#1E8449',
  successGreen: '#10B981',
  successGreenDark: '#3DBE8B',
  successGreenDeep: '#37B38A',
  successGreenAlt: '#2E9E45',
  emerald: '#16A34A',

  // Purple / Indigo
  purple: '#7B5ACF',
  purpleBg: '#F3EEFF',
  indigo: '#4F46E5',
  indigoDark: '#2A4FA3',
  indigoDeep: '#1D4ED8',
  navy: '#2E5BBA',

  // Blue
  blue: '#3A8EDB',
  blueBg: '#EBF4FF',
  blueAlt: '#0056FF',
  blueLight: '#85C1E9',
  slate: '#3B82F6',

  // Amber / Yellow / Gold
  amber: '#F5B041',
  amberBg: '#FFF8EC',
  amberDark: '#D97706',
  gold: '#FFD700',
  goldDark: '#B8860B',
  goldDeep: '#996600',
  goldDeeper: '#7A5200',
  yellow: '#F1C40F',
  yellowLight: '#FFE066',
  yellowPale: '#FFE87C',
  yellowPastel: '#FFF5A0',
  orange: '#FF9800',
  orangeAlt: '#F59E0B',
  orangeFFB: '#FFB800',

  // Red / Error
  error: '#EF4444',
  errorAlt: '#F04F4F',
  errorDeep: '#E53935',
  errorBg: '#FEF2F2',
  errorBgAlt: '#FFF0F0',
  errorBgLight: '#FEE2E2',
  errorBgPale: '#FECACA',
  pink: '#FF5A7A',
  red: '#FF0000',

  // Text
  text: '#2C3E50',
  textDark: '#2D2D2D',
  textPrimary: '#1F2937',
  textHeading: '#111827',
  textBody: '#1E293B',
  textBodyAlt: '#374151',
  textMuted: '#64748B',
  textMutedAlt: '#4B5563',
  textSecondary: '#7F8C8D',
  textTertiary: '#6B7280',
  textDisabled: '#9CA3AF',
  textLight: '#FFFFFF',

  // Backgrounds
  background: '#FFFFFF',
  backgroundGrey: '#F9FAFB',
  backgroundLight: '#F8FAFC',
  surface: '#F8F9FA',
  surfaceAlt: '#F1F5F9',
  cardBackground: '#FFFFFF',

  // Borders
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  borderMuted: '#D1D5DB',
  borderSlate: '#E2E8F0',

  // Tinted backgrounds
  tealBg: '#E6F7F5',
  greenBg: '#E8F5E9',
  greenBgLight: '#ECFDF5',
  greenBgPale: '#DCFCE7',
  indigoBg: '#EEF2FF',
  purpleBgAlt: '#F3EEFF',
  slateLight: '#F1F5F9',

  // Standard
  white: '#FFFFFF',
  whiteAlt: '#FFF',
  black: '#2C3E50',
  blackPure: '#000000',
  blackShort: '#000',
  grey: '#C4C4C4',
  greyMid: '#666666',
  greyLight: '#F5F5F5',

  // Teal active
  tealActive: '#26A69A',

  // RGBA overlays
  overlayDark06: 'rgba(0,0,0,0.6)',
  overlayDark045: 'rgba(0,0,0,0.45)',
  overlayDark04: 'rgba(0,0,0,0.4)',
  overlayDark03: 'rgba(0,0,0,0.3)',
  overlayDark02: 'rgba(0,0,0,0.2)',
  overlayWhite08: 'rgba(255,255,255,0.8)',
  tealOverlay09: 'rgba(77,184,172,0.9)',
  tealDeepOverlay09: 'rgba(43,174,155,0.9)',
};

const dark: typeof light = {
  // Brand — keep brand colors vivid
  primary: '#4ECDC4',
  primaryDark: '#4DB8AC',
  primaryDeep: '#2BAE9B',
  secondary: '#E74C3C',
  accent: '#F39C12',

  // Flame gradient
  flameStart: '#E74C3C',
  flameMid: '#F39C12',
  flameEnd: '#F1C40F',

  // Green
  leafGreen: '#2ECC71',
  darkGreen: '#27AE60',
  successGreen: '#34D399',
  successGreenDark: '#4ADE80',
  successGreenDeep: '#4ADE80',
  successGreenAlt: '#22C55E',
  emerald: '#22C55E',

  // Purple / Indigo
  purple: '#A78BFA',
  purpleBg: '#2D1F4E',
  indigo: '#818CF8',
  indigoDark: '#6366F1',
  indigoDeep: '#4F46E5',
  navy: '#3B82F6',

  // Blue
  blue: '#60A5FA',
  blueBg: '#1E3A5F',
  blueAlt: '#3B82F6',
  blueLight: '#93C5FD',
  slate: '#60A5FA',

  // Amber / Yellow / Gold
  amber: '#FCD34D',
  amberBg: '#2D2000',
  amberDark: '#F59E0B',
  gold: '#FFD700',
  goldDark: '#D4A017',
  goldDeep: '#B8860B',
  goldDeeper: '#996600',
  yellow: '#FDE047',
  yellowLight: '#FEF08A',
  yellowPale: '#FEF9C3',
  yellowPastel: '#FEFCE8',
  orange: '#FB923C',
  orangeAlt: '#F97316',
  orangeFFB: '#FBBF24',

  // Red / Error
  error: '#F87171',
  errorAlt: '#FC8181',
  errorDeep: '#EF4444',
  errorBg: '#2D1515',
  errorBgAlt: '#2D1515',
  errorBgLight: '#3B1A1A',
  errorBgPale: '#451A1A',
  pink: '#FB7185',
  red: '#EF4444',

  // Text — inverted for dark bg
  text: '#E2E8F0',
  textDark: '#F1F5F9',
  textPrimary: '#F9FAFB',
  textHeading: '#FFFFFF',
  textBody: '#E2E8F0',
  textBodyAlt: '#CBD5E1',
  textMuted: '#94A3B8',
  textMutedAlt: '#94A3B8',
  textSecondary: '#9CA3AF',
  textTertiary: '#9CA3AF',
  textDisabled: '#4B5563',
  textLight: '#FFFFFF',

  // Backgrounds — dark surfaces
  background: '#0F172A',
  backgroundGrey: '#1E293B',
  backgroundLight: '#1E293B',
  surface: '#1E293B',
  surfaceAlt: '#334155',
  cardBackground: '#1E293B',

  // Borders
  border: '#334155',
  borderLight: '#1E293B',
  borderMuted: '#475569',
  borderSlate: '#334155',

  // Tinted backgrounds — darkened
  tealBg: '#0D2E2B',
  greenBg: '#0D2B1A',
  greenBgLight: '#0D2B1A',
  greenBgPale: '#0D2B1A',
  indigoBg: '#1E1B4B',
  purpleBgAlt: '#2D1F4E',
  slateLight: '#1E293B',

  // Standard
  white: '#1E293B',
  whiteAlt: '#1E293B',
  black: '#E2E8F0',
  blackPure: '#FFFFFF',
  blackShort: '#FFF',
  grey: '#475569',
  greyMid: '#94A3B8',
  greyLight: '#1E293B',

  // Teal active
  tealActive: '#2DD4BF',

  // RGBA overlays
  overlayDark06: 'rgba(0,0,0,0.7)',
  overlayDark045: 'rgba(0,0,0,0.55)',
  overlayDark04: 'rgba(0,0,0,0.5)',
  overlayDark03: 'rgba(0,0,0,0.4)',
  overlayDark02: 'rgba(0,0,0,0.3)',
  overlayWhite08: 'rgba(255,255,255,0.1)',
  tealOverlay09: 'rgba(77,184,172,0.9)',
  tealDeepOverlay09: 'rgba(43,174,155,0.9)',
};

export const colors = light;
export const darkColors = dark;

/** Returns the correct palette based on the user's dark mode preference. */
export function useColors() {
  const { isDark } = useContext(ThemeContext);
  return isDark ? dark : light;
}
