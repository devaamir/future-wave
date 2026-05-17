import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, Alert, ActivityIndicator,
} from 'react-native';
import { theme, colors } from '../theme';
import { passwordResetRequestOtp } from '../services/api';

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGetOtp = async () => {
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed || !emailRegex.test(trimmed)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
    try {
      setLoading(true);
      await passwordResetRequestOtp({ email: trimmed });
      navigation.navigate('OtpVerify', { email: trimmed });
    } catch (error: any) {
      const msg = error?.response?.data?.email?.[0]
        ?? error?.response?.data?.detail
        ?? 'Failed to send OTP. Please try again.';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo-icon.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Enter your registered email to receive an OTP.</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.textDisabled}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleGetOtp} disabled={loading}>
        {loading ? <ActivityIndicator color={theme.colors.white} /> : <Text style={styles.buttonText}>Get OTP</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 20, justifyContent: 'center' },
  logo: { width: 160, height: 160, alignSelf: 'center', marginBottom: 20 },
  title: { fontSize: 28, fontFamily: theme.fonts.bold, color: theme.colors.text, textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 14, fontFamily: theme.fonts.regular, color: theme.colors.text, textAlign: 'center', marginBottom: 30, opacity: 0.6 },
  input: {
    borderWidth: 1, borderColor: theme.colors.primary, borderRadius: 10,
    padding: 15, marginBottom: 15, fontSize: 16, fontFamily: theme.fonts.regular,
    backgroundColor: theme.colors.white, color: theme.colors.text,
  },
  button: { backgroundColor: theme.colors.accent, paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginTop: 10, marginBottom: 20 },
  buttonText: { color: theme.colors.white, fontSize: 18, fontFamily: theme.fonts.semiBold },
  linkText: { color: colors.indigo, textAlign: 'center', fontSize: 15, fontFamily: theme.fonts.medium, textDecorationLine: 'underline' },
});

export default ForgotPasswordScreen;
