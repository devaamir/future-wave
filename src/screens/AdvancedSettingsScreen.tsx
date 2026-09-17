import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import {
  BackArrowIcon,
  LanguageIcon,
  MoonIcon,
  WarningIcon,
} from '../components/Icons';
import { theme, useColors, useTheme } from '../theme';
import { clearSession } from '../services/storage';
import { deleteAccount } from '../services/api';

const AdvancedSettingsScreen = ({ navigation }: any) => {
  const colors = useColors();
  const { isDark, toggleDark } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.backgroundGrey,
        },
        header: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingTop: 50,
          paddingBottom: 16,
          backgroundColor: colors.white,
          borderBottomWidth: 1,
          borderBottomColor: colors.borderLight,
        },
        backButton: {
          padding: 8,
          marginRight: 12,
        },
        headerTitle: {
          fontSize: 16,
          fontFamily: theme.fonts.bold,
          color: colors.textDark,
        },
        content: {
          paddingHorizontal: 16,
          paddingBottom: 40,
        },
        section: {
          marginTop: 24,
          marginBottom: 8,
        },
        sectionTitle: {
          fontSize: 13,
          fontFamily: theme.fonts.semiBold,
          color: colors.textTertiary,
          marginBottom: 10,
          marginLeft: 4,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        },
        card: {
          backgroundColor: colors.white,
          borderRadius: 12,
          padding: 16,
          marginBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: colors.blackShort,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 4,
          elevation: 3,
        },
        cardIconContainer: {
          marginRight: 16,
          width: 24,
          alignItems: 'center',
          justifyContent: 'center',
        },
        cardTitle: {
          flex: 1,
          fontSize: 16,
          fontFamily: theme.fonts.medium,
          color: colors.textDark,
        },
        cardSubtitle: {
          fontSize: 14,
          fontFamily: theme.fonts.regular,
          color: colors.textTertiary,
        },
        arrow: {
          fontSize: 20,
          color: colors.textTertiary,
          fontFamily: theme.fonts.regular,
        },
        deleteCard: {
          backgroundColor: colors.errorBgLight,
          borderRadius: 12,
          padding: 16,
          marginBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: colors.errorBgPale,
          shadowColor: colors.blackShort,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.06,
          shadowRadius: 4,
          elevation: 2,
        },
        deleteCardTitle: {
          flex: 1,
          fontSize: 16,
          fontFamily: theme.fonts.medium,
          color: colors.error,
        },
      }),
    [colors],
  );

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This will permanently delete your account and all your data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Are you sure?',
              'Your account and all associated data will be permanently removed.',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Yes, Delete',
                  style: 'destructive',
                  onPress: async () => {
                    try {
                      await deleteAccount();
                    } catch (e) {
                      console.log('[AdvancedSettings] deleteAccount error:', e);
                    } finally {
                      await clearSession();
                      navigation?.reset({ index: 0, routes: [{ name: 'Login' }] });
                    }
                  },
                },
              ],
            );
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackArrowIcon size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Advanced Settings</Text>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <TouchableOpacity style={styles.card} activeOpacity={0.8}>
            <View style={styles.cardIconContainer}>
              <LanguageIcon size={20} color={colors.textTertiary} />
            </View>
            <Text style={styles.cardTitle}>Language Preference</Text>
            <Text style={styles.cardSubtitle}>English</Text>
          </TouchableOpacity>

          <View style={styles.card}>
            <View style={styles.cardIconContainer}>
              <MoonIcon size={20} color={colors.textTertiary} />
            </View>
            <Text style={styles.cardTitle}>Dark Mode</Text>
            <Switch
              value={isDark}
              onValueChange={toggleDark}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={isDark ? colors.white : colors.borderLight}
            />
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Danger Zone</Text>

          <TouchableOpacity
            style={styles.deleteCard}
            onPress={handleDeleteAccount}
            activeOpacity={0.8}
          >
            <View style={styles.cardIconContainer}>
              <WarningIcon size={20} color={colors.error} />
            </View>
            <Text style={styles.deleteCardTitle}>Delete Account</Text>
            <Text style={[styles.arrow, { color: colors.error }]}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AdvancedSettingsScreen;
