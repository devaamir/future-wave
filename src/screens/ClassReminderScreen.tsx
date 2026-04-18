import React, { useState, useMemo } from 'react';
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
import { theme, useColors } from '../theme';

const { width } = Dimensions.get('window');

const ClassReminderScreen = () => {
  const colors = useColors();
  const styles = useMemo(() => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: colors.textDark,
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
    backgroundColor: colors.orangeAlt,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  upcomingText: {
    color: colors.white,
    fontSize: 12,
    fontFamily: theme.fonts.bold,
    marginLeft: 4,
  },
  infoCard: {
    backgroundColor: colors.white,
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: colors.blackShort,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  classTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: colors.textDark,
    marginBottom: 8,
  },
  instructorInfo: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: colors.textTertiary,
    marginBottom: 4,
  },
  timeInfo: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: colors.primary,
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
    color: colors.textTertiary,
    marginLeft: 6,
  },
  descriptionSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: colors.textTertiary,
    lineHeight: 20,
  },
  bottomSection: {
    padding: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
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
    color: colors.white,
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    marginLeft: 8,
  },
  bottomNote: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: colors.textDisabled,
    textAlign: 'center',
  },
}), [colors]);
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
              stroke={colors.textDark}
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
            <ClockIcon size={12} color={colors.white} />
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
              <ClockIcon size={14} color={colors.textTertiary} />
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
          colors={reminderSet ? [colors.leafGreen, colors.darkGreen] : [colors.secondary, colors.accent]}
          style={styles.reminderButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity
            style={styles.reminderButtonContent}
            onPress={handleSetReminder}
            disabled={reminderSet}
          >
            <BellIcon size={20} color={colors.white} />
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


export default ClassReminderScreen;
