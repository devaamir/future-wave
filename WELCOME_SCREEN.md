# Future Wave Welcome Screen

## Overview
A modern and minimal welcome screen designed for the Future Wave mobile learning app.

## Design Features

### Theme & Colors
- **Primary Background**: Deep royal blue (#1A3C8E) - conveys trust and learning
- **Gradient Accents**: Teal (#00C6A7) to sky blue (#2EB5E5) for buttons and highlights
- **Text Colors**: Clean white (#FFFFFF) for titles, light grey (#D9E0E8) for subtitles

### Layout Components

#### 1. Logo Section (Top)
- Future Wave logo with gradient wave icon
- App name in bold white text
- Positioned at top center with generous spacing

#### 2. Main Content (Center)
- **Tagline**: "Ride the Future of Learning" (28-32px, bold)
- **Subtitle**: "Learn anywhere, anytime with live classes, study materials, and exams." (16-18px, light grey)
- Centered with proper line spacing

#### 3. Action Buttons (Bottom)
- **Login Button**: Full-width with teal-to-blue gradient background
- **Sign Up Button**: Outline style with white border and transparent background
- Both buttons have 16px margins and rounded corners

#### 4. Visual Elements
- Soft wave graphic at bottom in lighter blue shades
- "Powered by Future Wave" version text at bottom (12px, grey)
- Generous spacing throughout for clean, uncluttered look

## Technical Implementation

### Dependencies
- `react-native-linear-gradient`: For gradient backgrounds
- `react-native-svg`: For custom wave icons and graphics
- `@react-navigation/native`: For navigation between screens

### Key Features
- Responsive design that adapts to different screen sizes
- Smooth navigation to Login and Signup screens
- SVG-based wave graphics for crisp display on all devices
- Proper TypeScript typing for navigation

### File Structure
```
src/
├── screens/
│   └── WelcomeScreen.tsx     # Main welcome screen component
├── theme/
│   └── colors.ts             # Updated with Future Wave brand colors
└── navigation/
    └── AppNavigator.tsx      # Navigation setup (already configured)
```

## Usage
The welcome screen is automatically shown on first app launch. Users can:
1. Tap "Login" to navigate to the login screen
2. Tap "Sign Up" to navigate to the registration screen

## Design Philosophy
The screen balances education and technology aesthetics with:
- Professional, trustworthy color scheme
- Modern, minimal layout
- Clear call-to-action buttons
- Welcoming and motivational messaging
