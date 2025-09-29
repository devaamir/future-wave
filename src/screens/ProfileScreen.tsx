import React, { useState } from 'react';
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
import Svg, { Path } from 'react-native-svg';
import { theme } from '../theme';

const ProfileScreen = ({ navigation, onTabPress }: any) => {
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => navigation?.navigate('Welcome') },
      ]
    );
  };

  const ProfileCard = ({ icon, title, onPress }: any) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardIcon}>{icon}</Text>
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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Info Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('../assets/images/logo-icon.png')}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editIcon}>
              <Text style={styles.editText}>✏️</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@email.com</Text>
        </View>
        {/* Main Content Cards */}
        <View style={styles.section}>
          <ProfileCard
            icon="🎓"
            title="My Courses"
            onPress={() => onTabPress?.('Courses')}
          />
          <ProfileCard
            icon="📝"
            title="My Exams"
            onPress={() => {}}
          />
          <ProfileCard
            icon="⬇️"
            title="Downloads"
            onPress={() => {}}
          />
          <ProfileCard
            icon="💳"
            title="Payment History"
            onPress={() => {}}
          />
          <ProfileCard
            icon="🔔"
            title="Notifications"
            onPress={() => {}}
          />
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardIcon}>🌐</Text>
            <Text style={styles.cardTitle}>Language Preference</Text>
            <Text style={styles.cardSubtitle}>English</Text>
          </TouchableOpacity>

          <View style={styles.card}>
            <Text style={styles.cardIcon}>🌙</Text>
            <Text style={styles.cardTitle}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#E5E7EB', true: '#00C6A7' }}
              thumbColor={darkMode ? '#FFFFFF' : '#F3F4F6'}
            />
          </View>

          <ProfileCard
            icon="❓"
            title="Help & Support"
            onPress={() => {}}
          />
          <ProfileCard
            icon="ℹ️"
            title="About Future Wave"
            onPress={() => {}}
          />
        </View>

        {/* Logout Button */}
        <LinearGradient
          colors={['#00C6A7', '#2EB5E5']}
          style={styles.logoutButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity style={styles.logoutContent} onPress={handleLogout}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Version Text */}
        <Text style={styles.versionText}>App Version 1.0.0</Text>
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
    fontSize: 22,
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
    backgroundColor: '#FFFFFF',
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
  editText: {
    fontSize: 12,
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
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  logoutContent: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
  versionText: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default ProfileScreen;
