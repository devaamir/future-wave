import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, ActivityIndicator,
} from 'react-native';
import { theme, colors } from '../theme';
import { register } from '../services/api';
import { EyeIcon, EyeOffIcon } from '../components/Icons';

const SetPasswordScreen = ({ route, navigation }: any) => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!password || !confirm) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
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
      const { name, email, mobile_number } = route.params;
      await register({ username: email, email, password, name, mobile_number });
      setTimeout(() => {
        Alert.alert('Success', 'Account created! Please login.', [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);
      }, 300);
    } catch (error: any) {
      const msg = error?.response?.data
        ? JSON.stringify(error.response.data)
        : 'Something went wrong. Please try again.';
      setTimeout(() => Alert.alert('Registration Failed', msg), 300);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Password</Text>
      <Text style={styles.subtitle}>Choose a strong password for your account</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.textDisabled}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(p => !p)}>
          {showPassword
            ? <EyeOffIcon size={20} color={colors.textTertiary} />
            : <EyeIcon size={20} color={colors.textTertiary} />}
        </TouchableOpacity>
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor={colors.textDisabled}
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(p => !p)}>
          {showPassword
            ? <EyeOffIcon size={20} color={colors.textTertiary} />
            : <EyeIcon size={20} color={colors.textTertiary} />}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.buttonText}>Create Account</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20, justifyContent: 'center' },
  title: { fontSize: 26, fontFamily: theme.fonts.bold, color: colors.textDark, textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 14, fontFamily: theme.fonts.regular, color: colors.textTertiary, textAlign: 'center', marginBottom: 32 },
  inputWrapper: { position: 'relative', marginBottom: 15 },
  input: {
    borderWidth: 1, borderColor: colors.primary, borderRadius: 10,
    padding: 15, paddingRight: 48, fontSize: 16,
    fontFamily: theme.fonts.regular, backgroundColor: colors.white,
    color: colors.textDark,
  },
  eyeBtn: { position: 'absolute', right: 14, top: 0, bottom: 0, justifyContent: 'center' },
  button: {
    backgroundColor: colors.secondary, paddingVertical: 15,
    borderRadius: 10, alignItems: 'center', marginTop: 10,
  },
  buttonText: { color: colors.white, fontSize: 18, fontFamily: theme.fonts.semiBold },
});

export default SetPasswordScreen;
