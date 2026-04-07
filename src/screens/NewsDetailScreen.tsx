import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme } from '../theme';
import { News } from '../services/api';

const NewsDetailScreen = ({ route, navigation }: any) => {
  const item: News = route.params.item;

  const formattedDate = (date: string) => new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color="#2D2D2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>News & Events</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
        ) : null}

        <View style={styles.content}>
          <View style={styles.meta}>
            <View style={styles.authorBadge}>
              <Text style={styles.authorText}>{item.author}</Text>
            </View>
            <Text style={styles.date}>{formattedDate(item.date)}</Text>
          </View>

          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.body}>{item.content}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
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
  back: { padding: 8 },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#2D2D2D',
  },
  image: {
    width: '100%',
    height: 220,
  },
  content: {
    padding: 20,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    gap: 10,
  },
  authorBadge: {
    backgroundColor: '#EEF2FF',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  authorText: {
    fontSize: 12,
    fontFamily: theme.fonts.semiBold,
    color: '#4F46E5',
  },
  date: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: '#10B981',
  },
  title: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#111827',
    lineHeight: 28,
    marginBottom: 16,
  },
  body: {
    fontSize: 13,
    fontFamily: theme.fonts.regular,
    color: '#374151',
    // lineHeight: 16,
  },
});

export default NewsDetailScreen;
