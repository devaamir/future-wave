import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Switch,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  NotificationIcon,
  MoonIcon,
  QuestionIcon,
  LanguageIcon,
  InfoIcon,
  EditIcon,
  ProfileIcon,
} from '../components/Icons';
import { theme, useColors, useTheme } from '../theme';
import { getUser, clearSession } from '../services/storage';
import { LoginUser } from '../services/api';

const ProfileScreen = ({ navigation, onTabPress }: any) => {
  const colors = useColors();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: colors.backgroundGrey,
        },
        header: {
          backgroundColor: colors.white,
          paddingTop: 20,
          paddingBottom: 16,
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          borderBottomColor: colors.borderLight,
        },
        headerTitle: {
          fontSize: 18,
          fontFamily: theme.fonts.bold,
          color: colors.textDark,
        },
        profileCard: {
          backgroundColor: colors.white,
          borderRadius: 12,
          padding: 20,
          margin: 16,
          alignItems: 'center',
          shadowColor: colors.blackShort,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        },
        avatarContainer: {
          position: 'relative',
          marginBottom: 16,
        },
        avatar: {
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: colors.borderLight,
          alignItems: 'center',
          justifyContent: 'center',
        },
        avatarImage: {
          width: 80,
          height: 80,
          borderRadius: 40,
        },
        editIcon: {
          position: 'absolute',
          bottom: 0,
          right: 0,
          backgroundColor: colors.white,
          borderRadius: 12,
          width: 24,
          height: 24,
          justifyContent: 'center',
          alignItems: 'center',
        },
        userName: {
          fontSize: 20,
          fontFamily: theme.fonts.bold,
          color: colors.textDark,
          marginBottom: 4,
        },
        userEmail: {
          fontSize: 14,
          fontFamily: theme.fonts.regular,
          color: colors.textTertiary,
        },
        content: {
          flex: 1,
          paddingHorizontal: 16,
        },
        section: {
          marginTop: 20,
          marginBottom: 10,
        },
        sectionTitle: {
          fontSize: 18,
          fontFamily: theme.fonts.semiBold,
          color: colors.textDark,
          marginBottom: 12,
          marginLeft: 4,
        },
        card: {
          backgroundColor: colors.white,
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: colors.blackShort,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        },
        cardIcon: {
          fontSize: 20,
          marginRight: 16,
          width: 24,
          textAlign: 'center',
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
        logoutButton: {
          marginHorizontal: 16,
          marginTop: 20,
          marginBottom: 20,
          paddingVertical: 14,
          borderRadius: 12,
          backgroundColor: colors.errorBgLight,
          borderWidth: 1,
          borderColor: colors.errorBgPale,
          alignItems: 'center',
        },
        logoutContent: {},
        logoutText: {
          fontSize: 15,
          fontFamily: theme.fonts.bold,
          color: colors.error,
        },
        versionText: {
          fontSize: 12,
          fontFamily: theme.fonts.regular,
          color: colors.textTertiary,
          textAlign: 'center',
          marginBottom: 6,
        },
        poweredBy: {
          fontSize: 11,
          fontFamily: theme.fonts.regular,
          color: colors.textDisabled,
          textAlign: 'center',
          marginBottom: 30,
        },
      }),
    [colors],
  );
  const { isDark, toggleDark } = useTheme();
  const [user, setUser] = useState<LoginUser | null>(null);

  useEffect(() => {
    getUser().then(setUser);
  }, []);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: async () => {
          await clearSession();
          navigation?.reset({ index: 0, routes: [{ name: 'Login' }] });
        },
      },
    ]);
  };

  const ProfileCard = ({ icon, title, onPress }: any) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardIconContainer}>
        {typeof icon === 'string' ? (
          <Text style={styles.cardIcon}>{icon}</Text>
        ) : (
          icon
        )}
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Profile Info Card */}
        <View style={styles.profileCard}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={() => navigation?.navigate('EditProfile')}
          >
            <View style={styles.avatar}>
              {user?.photo ? (
                <Image
                  source={{ uri: user.photo }}
                  style={styles.avatarImage}
                />
              ) : (
                <ProfileIcon size={48} color={colors.textTertiary} />
              )}
            </View>
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => navigation?.navigate('EditProfile')}
            >
              <EditIcon size={16} color={colors.primary} />
            </TouchableOpacity>
          </TouchableOpacity>

          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email || ''}</Text>
        </View>
        {/* Main Content Cards */}
        <View style={styles.section}>
          <ProfileCard
            icon={<NotificationIcon size={20} color={colors.textTertiary} />}
            title="Notifications"
            onPress={() => navigation?.navigate('Notifications')}
          />
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <TouchableOpacity style={styles.card}>
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

          <ProfileCard
            icon={<QuestionIcon size={20} color={colors.textTertiary} />}
            title="Help & Support"
            onPress={() => {}}
          />
          <ProfileCard
            icon={<InfoIcon size={20} color={colors.textTertiary} />}
            title="About TIPS PSC ACADEMY"
            onPress={() => {}}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* Version Text */}
        <Text style={styles.versionText}>App Version 1.0.0</Text>
        <Text style={styles.poweredBy}>Powered by D H BUSINESS DEVELOPERS</Text>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
