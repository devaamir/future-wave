import React, { useState } from 'react';
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
import { theme } from '../theme';
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
            colors={['#00C6A7', '#2EB5E5']}
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
            <SearchIcon size={20} color="#2D2D2D" />
          </TouchableOpacity>
        </View>
      </View>
      {showSearch && (
        <View style={styles.searchContainer}>
          <SearchIcon size={16} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search courses, teachers..."
            placeholderTextColor="#6B7280"
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
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
    color: '#2D2D2D',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
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
    color: '#2D2D2D',
    marginLeft: 8,
  },
  closeButton: {
    padding: 4,
  },
  closeIcon: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
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
    borderBottomColor: '#1A3C8E',
  },
  categoryText: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: '#6B7280',
  },
  activeCategoryText: {
    fontFamily: theme.fonts.bold,
    color: '#1A3C8E',
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
    color: '#6B7280',
    marginRight: 8,
  },
  sortDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  sortText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#2D2D2D',
    marginRight: 4,
  },
  dropdownIcon: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
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
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
    overflow: 'hidden',
  },
  thumbnail: {
    aspectRatio: 1,
    backgroundColor: '#F3F4F6',
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
    color: '#2D2D2D',
    marginBottom: 4,
    lineHeight: 20,
  },
  teacherName: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
    marginBottom: 2,
  },
  duration: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
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
    color: '#1A3C8E',
  },
  freePrice: {
    color: '#00C6A7',
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
    color: '#FFFFFF',
  },
});

export default CoursesScreen;
