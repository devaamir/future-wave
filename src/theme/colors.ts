export const colors = {
  // TIPS PSC Academy Brand Colors (from logo)
  primary: '#4ECDC4',      // Teal/turquoise (main book color)
  secondary: '#E74C3C',    // Red (diploma ribbon)
  accent: '#F39C12',       // Orange (flame gradient)
  
  // Gradient colors for flame effect
  flameStart: '#E74C3C',   // Red
  flameMid: '#F39C12',     // Orange  
  flameEnd: '#F1C40F',     // Yellow
  
  // Nature colors from logo
  leafGreen: '#27AE60',    // Green leaves
  darkGreen: '#1E8449',    // Darker green accent
  
  // Text Colors
  text: '#2C3E50',         // Dark slate (graduation cap color)
  textSecondary: '#7F8C8D', // Medium grey
  textLight: '#FFFFFF',    // White text
  
  // Background Colors
  background: '#FFFFFF',   // White background
  surface: '#F8F9FA',      // Light grey surface
  cardBackground: '#FFFFFF', // Card backgrounds
  
  // Standard Colors
  white: '#FFFFFF',
  black: '#2C3E50',        // Using dark slate instead of pure black
  
  // Legacy colors (updated to match theme)
  lightBlue: '#85C1E9',
  golden: '#F1C40F',       // Matching flame yellow
  green: '#27AE60',        // Matching leaf green
} as const;
