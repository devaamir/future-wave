import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NotificationIcon, BackArrowIcon } from '../components/Icons';
import { theme } from '../theme';

const NotificationScreen = () => {
  const navigation = useNavigation();

  const notifications = [
    {
      id: 1,
      title: 'Live Class Starting Soon',
      subtitle: 'Your Physics class begins at 6:30 PM',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Assignment Due Tomorrow',
      subtitle: 'Complete Chapter 5 exercises',
      time: '1 day ago',
      unread: false,
    },
    {
      id: 3,
      title: 'New Course Available',
      subtitle: 'Kerala PSC Prelims - Crash Batch is now live',
      time: '2 days ago',
      unread: false,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackArrowIcon size={32} color="#2D2D2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {notifications.map(item => (
          <TouchableOpacity key={item.id} style={styles.notificationCard}>
            <View style={styles.iconContainer}>
              <NotificationIcon size={20} color="#1A3C8E" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            {item.unread && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        ))}

        {notifications.length === 0 && (
          <View style={styles.emptyState}>
            <NotificationIcon size={48} color="#E5E7EB" />
            <Text style={styles.emptyTitle}>No notifications yet</Text>
            <Text style={styles.emptySubtitle}>
              You're all caught up! Check back later.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: '#2D2D2D',
    fontSize: theme.fontSizes.xl,
    fontFamily: theme.fonts.bold,
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    color: '#2D2D2D',
    fontSize: 20,
    fontFamily: theme.fonts.medium,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: theme.fontSizes.base,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: theme.fontSizes.sm,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
    marginBottom: 4,
    lineHeight: 18,
  },
  time: {
    fontSize: theme.fontSizes.xs,
    fontFamily: theme.fonts.regular,
    color: '#9CA3AF',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1A3C8E',
    marginTop: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: theme.fontSizes.lg,
    fontFamily: theme.fonts.bold,
    color: '#9CA3AF',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: theme.fontSizes.sm,
    fontFamily: theme.fonts.regular,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

export default NotificationScreen;
