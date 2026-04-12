import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { BackArrowIcon } from '../components/Icons';
import { theme } from '../theme';

const options = [
  {
    label: 'Practice OMR',
    subtitle: 'Practice with standard OMR sheets',
    color: '#F39C12',
    bg: '#FFF8EC',
    showModal: true,
    icon: (
      <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
        <Path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="#F39C12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Circle cx="9" cy="12" r="1" fill="#F39C12" />
        <Circle cx="9" cy="16" r="1" fill="#F39C12" />
        <Circle cx="12" cy="12" r="1" fill="#F39C12" />
        <Circle cx="12" cy="16" r="1" fill="#F39C12" />
        <Circle cx="15" cy="12" r="1" fill="#F39C12" />
        <Circle cx="15" cy="16" r="1" fill="#F39C12" />
      </Svg>
    ),
  },
  {
    label: 'Practice PQ OMR',
    subtitle: 'Practice with previous question OMR',
    color: '#7B5ACF',
    bg: '#F3EEFF',
    showModal: true,
    icon: (
      <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
        <Path d="M12 8v4l3 3M3.05 11a9 9 0 1 0 .5-3M3 4v4h4" stroke="#7B5ACF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    ),
  },
  {
    label: 'History',
    subtitle: 'View your past OMR attempts',
    color: '#3A8EDB',
    bg: '#EBF4FF',
    showModal: false,
    icon: (
      <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
        <Path d="M4 6h16M4 10h16M4 14h8M4 18h8" stroke="#3A8EDB" strokeWidth="2" strokeLinecap="round" />
      </Svg>
    ),
  },
  {
    label: 'Performance',
    subtitle: 'Analyse your OMR performance',
    color: '#10B981',
    bg: '#ECFDF5',
    showModal: false,
    icon: (
      <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
        <Path d="M3 17l4-4 4 4 4-6 4 2" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    ),
  },
];

const modalOptions = [
  { label: 'Physical OMR', subtitle: 'Scan & submit a physical OMR sheet', color: '#F39C12', bg: '#FFF8EC', online: false },
  { label: 'Online OMR', subtitle: 'Fill and submit OMR online', color: '#3A8EDB', bg: '#EBF4FF', online: true },
];

const instructions = [
  'This is a timed OMR test. Make sure you have a stable internet connection.',
  'Each question has 4 options. Select only one answer per question.',
  'You cannot go back and change answers once submitted.',
  'Do not close or refresh the app during the test.',
  'Your score will be displayed immediately after submission.',
];

const OMRPracticeScreen = ({ navigation }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [instructionVisible, setInstructionVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color="#2D2D2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>OMR Practice</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.list}>
        {options.map(opt => (
          <TouchableOpacity
            key={opt.label}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => {
              if (opt.showModal) { setSelectedOption(opt.label); setModalVisible(true); }
            }}
          >
            <View style={[styles.iconBox, { backgroundColor: opt.bg }]}>{opt.icon}</View>
            <View style={styles.info}>
              <Text style={[styles.label, { color: opt.color }]}>{opt.label}</Text>
              <Text style={styles.subtitle}>{opt.subtitle}</Text>
            </View>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path d="M9 18l6-6-6-6" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </TouchableOpacity>
        ))}
      </View>

      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={() => setModalVisible(false)}>
          <View style={styles.sheet}>
            <View style={styles.handle} />
            <Text style={styles.sheetTitle}>{selectedOption}</Text>
            <Text style={styles.sheetSubtitle}>Choose your mode</Text>
            {modalOptions.map(opt => (
              <TouchableOpacity
                key={opt.label}
                style={[styles.modalCard, { borderLeftColor: opt.color }]}
                activeOpacity={0.8}
                onPress={() => {
                  if (opt.online) { setModalVisible(false); setInstructionVisible(true); }
                  else setModalVisible(false);
                }}
              >
                <View style={[styles.modalDot, { backgroundColor: opt.bg }]}>
                  <View style={[styles.modalDotInner, { backgroundColor: opt.color }]} />
                </View>
                <View style={styles.info}>
                  <Text style={[styles.label, { color: opt.color }]}>{opt.label}</Text>
                  <Text style={styles.subtitle}>{opt.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal visible={instructionVisible} transparent animationType="slide" onRequestClose={() => setInstructionVisible(false)}>
        <View style={styles.overlay}>
          <View style={[styles.sheet, { maxHeight: '80%' }]}>
            <View style={styles.handle} />
            <Text style={styles.sheetTitle}>Instructions</Text>
            <Text style={styles.sheetSubtitle}>Please read before starting</Text>
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 16 }}>
              {instructions.map((text, i) => (
                <View key={i} style={styles.instructionRow}>
                  <View style={styles.instructionBullet}>
                    <Text style={styles.bulletText}>{i + 1}</Text>
                  </View>
                  <Text style={styles.instructionText}>{text}</Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.startBtn} activeOpacity={0.85} onPress={() => { setInstructionVisible(false); navigation.navigate('OnlineOMR' as never, { type: selectedOption } as never); }}>
              <Text style={styles.startBtnText}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 50, paddingBottom: 16,
    backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E5E7EB',
  },
  back: { padding: 8 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontFamily: theme.fonts.bold, color: '#2D2D2D' },
  list: { padding: 16 },
  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF',
    borderRadius: 14, padding: 16, marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 2,
  },
  iconBox: { width: 52, height: 52, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  info: { flex: 1 },
  label: { fontSize: 14, fontFamily: theme.fonts.bold, marginBottom: 3 },
  subtitle: { fontSize: 12, fontFamily: theme.fonts.regular, color: '#6B7280' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24, paddingBottom: 40,
  },
  handle: { width: 40, height: 4, backgroundColor: '#E5E7EB', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  sheetTitle: { fontSize: 18, fontFamily: theme.fonts.bold, color: '#111827', marginBottom: 4 },
  sheetSubtitle: { fontSize: 13, fontFamily: theme.fonts.regular, color: '#6B7280', marginBottom: 20 },
  modalCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB',
    borderRadius: 12, padding: 16, marginBottom: 12, borderLeftWidth: 4,
  },
  modalDot: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  modalDotInner: { width: 16, height: 16, borderRadius: 8 },
  instructionRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14 },
  instructionBullet: {
    width: 24, height: 24, borderRadius: 12, backgroundColor: '#EBF4FF',
    justifyContent: 'center', alignItems: 'center', marginRight: 12, marginTop: 1,
  },
  bulletText: { fontSize: 11, fontFamily: theme.fonts.bold, color: '#3A8EDB' },
  instructionText: { flex: 1, fontSize: 13, fontFamily: theme.fonts.regular, color: '#374151', lineHeight: 20 },
  startBtn: {
    backgroundColor: '#3A8EDB', borderRadius: 12, paddingVertical: 14,
    alignItems: 'center',
  },
  startBtnText: { fontSize: 15, fontFamily: theme.fonts.bold, color: '#FFFFFF' },
});

export default OMRPracticeScreen;
