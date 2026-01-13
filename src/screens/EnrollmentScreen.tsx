import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme, buttonStyles, buttonColors } from '../theme';
import { BackArrowIcon, TickIcon } from '../components/Icons';

const EnrollmentScreen = ({ navigation, route }: any) => {
  const { courseTitle = 'Course Enrollment', coursePrice = '₹499' } = route?.params || {};

  const features = [
    'Live interactive classes',
    'Recorded video access',
    'Study materials & notes',
    'Mock tests & assessments',
    'Expert instructor support',
    'Certificate on completion',
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackArrowIcon size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Enrollment</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Course Info */}
        <View style={styles.courseSection}>
          <Text style={styles.courseTitle}>{courseTitle}</Text>
          <Text style={styles.coursePrice}>{coursePrice}</Text>
        </View>

        {/* Features */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>What's Included</Text>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <TickIcon size={16} color="#10B981" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* Enrollment Button */}
        <View style={styles.buttonSection}>
          <LinearGradient
            colors={buttonColors.primary}
            style={buttonStyles.primaryGradient}
            start={buttonStyles.primaryGradientStart}
            end={buttonStyles.primaryGradientEnd}
          >
            <TouchableOpacity 
              style={buttonStyles.buttonContent}
              onPress={() => {
                // Handle enrollment logic here
                navigation.goBack();
              }}
            >
              <Text style={buttonStyles.buttonText}>Complete Enrollment</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#1E293B',
  },
  content: {
    flex: 1,
  },
  courseSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  courseTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
  },
  coursePrice: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: '#4ECDC4',
  },
  featuresSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#1E293B',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: '#64748B',
    flex: 1,
  },
  buttonSection: {
    padding: 20,
  },
});

export default EnrollmentScreen;
