import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme, useColors } from '../theme';
import { Announcement } from '../services/api';

const screenWidth = Dimensions.get('window').width;

const AnnouncementDetailScreen = ({ route, navigation }: any) => {
  const colors = useColors();
  const styles = useMemo(() => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 50, paddingBottom: 16,
    backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  back: { padding: 8 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 16, fontFamily: theme.fonts.bold, color: colors.textDark },
  content: { padding: 20 },
  date: { fontSize: 12, fontFamily: theme.fonts.medium, color: colors.primaryDeep, marginBottom: 8 },
  title: { fontSize: 20, fontFamily: theme.fonts.bold, color: colors.textHeading, lineHeight: 28, marginBottom: 16 },
  body: { fontSize: 15, fontFamily: theme.fonts.regular, color: colors.textBodyAlt, lineHeight: 24 },
}), [colors]);
  const item: Announcement = route.params.item;
  const [imgHeight, setImgHeight] = useState(220);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>Announcement</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {item.photo ? (
          <Image
            source={{ uri: item.photo }}
            style={{ width: screenWidth, height: imgHeight }}
            resizeMode="contain"
            onLoad={e => {
              const { width, height } = e.nativeEvent.source;
              setImgHeight((height / width) * screenWidth);
            }}
          />
        ) : null}

        <View style={styles.content}>
          <Text style={styles.date}>{item.created_at.slice(0, 10)}</Text>
          <Text style={styles.title}>{item.title}</Text>
          {item.description ? <Text style={styles.body}>{item.description}</Text> : null}
        </View>
      </ScrollView>
    </View>
  );
};


export default AnnouncementDetailScreen;
