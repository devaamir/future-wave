import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme, useColors } from '../theme';
import { getCurrentAffairs, CurrentAffair } from '../services/api';
import Svg, { Path } from 'react-native-svg';

const ChevronRight = ({ color }: { color: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path d="M9 18l6-6-6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ChevronDown = ({ color }: { color: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path d="M6 9l6 6 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface GroupedSection {
  date: string;
  items: CurrentAffair[];
}

const CurrentAffairsScreen = ({ navigation }: any) => {
  const colors = useColors();
  const styles = useMemo(() => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundGrey },
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
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: colors.textDark,
  },
  list: { padding: 16 },
  section: { marginBottom: 12 },
  sectionBorder: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  dateBadge: {
    backgroundColor: colors.greenBg,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: 10,
  },
  dateText: {
    fontSize: 13,
    fontFamily: theme.fonts.semiBold,
    color: colors.successGreenDark,
  },
  count: {
    flex: 1,
    fontSize: 13,
    fontFamily: theme.fonts.regular,
    color: colors.textTertiary,
  },
  card: {
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderLeftWidth: 3,
    borderLeftColor: colors.successGreenDark,
  },
  question: {
    fontSize: 12,
    fontFamily: theme.fonts.regular,
    color: colors.textTertiary,
    lineHeight: 18,
    marginBottom: 8,
  },
  answerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  answerLabel: {
    fontSize: 12,
    fontFamily: theme.fonts.semiBold,
    color: colors.textPrimary,
  },
  answerText: {
    fontSize: 12,
    fontFamily: theme.fonts.bold,
    color: colors.successGreen,
    flex: 1,
    flexShrink: 1,
  },
  empty: {
    textAlign: 'center',
    color: colors.textTertiary,
    fontFamily: theme.fonts.regular,
    marginTop: 40,
  },
}), [colors]);
  const [sections, setSections] = useState<GroupedSection[]>([]);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentAffairs()
      .then(({ data }) => {
        const map: Record<string, CurrentAffair[]> = {};
        data.forEach(item => {
          if (!map[item.date]) map[item.date] = [];
          map[item.date].push(item);
        });
        const grouped = Object.keys(map)
          .sort((a, b) => b.localeCompare(a))
          .map(date => ({ date, items: map[date] }));
        setSections(grouped);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const toggle = (date: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCollapsed(prev => ({ ...prev, [date]: !prev[date] }));
  };

  const renderSection = ({ item: section }: { item: GroupedSection }) => (
    <View style={styles.section}>
      <View style={styles.sectionBorder}>
        <TouchableOpacity style={styles.dateHeader} onPress={() => toggle(section.date)} activeOpacity={0.8}>
          <View style={styles.dateBadge}>
            <Text style={styles.dateText}>{section.date}</Text>
          </View>
          <Text style={styles.count}>{section.items.length} question{section.items.length > 1 ? 's' : ''}</Text>
          {collapsed[section.date] ? <ChevronRight color={colors.textDisabled} /> : <ChevronDown color={colors.textDisabled} />}
        </TouchableOpacity>

        {!collapsed[section.date] && section.items.map((item, index) => (
          <View key={item.id} style={[styles.card, index === section.items.length - 1 && { borderBottomWidth: 0 }]}>
            <Text style={styles.question}>{item.question}</Text>
            <View style={styles.answerRow}>
              <Text style={styles.answerLabel}>Answer: </Text>
              <Text style={styles.answerText}>{item.answer}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Current Affairs</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.successGreenDark} />
      ) : (
        <FlatList
          data={sections}
          renderItem={renderSection}
          keyExtractor={item => item.date}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.empty}>No current affairs available.</Text>}
        />
      )}
    </View>
  );
};


export default CurrentAffairsScreen;
