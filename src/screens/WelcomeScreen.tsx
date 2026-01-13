import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {
  Path,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
} from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';

const { width, height } = Dimensions.get('window');

const WaveIcon = () => (
  <Svg width="40" height="24" viewBox="0 0 40 24">
    <Defs>
      <SvgLinearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#4ECDC4" />
        <Stop offset="100%" stopColor="#26A69A" />
      </SvgLinearGradient>
    </Defs>
    <Path
      d="M0 12C8 4, 16 4, 20 12C24 20, 32 20, 40 12V20H0V12Z"
      fill="url(#waveGradient)"
    />
  </Svg>
);

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoSection}>
        <Image
          source={require('../assets/images/logo-icon.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Main Content */}
      <View style={styles.contentSection}>
        <Text style={styles.tagline}>Ride the Future of Learning</Text>
        <Text style={styles.subtitle}>
          Learn anywhere, anytime with live classes, study materials, and exams.
        </Text>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonSection}>
        <LinearGradient
          colors={['#4ECDC4', '#26A69A']}
          style={styles.loginButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity
            style={styles.buttonContent}
            onPress={() => navigation.navigate('Login' as never)}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </LinearGradient>

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => navigation.navigate('Signup' as never)}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Wave */}
      <View style={styles.bottomWave}>
        <Svg width={width} height="100" viewBox={`0 0 ${width} 100`}>
          <Path
            d={`M0 40C${width * 0.25} 20, ${
              width * 0.75
            } 60, ${width} 40V100H0V40Z`}
            fill="#2A4FA3"
            opacity={0.3}
          />
        </Svg>
      </View>

      {/* Version Text */}
      <Text style={styles.versionText}>Powered by D H Business Developers</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: height * 0.15,
    justifyContent: 'center',
  },
  logo: {
    width: 160,
    height: 160,
  },
  contentSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    marginTop: -height * 0.05,
  },
  tagline: {
    fontSize: 30,
    fontFamily: theme.fonts.bold,
    color: '#4ECDC4',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 17,
    fontFamily: theme.fonts.regular,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  buttonSection: {
    marginBottom: 40,
    gap: 16,
  },
  loginButton: {
    borderRadius: 12,
    marginHorizontal: 16,
  },
  buttonContent: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
  signUpButton: {
    borderWidth: 2,
    borderColor: '#4ECDC4',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginHorizontal: 16,
    backgroundColor: 'transparent',
  },
  signUpButtonText: {
    fontSize: 18,
    fontFamily: theme.fonts.medium,
    color: '#4ECDC4',
  },
  bottomWave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  versionText: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.7,
  },
});

export default WelcomeScreen;
