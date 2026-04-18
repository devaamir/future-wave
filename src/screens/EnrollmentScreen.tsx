import React, { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme, buttonStyles, buttonColors, useColors } from '../theme';
import { BackArrowIcon, TickIcon } from '../components/Icons';

const EnrollmentScreen = ({ navigation, route }: any) => {
  const colors = useColors();
  const styles = useMemo(() => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceAlt,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: colors.textBody,
  },
  content: {
    flex: 1,
  },
  courseSection: {
    backgroundColor: colors.white,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  courseTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: colors.textBody,
    textAlign: 'center',
    marginBottom: 8,
  },
  coursePrice: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: colors.primary,
  },
  featuresSection: {
    backgroundColor: colors.white,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: colors.textBody,
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
    color: colors.textMuted,
    flex: 1,
  },
  buttonSection: {
    padding: 20,
  },
}), [colors]);
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
          <BackArrowIcon size={24} color={colors.textBody} />
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
              <TickIcon size={16} color={colors.successGreen} />
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


export default EnrollmentScreen;
