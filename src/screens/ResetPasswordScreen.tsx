import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ActivityIndicator,
} from 'react-native';
import { theme, colors } from '../theme';
import { EyeIcon, EyeOffIcon } from '../components/Icons';
import { passwordResetConfirm } from '../services/api';

const ResetPasswordScreen = ({ navigation, route }: any) => {
  const { email, otp } = route.params;
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }
    try {
      setLoading(true);
      await passwordResetConfirm({ email, otp, new_password: password });
      Alert.alert('Success', 'Password reset successfully.', [
        { text: 'Login', onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Login' }] }) },
      ]);
    } catch (error: any) {
      const data = error?.response?.data;
      const msg = data?.non_field_errors?.[0] ?? data?.detail ?? 'Failed to reset password. Please try again.';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>Enter your new password below.</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor={colors.textDisabled}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(p => !p)}>
          {showPassword ? <EyeOffIcon size={20} color={colors.textTertiary} /> : <EyeIcon size={20} color={colors.textTertiary} />}
        </TouchableOpacity>
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={colors.textDisabled}
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry={!showConfirm}
        />
        <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowConfirm(p => !p)}>
          {showConfirm ? <EyeOffIcon size={20} color={colors.textTertiary} /> : <EyeIcon size={20} color={colors.textTertiary} />}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color={theme.colors.white} /> : <Text style={styles.buttonText}>Submit</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontFamily: theme.fonts.bold, color: theme.colors.text, textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 14, fontFamily: theme.fonts.regular, color: theme.colors.text, textAlign: 'center', marginBottom: 30, opacity: 0.6 },
  inputWrapper: { position: 'relative', marginBottom: 15 },
  input: {
    borderWidth: 1, borderColor: theme.colors.primary, borderRadius: 10,
    padding: 15, paddingRight: 48, fontSize: 16, fontFamily: theme.fonts.regular,
    backgroundColor: theme.colors.white, color: theme.colors.text,
  },
  eyeBtn: { position: 'absolute', right: 14, top: 0, bottom: 0, justifyContent: 'center' },
  button: { backgroundColor: theme.colors.accent, paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: theme.colors.white, fontSize: 18, fontFamily: theme.fonts.semiBold },
});

export default ResetPasswordScreen;
