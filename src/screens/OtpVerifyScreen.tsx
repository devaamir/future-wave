import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert,
} from 'react-native';
import { theme, colors } from '../theme';

const OtpVerifyScreen = ({ navigation, route }: any) => {
  const { email } = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    if (!/^\d?$/.test(text)) return;
    const updated = [...otp];
    updated[index] = text;
    setOtp(updated);
    if (text && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length < 6) {
      Alert.alert('Error', 'Please enter the 6-digit OTP.');
      return;
    }
    navigation.navigate('ResetPassword', { email, otp: code });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>Enter the 6-digit OTP sent to{'\n'}{email}</Text>

      <View style={styles.otpRow}>
        {otp.map((digit, i) => (
          <TextInput
            key={i}
            ref={ref => { inputs.current[i] = ref; }}
            style={styles.otpBox}
            value={digit}
            onChangeText={text => handleChange(text, i)}
            onKeyPress={e => handleKeyPress(e, i)}
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontFamily: theme.fonts.bold, color: theme.colors.text, textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 14, fontFamily: theme.fonts.regular, color: theme.colors.text, textAlign: 'center', marginBottom: 40, opacity: 0.6 },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  otpBox: {
    width: 48, height: 56, borderWidth: 1, borderColor: theme.colors.primary,
    borderRadius: 10, fontSize: 22, fontFamily: theme.fonts.bold,
    backgroundColor: theme.colors.white, color: theme.colors.text,
  },
  button: { backgroundColor: theme.colors.accent, paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: theme.colors.white, fontSize: 18, fontFamily: theme.fonts.semiBold },
  linkText: { color: colors.indigo, textAlign: 'center', fontSize: 15, fontFamily: theme.fonts.medium, textDecorationLine: 'underline' },
});

export default OtpVerifyScreen;
