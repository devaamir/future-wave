import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { theme, colors } from '../theme';
import { login } from '../services/api';
import { saveSession } from '../services/storage';
import { useAuth } from '../context/AuthContext';
import { EyeIcon, EyeOffIcon } from '../components/Icons';

const LoginScreen = ({ navigation }: any) => {
  const { setAppExpiry } = useAuth();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
      justifyContent: 'center',
    },
    logo: {
      width: 160,
      height: 160,
      alignSelf: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontFamily: theme.fonts.bold,
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: 40,
    },
    inputWrapper: { position: 'relative', marginBottom: 15 },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.primary,
      borderRadius: 10,
      padding: 15,
      paddingRight: 48,
      marginBottom: 15,
      fontSize: 16,
      fontFamily: theme.fonts.regular,
      backgroundColor: theme.colors.white,
      color: theme.colors.text,
    },
    eyeBtn: { position: 'absolute', right: 14, top: 0, bottom: 0, justifyContent: 'center' },
    loginButton: {
      backgroundColor: theme.colors.accent,
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 20,
    },
    loginButtonText: {
      color: theme.colors.white,
      fontSize: 18,
      fontFamily: theme.fonts.semiBold,
    },
    linkText: {
      color: colors.indigo,
      textAlign: 'center',
      fontSize: 15,
      fontFamily: theme.fonts.medium,
      textDecorationLine: 'underline',
    },
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      Alert.alert('Error', 'Please enter email and password.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
    if (trimmedPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters.');
      return;
    }
    try {
      setLoading(true);
      const { data } = await login({ username: trimmedEmail, password: trimmedPassword });
      await saveSession(data.access, data.refresh, data.user);
      setAppExpiry(data.app_expiry);
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } catch (error: any) {
      const data = error?.response?.data;
      const msg = data?.non_field_errors?.[0]
        ?? data?.detail
        ?? 'Invalid credentials. Please try again.';
      Alert.alert('Login Failed', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo-icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.textDisabled}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

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

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color={theme.colors.white} />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.linkText}>New learner? Join us</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop: 12 }} onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.linkText}>Reset password</Text>
      </TouchableOpacity>
    </View>
  );
};


export default LoginScreen;
