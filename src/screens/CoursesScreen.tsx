import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme, useColors } from '../theme';
import { SearchIcon, NotificationIcon } from '../components/Icons';
import { useNavigation } from '@react-navigation/native';

interface Course {
  id: string;
  title: string;
  teacher: string;
  duration: string;
  price: string;
  isFree: boolean;
  category: string;
  thumbnail: any;
}

const CoursesScreen = ({ navigation }: any) => {
  const colors = useColors();
  const styles = useMemo(() => StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: colors.white,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: colors.textDark,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: 16,
  },
  filterIcon: {
    fontSize: 20,
    fontFamily: theme.fonts.regular,
    color: colors.textDark,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.borderLight,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: colors.textDark,
    marginLeft: 8,
  },
  closeButton: {
    padding: 4,
  },
  closeIcon: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: colors.textTertiary,
  },
  categoryContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 48,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeCategoryTab: {
    borderBottomColor: colors.primary,
  },
  categoryText: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: colors.textTertiary,
  },
  activeCategoryText: {
    fontFamily: theme.fonts.bold,
    color: colors.primary,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sortLabel: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: colors.textTertiary,
    marginRight: 8,
  },
  sortDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.borderLight,
    borderRadius: 8,
  },
  sortText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: colors.textDark,
    marginRight: 4,
  },
  dropdownIcon: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: colors.textTertiary,
  },
  coursesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 180,
  },
  row: {
    justifyContent: 'space-between',
  },
  courseCard: {
    width: '48%',
    backgroundColor: colors.backgroundGrey,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
    overflow: 'hidden',
  },
  thumbnail: {
    aspectRatio: 1,
    backgroundColor: colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  courseInfo: {
    padding: 12,
  },
  courseTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: colors.textDark,
    marginBottom: 4,
    lineHeight: 20,
  },
  teacherName: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: colors.textTertiary,
    marginBottom: 2,
  },
  duration: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: colors.textTertiary,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: colors.primary,
  },
  freePrice: {
    color: colors.primary,
  },
  enrollButton: {
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  enrollButtonContent: {
    alignItems: 'center',
  },
  enrollButtonText: {
    fontSize: 12,
    fontFamily: theme.fonts.bold,
    color: colors.white,
  },
}), [colors]);
  const nav = useNavigation();
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Popular');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'PSC',
    'SSC',
    'NEET',
    'JEE',
    'Languages',
    'IT Skills',
  ];

  const courses: Course[] = [
    {
      id: '1',
      title: 'Kerala PSC Prelims 2025 Crash Course',
      teacher: 'Dr. Nair',
      duration: '60 hours',
      price: '₹499',
      isFree: false,
      category: 'PSC',
      thumbnail: require('../assets/images/kpsc_thumb.png'),
    },
    {
      id: '2',
      title: 'SSC CGL Complete Maths Batch',
      teacher: 'Prof. Sharma',
      duration: '80 hours',
      price: '₹999',
      isFree: false,
      category: 'SSC',
      thumbnail: require('../assets/images/maths_thumb.png'),
    },
    {
      id: '3',
      title: 'NEET Physics Fundamentals',
      teacher: 'Dr. Priya Menon',
      duration: '45 hours',
      price: '₹799',
      isFree: false,
      category: 'NEET',
      thumbnail: require('../assets/images/physics_thumb.png'),
    },
    {
      id: '4',
      title: 'Spoken English for Beginners',
      teacher: 'Ms. Anjali',
      duration: '20 hours',
      price: 'Free',
      isFree: true,
      category: 'Languages',
      thumbnail: require('../assets/images/mathematics.webp'),
    },
    {
      id: '5',
      title: 'React Native Development',
      teacher: 'Mr. Arun',
      duration: '100 hours',
      price: '₹1299',
      isFree: false,
      category: 'IT Skills',
      thumbnail: require('../assets/images/maths_thumb.png'),
    },
    {
      id: '6',
      title: 'JEE Advanced Chemistry',
      teacher: 'Dr. Raghavan',
      duration: '75 hours',
      price: '₹899',
      isFree: false,
      category: 'JEE',
      thumbnail: require('../assets/images/physics_thumb.png'),
    },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory =
      activeCategory === 'All' || course.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderCourseCard = ({ item }: { item: Course }) => (
    <View style={styles.courseCard}>
      <View style={styles.thumbnail}>
        <Image source={item.thumbnail} style={styles.thumbnailImage} resizeMode="cover" />
      </View>
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.teacherName}>by {item.teacher}</Text>
        <Text style={styles.duration}>{item.duration}</Text>
        <View style={styles.priceRow}>
          <Text style={[styles.price, item.isFree && styles.freePrice]}>
            {item.price}
          </Text>
          <LinearGradient
            colors={[colors.primary, colors.tealActive]}
            style={styles.enrollButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <TouchableOpacity 
              style={styles.enrollButtonContent}
              onPress={() => nav.navigate('Enrollment', {
                courseTitle: item.title,
                coursePrice: item.price
              })}
            >
              <Text style={styles.enrollButtonText}>Enroll</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Courses</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => setShowSearch(!showSearch)}
          >
            <SearchIcon size={20} color={colors.textDark} />
          </TouchableOpacity>
        </View>
      </View>
      {showSearch && (
        <View style={styles.searchContainer}>
          <SearchIcon size={16} color={colors.textTertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search courses, teachers..."
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          <TouchableOpacity
            onPress={() => {
              setShowSearch(false);
              setSearchQuery('');
            }}
            style={styles.closeButton}
          >
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryTab,
              activeCategory === category && styles.activeCategoryTab,
            ]}
            onPress={() => setActiveCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === category && styles.activeCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <TouchableOpacity style={styles.sortDropdown}>
          <Text style={styles.sortText}>{sortBy}</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>
      </View> */}
      <FlatList
        data={filteredCourses}
        renderItem={renderCourseCard}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.coursesContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};


export default CoursesScreen;
