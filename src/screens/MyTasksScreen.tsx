import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import { BackArrowIcon } from '../components/Icons';
import { theme, useColors } from '../theme';

interface Task {
  id: number;
  title: string;
  description: string;
  done: boolean;
}

const INITIAL_TASKS: Task[] = [
  { id: 1, title: 'Complete Study Material', description: 'Finish reading Chapter 3', done: false },
  { id: 2, title: 'Practice OMR', description: 'Attempt 1 full OMR test', done: false },
  { id: 3, title: 'Revise Current Affairs', description: 'Read last 7 days news', done: true },
  { id: 4, title: 'Solve Previous Questions', description: 'Complete 20 PQ questions', done: false },
];

const MyTasksScreen = ({ navigation }: any) => {
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
  statsRow: { flexDirection: 'row', gap: 12, padding: 16 },
  statBox: {
    flex: 1, borderRadius: 12, padding: 14, alignItems: 'center',
  },
  statNum: { fontSize: 24, fontFamily: theme.fonts.bold },
  statLabel: { fontSize: 12, fontFamily: theme.fonts.regular, color: colors.textTertiary, marginTop: 2 },
  list: { paddingHorizontal: 16, paddingBottom: 24 },
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white,
    borderRadius: 12, padding: 14, marginBottom: 10,
    shadowColor: colors.blackShort, shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  cardDone: { opacity: 0.6 },
  checkbox: {
    width: 24, height: 24, borderRadius: 12, borderWidth: 2,
    borderColor: colors.borderMuted, justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  checkboxDone: { backgroundColor: colors.successGreenDeep, borderColor: colors.successGreenDeep },
  checkmark: { color: colors.white, fontSize: 13, fontFamily: theme.fonts.bold },
  taskInfo: { flex: 1 },
  taskTitle: { fontSize: 14, fontFamily: theme.fonts.semiBold, color: colors.textPrimary },
  taskTitleDone: { textDecorationLine: 'line-through', color: colors.textDisabled },
  taskDesc: { fontSize: 12, fontFamily: theme.fonts.regular, color: colors.textTertiary, marginTop: 2 },
  empty: { textAlign: 'center', color: colors.textTertiary, fontFamily: theme.fonts.regular, marginTop: 40 },
}), [colors]);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const toggleTask = (id: number) =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));

  const pending = tasks.filter(t => !t.done);
  const completed = tasks.filter(t => t.done);

  const renderItem = ({ item }: { item: Task }) => (
    <TouchableOpacity
      style={[styles.card, item.done && styles.cardDone]}
      activeOpacity={0.8}
      onPress={() => toggleTask(item.id)}
    >
      <View style={[styles.checkbox, item.done && styles.checkboxDone]}>
        {item.done && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <View style={styles.taskInfo}>
        <Text style={[styles.taskTitle, item.done && styles.taskTitleDone]}>{item.title}</Text>
        <Text style={styles.taskDesc}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Tasks</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statBox, { backgroundColor: colors.blueBg }]}>
          <Text style={[styles.statNum, { color: colors.blue }]}>{pending.length}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: colors.greenBgLight }]}>
          <Text style={[styles.statNum, { color: colors.successGreenDeep }]}>{completed.length}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.empty}>No tasks yet.</Text>}
      />
    </View>
  );
};


export default MyTasksScreen;
