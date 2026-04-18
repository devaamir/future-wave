import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme, useColors } from '../theme';
import { News } from '../services/api';

const NewsDetailScreen = ({ route, navigation }: any) => {
  const colors = useColors();
  const styles = useMemo(() => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  back: { padding: 8 },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: colors.textDark,
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
    backgroundColor: colors.indigoBg,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  authorText: {
    fontSize: 12,
    fontFamily: theme.fonts.semiBold,
    color: colors.indigo,
  },
  date: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: colors.successGreen,
  },
  title: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: colors.textHeading,
    lineHeight: 28,
    marginBottom: 16,
  },
  body: {
    fontSize: 13,
    fontFamily: theme.fonts.regular,
    color: colors.textBodyAlt,
    // lineHeight: 16,
  },
}), [colors]);
  const item: News = route.params.item;

  const formattedDate = (date: string) => new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color={colors.textDark} />
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


export default NewsDetailScreen;
