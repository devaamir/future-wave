import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SearchIcon, CalendarIcon } from '../components/Icons';
import { theme } from '../theme';

const LiveDashboardScreen = ({ navigation }: any) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Today', 'Upcoming', 'Science', 'Maths', 'Languages'];

  const ongoingLive = [
    {
      id: 1,
      title: 'Physics – Thermodynamics',
      tutor: 'Dr. Sarah',
      viewers: 120,
      thumbnail: require('../assets/images/live_screen.png'),
    },
    {
      id: 2,
      title: 'Mathematics – Algebra',
      tutor: 'Prof. Kumar',
      viewers: 85,
      thumbnail: require('../assets/images/maths_thumb.png'),
    },
  ];

  const upcomingSessions = [
    {
      id: 3,
      title: 'Kerala PSC General Studies',
      tutor: 'Dr. Nair',
      time: 'Today, 8:00 PM',
      thumbnail: require('../assets/images/kpsc_thumb.png'),
    },
    {
      id: 4,
      title: 'NEET Biology Revision',
      tutor: 'Dr. Priya',
      time: 'Tomorrow, 9:00 AM',
      thumbnail: require('../assets/images/physics_thumb.png'),
    },
  ];

  const renderOngoingCard = ({ item }: any) => (
    <TouchableOpacity style={styles.ongoingCard}>
      <Image source={item.thumbnail} style={styles.ongoingThumbnail} />
      <View style={styles.liveOverlay}>
        <View style={styles.liveBadge}>
          <Text style={styles.liveText}>🔴 LIVE</Text>
        </View>
        <View style={styles.viewerCount}>
          <Text style={styles.viewerText}>👁 {item.viewers} watching</Text>
        </View>
      </View>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.ongoingGradient}
      >
        <Text style={styles.ongoingTitle}>{item.title}</Text>
        <Text style={styles.ongoingTutor}>{item.tutor}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderUpcomingCard = (session: any) => (
    <View key={session.id} style={styles.upcomingCard}>
      <Image source={session.thumbnail} style={styles.upcomingThumbnail} />
      <View style={styles.upcomingInfo}>
        <Text style={styles.upcomingTitle}>{session.title}</Text>
        <Text style={styles.upcomingTutor}>{session.tutor}</Text>
        <Text style={styles.upcomingTime}>{session.time}</Text>
      </View>
      <LinearGradient
        colors={['#0056FF', '#2D9CDB']}
        style={styles.joinButton}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity style={styles.joinButtonContent}>
          <Text style={styles.joinButtonText}>Join Now</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0056FF', '#2D9CDB']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.headerTitle}>Live Classes</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <SearchIcon size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <CalendarIcon size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterBar}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterChip,
              activeFilter === filter && styles.activeFilterChip,
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter && styles.activeFilterText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ongoing Now</Text>
          <FlatList
            data={ongoingLive}
            renderItem={renderOngoingCard}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.ongoingRow}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
          {upcomingSessions.map(renderUpcomingCard)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PSC Batch Live</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryCard}>
              <Image source={require('../assets/images/kpsc_thumb.png')} style={styles.categoryThumbnail} />
              <Text style={styles.categoryTitle}>Kerala PSC Mains</Text>
              <Text style={styles.categorySubtitle}>Starting Tomorrow</Text>
            </View>
            <View style={styles.categoryCard}>
              <Image source={require('../assets/images/mathematics.webp')} style={styles.categoryThumbnail} />
              <Text style={styles.categoryTitle}>General Studies</Text>
              <Text style={styles.categorySubtitle}>Weekly Sessions</Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      <LinearGradient
        colors={['#0056FF', '#2D9CDB']}
        style={styles.floatingButton}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity style={styles.floatingButtonContent}>
          <Text style={styles.floatingButtonText}>Go Live</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 16,
    padding: 8,
  },
  filterBar: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
  },
  filterContent: {
    paddingHorizontal: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginRight: 8,
  },
  activeFilterChip: {
    backgroundColor: '#0056FF',
    borderColor: '#0056FF',
  },
  filterText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#6B7280',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
    marginBottom: 16,
  },
  ongoingRow: {
    justifyContent: 'space-between',
  },
  ongoingCard: {
    width: '48%',
    height: 120,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    position: 'relative',
  },
  ongoingThumbnail: {
    width: '100%',
    height: '100%',
  },
  liveOverlay: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  liveBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveText: {
    fontSize: 10,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
  },
  viewerCount: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  viewerText: {
    fontSize: 10,
    fontFamily: theme.fonts.medium,
    color: '#FFFFFF',
  },
  ongoingGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
  },
  ongoingTitle: {
    fontSize: 14,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  ongoingTutor: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: '#FFFFFF',
  },
  upcomingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#E5E7EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  upcomingThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },
  upcomingInfo: {
    flex: 1,
  },
  upcomingTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
    marginBottom: 4,
  },
  upcomingTutor: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
    marginBottom: 2,
  },
  upcomingTime: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#0056FF',
  },
  joinButton: {
    borderRadius: 20,
  },
  joinButtonContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  joinButtonText: {
    fontSize: 14,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
    width: 140,
    shadowColor: '#E5E7EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryThumbnail: {
    width: '100%',
    height: 80,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 14,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    borderRadius: 25,
  },
  floatingButtonContent: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  floatingButtonText: {
    fontSize: 14,
    fontFamily: theme.fonts.bold,
    color: '#FFFFFF',
  },
});

export default LiveDashboardScreen;
