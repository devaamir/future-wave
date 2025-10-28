import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BackArrowIcon, SearchIcon, DownloadIcon } from '../components/Icons';
import { theme } from '../theme';

const StudyMaterialScreen = ({ navigation }: any) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = [
    { id: 'All', label: 'All', icon: '📚' },
    { id: 'PDFs', label: 'PDFs', icon: '📄' },
    { id: 'Videos', label: 'Videos', icon: '🎥' },
    { id: 'Notes', label: 'Notes', icon: '🧾' },
    { id: 'Question Papers', label: 'Question Papers', icon: '🧠' },
  ];

  const studyMaterials = [
    {
      id: 1,
      title: 'Physics Notes – Kinematics',
      subtitle: 'Uploaded by Prof. Arya on Oct 20',
      type: 'PDF',
      icon: '📄',
      isNew: true,
    },
    {
      id: 2,
      title: 'Mathematics Video Lectures',
      subtitle: 'Uploaded by Dr. Kumar on Oct 18',
      type: 'Video',
      icon: '🎥',
      isNew: false,
    },
    {
      id: 3,
      title: 'Chemistry Lab Manual',
      subtitle: 'Uploaded by Prof. Nair on Oct 15',
      type: 'PDF',
      icon: '📄',
      isNew: false,
    },
    {
      id: 4,
      title: 'Kerala PSC Previous Papers',
      subtitle: 'Uploaded by Admin on Oct 12',
      type: 'Question Papers',
      icon: '🧠',
      isNew: false,
    },
  ];

  const recommendedMaterials = [
    { id: 1, title: 'Maths Basics', icon: '📘' },
    { id: 2, title: 'Physics Laws', icon: '🎥' },
    { id: 3, title: 'Chemistry Notes', icon: '📄' },
    { id: 4, title: 'Biology Guide', icon: '📗' },
  ];

  const renderMaterialCard = ({ item }: any) => (
    <View style={styles.materialCard}>
      <View style={styles.iconContainer}>
        <Text style={styles.materialIcon}>{item.icon}</Text>
      </View>
      <View style={styles.materialInfo}>
        <View style={styles.titleRow}>
          <Text style={styles.materialTitle}>{item.title}</Text>
          {item.isNew && (
            <View style={styles.newTag}>
              <Text style={styles.newTagText}>New</Text>
            </View>
          )}
        </View>
        <Text style={styles.materialSubtitle}>{item.subtitle}</Text>
      </View>
      <LinearGradient
        colors={['#0056FF', '#2D9CDB']}
        style={styles.actionButton}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TouchableOpacity style={styles.actionButtonContent}>
          <DownloadIcon size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

  const renderRecommendedCard = (item: any) => (
    <TouchableOpacity key={item.id} style={styles.recommendedCard}>
      <Text style={styles.recommendedIcon}>{item.icon}</Text>
      <Text style={styles.recommendedTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BackArrowIcon size={24} color="#2D2D2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Study Material</Text>
        <TouchableOpacity style={styles.searchButton}>
          <SearchIcon size={24} color="#2D2D2D" />
        </TouchableOpacity>
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterBar}
        >
          {filters.map(filter => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterChip,
                activeFilter === filter.id && styles.activeFilterChip,
              ]}
              onPress={() => setActiveFilter(filter.id)}
            >
              <Text style={styles.filterIcon}>{filter.icon}</Text>
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter.id && styles.activeFilterText,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <FlatList
          data={studyMaterials}
          renderItem={renderMaterialCard}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
          style={styles.materialsList}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.recommendedContainer}>
              {recommendedMaterials.map(renderRecommendedCard)}
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
          <Text style={styles.floatingButtonIcon}>➕</Text>
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
    fontSize: 22,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
  },
  searchButton: {
    padding: 8,
  },
  filterBar: {
    // paddingHorizontal: 16,
    marginBottom: 16,
    // height: 48,
    paddingTop: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginHorizontal: 5,
  },
  activeFilterChip: {
    backgroundColor: '#0056FF',
    borderColor: '#0056FF',
  },
  filterIcon: {
    fontSize: 14,
    marginRight: 4,
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
  },
  materialsList: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  materialCard: {
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
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EBF4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  materialIcon: {
    fontSize: 20,
  },
  materialInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  materialTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#111827',
    flex: 1,
  },
  newTag: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 8,
  },
  newTagText: {
    fontSize: 10,
    fontFamily: theme.fonts.bold,
    color: '#1F2937',
  },
  materialSubtitle: {
    fontSize: 13,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#111827',
    marginBottom: 16,
  },
  recommendedContainer: {
    flexDirection: 'row',
  },
  recommendedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 100,
    alignItems: 'center',
    shadowColor: '#E5E7EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recommendedIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  recommendedTitle: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: '#1F2937',
    textAlign: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  floatingButtonContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
});

export default StudyMaterialScreen;
