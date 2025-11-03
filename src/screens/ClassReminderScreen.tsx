import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { ClockIcon, BellIcon } from '../components/Icons';
import { theme } from '../theme';

const { width } = Dimensions.get('window');

const ClassReminderScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { classData } = route.params as { classData: any };
  const [reminderSet, setReminderSet] = useState(false);

  const handleSetReminder = () => {
    setReminderSet(true);
    Alert.alert(
      'Reminder Set!',
      `You'll be notified 15 minutes before "${classData.title}" starts.`,
      [{ text: 'OK' }]
    );
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Svg width={24} height={24} viewBox="0 0 24 24">
            <Path
              d="M15 18L9 12L15 6"
              stroke="#2D2D2D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upcoming Class</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {/* Thumbnail */}
        <View style={styles.thumbnailContainer}>
          <Image
            source={classData.thumbnail}
            style={styles.thumbnail}
            resizeMode="cover"
          />
          <View style={styles.upcomingBadge}>
            <ClockIcon size={12} color="#FFFFFF" />
            <Text style={styles.upcomingText}>UPCOMING</Text>
          </View>
        </View>

        {/* Class Information */}
        <View style={styles.infoCard}>
          <Text style={styles.classTitle}>{classData.title}</Text>
          <Text style={styles.instructorInfo}>by {classData.teacher}</Text>
          <Text style={styles.timeInfo}>
            {formatDateTime(classData.scheduledTime)}
          </Text>

          <View style={styles.metaInfo}>
            <View style={styles.metaItem}>
              <ClockIcon size={14} color="#6B7280" />
              <Text style={styles.metaText}>1 hr duration</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>📚</Text>
              <Text style={styles.metaText}>Live Session</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionText}>
            This live session will cover important topics and provide interactive
            learning experience. Make sure to join on time to not miss any
            important content.
          </Text>
        </View>
      </View>

      {/* Bottom Action */}
      <View style={styles.bottomSection}>
        <LinearGradient
          colors={reminderSet ? ['#10B981', '#059669'] : ['#1A3C8E', '#2E5BBA']}
          style={styles.reminderButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity
            style={styles.reminderButtonContent}
            onPress={handleSetReminder}
            disabled={reminderSet}
          >
            <BellIcon size={20} color="#FFFFFF" />
            <Text style={styles.reminderButtonText}>
              {reminderSet ? 'Reminder Set' : 'Set Reminder'}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
        <Text style={styles.bottomNote}>
          {reminderSet
            ? 'You will be notified 15 minutes before the class starts.'
            : 'Get notified when the class is about to start.'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
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
    borderBottomColor: '#F3F4F6',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  thumbnailContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  thumbnail: {
    width: '100%',
    height: ((width - 32) * 9) / 16,
    borderRadius: 12,
    position: 'relative',
  },
  upcomingBadge: {
    position: 'absolute',
    top: 28,
    left: 28,
    backgroundColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  upcomingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: theme.fonts.bold,
    marginLeft: 4,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  classTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
    marginBottom: 8,
  },
  instructorInfo: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
    marginBottom: 4,
  },
  timeInfo: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#1A3C8E',
    marginBottom: 16,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  metaText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#6B7280',
    marginLeft: 6,
  },
  descriptionSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
    lineHeight: 20,
  },
  bottomSection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  reminderButton: {
    borderRadius: 12,
    marginBottom: 8,
  },
  reminderButtonContent: {
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  reminderButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    marginLeft: 8,
  },
  bottomNote: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

export default ClassReminderScreen;
