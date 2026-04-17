import React, { useState, useEffect, useCallback } from 'react';
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
import { theme } from '../theme';
import { getUser, clearSession } from '../services/storage';
import { LoginUser } from '../services/api';

const ProfileScreen = ({ navigation, onTabPress }: any) => {
  const [darkMode, setDarkMode] = useState(false);
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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Profile Info Card */}
        <View style={styles.profileCard}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={() => navigation?.navigate('EditProfile')}
          >
            <View style={styles.avatar}>
              {user?.photo ? (
                <Image source={{ uri: user.photo }} style={styles.avatarImage} />
              ) : (
                <ProfileIcon size={48} color="#6B7280" />
              )}
            </View>
            <TouchableOpacity
              style={styles.editIcon}
              onPress={() => navigation?.navigate('EditProfile')}
            >
              <EditIcon size={16} color="#4ECDC4" />
            </TouchableOpacity>
          </TouchableOpacity>

          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email || ''}</Text>
        </View>
        {/* Main Content Cards */}
        <View style={styles.section}>
          <ProfileCard
            icon={<NotificationIcon size={20} color="#6B7280" />}
            title="Notifications"
            onPress={() => navigation?.navigate('Notifications')}
          />
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <TouchableOpacity style={styles.card}>
            <View style={styles.cardIconContainer}>
              <LanguageIcon size={20} color="#6B7280" />
            </View>
            <Text style={styles.cardTitle}>Language Preference</Text>
            <Text style={styles.cardSubtitle}>English</Text>
          </TouchableOpacity>

          <View style={styles.card}>
            <View style={styles.cardIconContainer}>
              <MoonIcon size={20} color="#6B7280" />
            </View>
            <Text style={styles.cardTitle}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#E5E7EB', true: '#4ECDC4' }}
              thumbColor={darkMode ? '#FFFFFF' : '#F3F4F6'}
            />
          </View>

          <ProfileCard
            icon={<QuestionIcon size={20} color="#6B7280" />}
            title="Help & Support"
            onPress={() => { }}
          />
          <ProfileCard
            icon={<InfoIcon size={20} color="#6B7280" />}
            title="About Tips PSC"
            onPress={() => { }}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* Version Text */}
        <Text style={styles.versionText}>App Version 1.0.0</Text>
        <Text style={styles.poweredBy}>Powered by D H BUSINESS DEVELOPERS</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    alignItems: 'center',
    shadowColor: '#000',
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
    backgroundColor: '#F3F4F6',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
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
    color: '#2D2D2D',
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
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
    color: '#2D2D2D',
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
  },
  arrow: {
    fontSize: 20,
    color: '#6B7280',
    fontFamily: theme.fonts.regular,
  },
  logoutButton: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 20,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FECACA',
    alignItems: 'center',
  },
  logoutContent: {},
  logoutText: {
    fontSize: 15,
    fontFamily: theme.fonts.bold,
    color: '#EF4444',
  },
  versionText: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 6,
  },
  poweredBy: {
    fontSize: 11,
    fontFamily: theme.fonts.regular,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default ProfileScreen;
