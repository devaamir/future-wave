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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

const FileIcon = ({ color }: { color: string }) => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    />
    <Path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
  const insets = useSafeAreaInsets();

  const styles = useMemo(() => StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.backgroundGrey },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingTop: insets.top + 16,
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
      gap: 8,
    },
    cardTitle: {
      fontSize: 14,
      fontFamily: theme.fonts.semiBold,
      color: colors.textPrimary,
    },
    tagsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
    },
    tag: {
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    tagLevel: {
      backgroundColor: colors.indigoBg,
    },
    tagCategory: {
      backgroundColor: colors.amberBg,
    },
    tagLevelText: {
      fontSize: 11,
      fontFamily: theme.fonts.semiBold,
      color: colors.indigo,
    },
    tagCategoryText: {
      fontSize: 11,
      fontFamily: theme.fonts.semiBold,
      color: colors.amberDark,
    },
    detailsText: {
      fontSize: 12,
      fontFamily: theme.fonts.regular,
      color: colors.textTertiary,
      lineHeight: 18,
    },
    contentText: {
      fontSize: 12,
      fontFamily: theme.fonts.regular,
      color: colors.textTertiary,
      lineHeight: 18,
    },
    pdfButton: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      gap: 6,
      backgroundColor: colors.greenBgLight,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 6,
    },
    pdfButtonText: {
      fontSize: 12,
      fontFamily: theme.fonts.semiBold,
      color: colors.successGreenDark,
    },
    empty: {
      textAlign: 'center',
      color: colors.textTertiary,
      fontFamily: theme.fonts.regular,
      marginTop: 40,
    },
  }), [colors, insets]);

  const [sections, setSections] = useState<GroupedSection[]>([]);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('[CurrentAffairs] Fetching current affairs...');
    getCurrentAffairs()
      .then(({ data }) => {
        console.log('[CurrentAffairs] API response:', data);
        const map: Record<string, CurrentAffair[]> = {};
        data.forEach(item => {
          if (!map[item.date]) map[item.date] = [];
          map[item.date].push(item);
        });
        const grouped = Object.keys(map)
          .sort((a, b) => b.localeCompare(a))
          .map(date => ({ date, items: map[date] }));
        console.log('[CurrentAffairs] Grouped sections:', grouped.length, 'date(s)');
        setSections(grouped);
      })
      .catch(error => {
        console.error('[CurrentAffairs] API error:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  const toggle = (date: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCollapsed(prev => ({ ...prev, [date]: !prev[date] }));
  };

  const renderCard = (item: CurrentAffair, index: number, total: number) => (
    <View
      key={item.id}
      style={[styles.card, index === total - 1 && { borderBottomWidth: 0 }]}
    >
      {/* Title */}
      <Text style={styles.cardTitle}>{item.title}</Text>

      {/* Level + Category tags */}
      <View style={styles.tagsRow}>
        {!!item.level && (
          <View style={[styles.tag, styles.tagLevel]}>
            <Text style={styles.tagLevelText}>{item.level}</Text>
          </View>
        )}
        {!!item.category && (
          <View style={[styles.tag, styles.tagCategory]}>
            <Text style={styles.tagCategoryText}>{item.category}</Text>
          </View>
        )}
        {!!item.qp_code && (
          <View style={[styles.tag, { backgroundColor: colors.tealBg }]}>
            <Text style={[styles.tagLevelText, { color: colors.primaryDeep }]}>
              {item.qp_code}
            </Text>
          </View>
        )}
      </View>

      {/* Details */}
      {!!item.details && (
        <Text style={styles.detailsText}>{item.details}</Text>
      )}

      {/* Content */}
      {!!item.content && (
        <Text style={styles.contentText}>{item.content}</Text>
      )}

      {/* PDF attachment */}
      {!!item.file_attachment && (
        <TouchableOpacity
          style={styles.pdfButton}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate('PDFViewer', {
              url: item.file_attachment,
              title: item.title,
            })
          }
        >
          <FileIcon color={colors.successGreenDark} />
          <Text style={styles.pdfButtonText}>View PDF</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderSection = ({ item: section }: { item: GroupedSection }) => (
    <View style={styles.section}>
      <View style={styles.sectionBorder}>
        <TouchableOpacity
          style={styles.dateHeader}
          onPress={() => toggle(section.date)}
          activeOpacity={0.8}
        >
          <View style={styles.dateBadge}>
            <Text style={styles.dateText}>{section.date}</Text>
          </View>
          <Text style={styles.count}>
            {section.items.length} item{section.items.length !== 1 ? 's' : ''}
          </Text>
          {collapsed[section.date]
            ? <ChevronRight color={colors.textDisabled} />
            : <ChevronDown color={colors.textDisabled} />}
        </TouchableOpacity>

        {!collapsed[section.date] &&
          section.items.map((item, index) =>
            renderCard(item, index, section.items.length),
          )}
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
          ListEmptyComponent={
            <Text style={styles.empty}>No current affairs available.</Text>
          }
        />
      )}
    </View>
  );
};

export default CurrentAffairsScreen;
