import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { BackArrowIcon } from '../components/Icons';
import { theme, useColors } from '../theme';
import { getMultimediaSubjects } from '../services/api';

const VideosScreen = ({ navigation }: any) => {
  const colors = useColors();
  const styles = useMemo(() => StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.backgroundGrey },
    header: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      paddingHorizontal: 16, paddingTop: 50, paddingBottom: 16,
      backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.border,
    },
    back: { padding: 8 },
    headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontFamily: theme.fonts.bold, color: colors.textDark },
    list: { padding: 16 },
    card: {
      flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white,
      borderRadius: 14, padding: 16, marginBottom: 12,
      shadowColor: colors.blackShort, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 2,
    },
    iconBox: { width: 52, height: 52, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
    info: { flex: 1 },
    label: { fontSize: 14, fontFamily: theme.fonts.bold, marginBottom: 3 },
    subtitle: { fontSize: 12, fontFamily: theme.fonts.regular, color: colors.textTertiary },
  }), [colors]);

  const options = [
    {
      label: 'Public Videos', subtitle: 'Free videos available to everyone',
      color: colors.errorAlt, bg: colors.errorBgAlt, type: 'public',
      icon: <Svg width={28} height={28} viewBox="0 0 24 24" fill="none"><Path d="M15 10l4.553-2.277A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" stroke={colors.errorAlt} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></Svg>,
    },
    {
      label: 'Private Videos', subtitle: 'Exclusive videos for enrolled students',
      color: colors.purple, bg: colors.purpleBg, type: 'private',
      icon: <Svg width={28} height={28} viewBox="0 0 24 24" fill="none"><Path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke={colors.purple} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></Svg>,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Videos</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.list}>
        {options.map(opt => (
          <TouchableOpacity
            key={opt.type}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('VideoSubjects', {
              title: opt.label, color: opt.color, bg: opt.bg,
              fetchFn: () => getMultimediaSubjects(opt.type === 'public' ? 'PUBLIC' : 'PRIVATE'),
              nextScreen: 'MultimediaVideos',
              nextParams: (subject: any) => ({
                title: subject.name, subjectId: subject.id,
                privacy: opt.type === 'public' ? 'PUBLIC' : 'PRIVATE',
                color: opt.color, bg: opt.bg,
              }),
            })}
          >
            <View style={[styles.iconBox, { backgroundColor: opt.bg }]}>{opt.icon}</View>
            <View style={styles.info}>
              <Text style={[styles.label, { color: opt.color }]}>{opt.label}</Text>
              <Text style={styles.subtitle}>{opt.subtitle}</Text>
            </View>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path d="M9 18l6-6-6-6" stroke={colors.textDisabled} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default VideosScreen;
