import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { BackArrowIcon } from '../components/Icons';
import { theme, useColors } from '../theme';
import { getPrevLevels, getPrevExamCategories, getScertClasses, getScertCategories, getScertNotesClasses } from '../services/api';

const LearningSectionScreen = ({ navigation }: any) => {
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
      shadowColor: colors.blackShort, shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07, shadowRadius: 6, elevation: 2,
    },
    iconBox: { width: 52, height: 52, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
    info: { flex: 1 },
    title: { fontSize: 13, fontFamily: theme.fonts.bold, marginBottom: 3 },
    subtitle: { fontSize: 12, fontFamily: theme.fonts.regular, color: colors.textTertiary },
  }), [colors]);

  const menus = [
    {
      title: 'Question & Answers', subtitle: 'Practice with Q&A sets',
      color: colors.purple, bg: colors.purpleBg,
      icon: <Svg width={28} height={28} viewBox="0 0 24 24" fill="none"><Path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke={colors.purple} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></Svg>,
    },
    {
      title: 'Previous Questions', subtitle: 'Past exam question papers',
      color: colors.blueAlt, bg: colors.blueBg,
      icon: <Svg width={28} height={28} viewBox="0 0 24 24" fill="none"><Path d="M12 8v4l3 3M3.05 11a9 9 0 1 0 .5-3M3 4v4h4" stroke={colors.blueAlt} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></Svg>,
    },
    {
      title: 'SCERT Questions', subtitle: 'State curriculum questions',
      color: colors.accent, bg: colors.amberBg,
      icon: <Svg width={28} height={28} viewBox="0 0 24 24" fill="none"><Path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 12h6M9 16h4" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></Svg>,
    },
    {
      title: 'Capsules', subtitle: 'Quick revision capsules',
      color: colors.successGreen, bg: colors.greenBgLight,
      icon: <Svg width={28} height={28} viewBox="0 0 24 24" fill="none"><Path d="M12 2a5 5 0 00-5 5v10a5 5 0 0010 0V7a5 5 0 00-5-5z" stroke={colors.successGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><Path d="M7 12h10" stroke={colors.successGreen} strokeWidth="2" strokeLinecap="round" /></Svg>,
    },
    {
      title: 'SCERT Notes', subtitle: 'Detailed SCERT study notes',
      color: colors.error, bg: colors.errorBg,
      icon: <Svg width={28} height={28} viewBox="0 0 24 24" fill="none"><Path d="M4 19V6.2C4 5.08 4 4.52 4.22 4.09A2 2 0 015.09 3.22C5.52 3 6.08 3 7.2 3h9.6c1.12 0 1.68 0 2.11.22a2 2 0 01.87.87C20 4.52 20 5.08 20 6.2V17H6a2 2 0 00-2 2zm0 0a2 2 0 002 2h14M9 7h6M9 11h6" stroke={colors.error} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></Svg>,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Learning Section</Text>
        <View style={{ width: 40 }} />
      </View>
      <View style={styles.list}>
        {menus.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => {
              if (i === 0) navigation.navigate('QASubjects');
              if (i === 1) navigation.navigate('PreviousQuestions', {
                title: 'Previous Questions',
                fetchFn: getPrevLevels,
                yearWiseFn: (item: any, color: string, bg: string) => ({
                  title: 'Year Wise', color, bg,
                  fetchFn: () => getPrevExamCategories({ level_id: item.id }),
                  nextScreen: 'QAQuestions',
                  nextParams: (cat: any) => ({ subcategory: cat.name, subcategoryId: cat.id }),
                }),
              });
              if (i === 2) navigation.navigate('SCERTQuestions', {
                title: 'SCERT Questions', fetchFn: getScertClasses, yearWiseFn: null,
                categoriesFn: (classId: number) => getScertCategories({ class_id: classId }),
              });
              if (i === 3) navigation.navigate('CapsuleSubjects');
              if (i === 4) navigation.navigate('QACategories', {
                title: 'SCERT Notes', color: colors.error, bg: colors.errorBg,
                fetchFn: getScertNotesClasses, nextScreen: 'ScertNotesSubjects',
                nextParams: (cls: any) => ({ classId: cls.id, className: cls.name }),
              });
            }}
          >
            <View style={[styles.iconBox, { backgroundColor: item.bg }]}>{item.icon}</View>
            <View style={styles.info}>
              <Text style={[styles.title, { color: item.color }]}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
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

export default LearningSectionScreen;
