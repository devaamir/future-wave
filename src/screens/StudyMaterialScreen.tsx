import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../theme';
import { getStudyMaterials, StudyMaterial } from '../services/api';

const DownloadIcon = ({ size = 16, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M8 12L12 16M12 16L16 12M12 16V4M4 20H20"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </Svg>
);

const StudyMaterialScreen = ({ navigation }: any) => {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const { data } = await getStudyMaterials();
      setMaterials(data.results);
      setNextPage(data.next);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchMore = async () => {
    if (!nextPage || loadingMore) return;
    try {
      setLoadingMore(true);
      const { data } = await getStudyMaterials({ page: new URL(nextPage).searchParams.get('page') });
      setMaterials(prev => [...prev, ...data.results]);
      setNextPage(data.next);
    } finally {
      setLoadingMore(false);
    }
  };

  const renderMaterialCard = ({ item }: { item: StudyMaterial }) => (
    <TouchableOpacity
      style={styles.materialCard}
      activeOpacity={0.8}
      onPress={() => item.file && navigation.navigate('PDFViewer', { url: item.file, title: item.title })}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.iconText}>📄</Text>
      </View>
      <View style={styles.materialInfo}>
        <Text style={styles.materialTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.materialSubtitle} numberOfLines={1}>{item.subject.name} • {item.date}</Text>
      </View>
      <View style={styles.actionButton}>
        <DownloadIcon size={16} color="#FFFFFF" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <BackArrowIcon size={24} color="#2D2D2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Study Material</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color="#0056FF" />
      ) : (
        <FlatList
          data={materials}
          renderItem={renderMaterialCard}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          onEndReached={fetchMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={loadingMore ? <ActivityIndicator color="#0056FF" style={{ marginVertical: 16 }} /> : null}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
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
  backButton: { padding: 8 },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
  },
  list: { padding: 16 },
  materialCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
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
  iconText: { fontSize: 22 },
  materialInfo: { flex: 1 },
  materialTitle: {
    fontSize: 13,
    fontFamily: theme.fonts.bold,
    color: '#111827',
    marginBottom: 3,
  },
  materialSubtitle: {
    fontSize: 11,
    fontFamily: theme.fonts.regular,
    color: '#6B7280',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0056FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StudyMaterialScreen;
