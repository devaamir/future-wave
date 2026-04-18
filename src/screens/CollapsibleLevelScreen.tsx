import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { BackArrowIcon } from '../components/Icons';
import { getScertSubjects, getScertQuestions } from '../services/api';
import { theme, useColors } from '../theme';


const CollapsibleLevelScreen = ({ route, navigation }: any) => {
  const colors = useColors();
  const palette = useMemo(() => [
  { color: colors.blue, bg: colors.blueBg },
  { color: colors.purple, bg: colors.purpleBg },
  { color: colors.successGreen, bg: colors.greenBgLight },
  { color: colors.accent, bg: colors.amberBg },
  { color: colors.error, bg: colors.errorBg },
], [colors]);
  const styles = useMemo(() => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGrey
  },
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
  back: {
    padding: 8
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: colors.textDark
  },
  list: {
    padding: 16
  },
  section: {
    marginBottom: 12
  },
  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: colors.blackShort,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12
  },
  levelTitle: {
    flex: 1,
    fontSize: 15,
    fontFamily: theme.fonts.bold
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    paddingHorizontal: 4
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 13,
    fontFamily: theme.fonts.semiBold,
    color: colors.white
  },
  categoriesContainer: {
    marginTop: 10,
    paddingHorizontal: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  categoryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  categoryBtnText: {
    fontSize: 13,
    fontFamily: theme.fonts.semiBold
  },
  empty: {
    textAlign: 'center',
    color: colors.textTertiary,
    fontFamily: theme.fonts.regular,
    marginTop: 40
  },
}), [colors]);
  const { title, fetchFn, yearWiseFn, subjectWiseScreen, categoriesFn } = route.params;
  const [items, setItems] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [categories, setCategories] = useState<Record<number, { id: number; name: string }[]>>({});

  useEffect(() => {
    fetchFn().then(({ data }: any) => setItems(data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  const toggle = async (id: number) => {
    const isOpening = !expanded[id];
    setExpanded(prev => ({ ...prev, [id]: isOpening }));
    if (isOpening && categoriesFn && !categories[id]) {
      try {
        const { data } = await categoriesFn(id);
        setCategories(prev => ({ ...prev, [id]: data }));
      } catch (e) { console.error(e); }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.blue} />
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item, index }) => {
            const { color, bg } = palette[index % palette.length];
            const isOpen = expanded[item.id];
            return (
              <View style={styles.section}>
                <TouchableOpacity
                  style={[styles.levelCard, { borderLeftColor: color }]}
                  activeOpacity={0.8}
                  onPress={() => toggle(item.id)}
                >
                  <View style={[styles.dot, { backgroundColor: color }]} />
                  <Text style={[styles.levelTitle, { color }]}>{item.name}</Text>
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                    <Path
                      d={isOpen ? 'M6 9l6 6 6-6' : 'M9 18l6-6-6-6'}
                      stroke={colors.textDisabled} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    />
                  </Svg>
                </TouchableOpacity>

                {isOpen && (
                  categoriesFn ? (
                    <View style={styles.categoriesContainer}>
                      {(categories[item.id] || []).map((cat) => (
                        <TouchableOpacity
                          key={cat.id}
                          style={[styles.categoryBtn, { borderColor: color, backgroundColor: bg }]}
                          activeOpacity={0.8}
                          onPress={() => navigation.navigate('QACategories', {
                            title: cat.name,
                            color,
                            bg,
                            fetchFn: () => getScertSubjects({ category_id: cat.id }),
                            nextScreen: 'QAQuestions',
                            nextParams: (sub: any) => ({
                              title: sub.name,
                              fetchFn: (params: any) => getScertQuestions({ subject_id: sub.id, category_id: cat.id, class_id: item.id, ...params }),
                            }),
                          })}
                        >
                          <Text style={[styles.categoryBtnText, { color }]}>{cat.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : (
                    <View style={styles.buttonsRow}>
                      <TouchableOpacity
                        style={[styles.btn, { backgroundColor: color }]}
                        activeOpacity={0.8}
                        onPress={() => yearWiseFn && navigation.navigate('QACategories', yearWiseFn(item, color, bg))}
                      >
                        <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                          <Path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" stroke={colors.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </Svg>
                        <Text style={styles.btnText}>Year Wise</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.btn, { backgroundColor: bg, borderWidth: 1.5, borderColor: color }]}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate(subjectWiseScreen || 'QASubjects')}
                      >
                        <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                          <Path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </Svg>
                        <Text style={[styles.btnText, { color }]}>Subject Wise</Text>
                      </TouchableOpacity>
                    </View>
                  )
                )}
              </View>
            );
          }}
          ListEmptyComponent={<Text style={styles.empty}>No items available.</Text>}
        />
      )}
    </View>
  );
};


export default CollapsibleLevelScreen;
