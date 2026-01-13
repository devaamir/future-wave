import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { SettingsIcon, ClockIcon } from '../components/Icons';
import { theme } from '../theme';

const { width } = Dimensions.get('window');

const LiveClassJoinScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { classData } = route.params as { classData?: any } || {};
  const [isJoined, setIsJoined] = useState(false);

  const handleJoinClass = () => {
    setIsJoined(true);
  };

  // Default data if no classData is passed
  const defaultClassData = {
    title: 'Introduction to React Native',
    teacher: 'Dr. Sarah Johnson',
    time: 'Today · 3:00 PM – 4:00 PM',
  };

  const currentClass = classData || defaultClassData;

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
        <Text style={styles.headerTitle}>Live Session</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <SettingsIcon size={24} color="#2D2D2D" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Video Preview Area */}
        <View style={styles.videoContainer}>
          <View style={styles.videoPreview}>
            <View style={styles.liveBadge}>
              <View style={styles.redDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>

            {!isJoined && (
              <LinearGradient
                colors={['#4ECDC4', '#2E5BBA']}
                style={styles.joinOverlayButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <TouchableOpacity
                  style={styles.joinOverlayContent}
                  onPress={handleJoinClass}
                >
                  <Text style={styles.joinOverlayText}>Join live</Text>
                </TouchableOpacity>
              </LinearGradient>
            )}
          </View>
        </View>

        {/* Class Information Card */}
        <View style={styles.infoCard}>
          <Text style={styles.classTitle}>{currentClass.title}</Text>
          <Text style={styles.instructorInfo}>
            {currentClass.teacher} · Mobile Development
          </Text>
          <Text style={styles.timeInfo}>{currentClass.time}</Text>

          <View style={styles.metaInfo}>
            <View style={styles.metaItem}>
              {/* <Text style={styles.metaIcon}></Text> */}
              <ClockIcon size={14} color="#2D2D2D" />
              <Text style={styles.metaText}>1 hr</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>👥</Text>
              <Text style={styles.metaText}>125 students joined</Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionText}>
            In this live session, we'll explore the basics of React Native
            components, setup, and navigation. You'll learn by building a mini
            project step-by-step.
          </Text>
        </View>

        {/* Interactive Options */}
        {/* <View style={styles.optionsRow}>
          <TouchableOpacity style={styles.optionButton}>
            <LinearGradient
              colors={['#4ECDC4', '#2E5BBA']}
              style={styles.optionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.optionIcon}>💬</Text>
            </LinearGradient>
            <Text style={styles.optionLabel}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton}>
            <LinearGradient
              colors={['#4ECDC4', '#2E5BBA']}
              style={styles.optionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.optionIcon}>📝</Text>
            </LinearGradient>
            <Text style={styles.optionLabel}>Notes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton}>
            <LinearGradient
              colors={['#4ECDC4', '#2E5BBA']}
              style={styles.optionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.optionIcon}>📁</Text>
            </LinearGradient>
            <Text style={styles.optionLabel}>Resources</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton}>
            <LinearGradient
              colors={['#4ECDC4', '#2E5BBA']}
              style={styles.optionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.optionIcon}>📊</Text>
            </LinearGradient>
            <Text style={styles.optionLabel}>Attendance</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>

      {/* Bottom Action Area */}
      {/* <View style={styles.bottomSection}>
        <LinearGradient
          colors={['#4ECDC4', '#2E5BBA']}
          style={styles.joinButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity
            style={styles.joinButtonContent}
            onPress={handleJoinClass}
          >
            <Text style={styles.joinButtonText}>Join Class</Text>
          </TouchableOpacity>
        </LinearGradient>
        <Text style={styles.bottomNote}>
          Please ensure your camera and mic are enabled.
        </Text>
      </View> */}
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
  settingsButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  videoContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  videoPreview: {
    width: '100%',
    height: ((width - 32) * 9) / 16,
    backgroundColor: '#000000',
    borderRadius: 12,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  liveBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#E53935',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF0000',
    marginRight: 4,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: theme.fonts.bold,
  },
  joinOverlayButton: {
    borderRadius: 8,
  },
  joinOverlayContent: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  joinOverlayText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: theme.fonts.bold,
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
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
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
    color: '#2D2D2D',
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
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  optionButton: {
    alignItems: 'center',
  },
  optionGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionIcon: {
    fontSize: 20,
  },
  optionLabel: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: '#6B7280',
  },
  bottomSection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  joinButton: {
    borderRadius: 12,
    marginBottom: 8,
  },
  joinButtonContent: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: theme.fonts.bold,
  },
  bottomNote: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

export default LiveClassJoinScreen;
