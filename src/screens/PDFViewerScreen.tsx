import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Pdf from 'react-native-pdf';
import { BackArrowIcon } from '../components/Icons';
import { theme } from '../theme';

const PDFViewerScreen = ({ route, navigation }: any) => {
  const { url, title } = route.params;
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color="#2D2D2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{title || 'Document'}</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading && (
        <ActivityIndicator style={styles.loader} size="large" color="#0056FF" />
      )}

      <Pdf
        source={{ uri: url, cache: true }}
        style={styles.pdf}
        onLoadComplete={() => setLoading(false)}
        onError={() => setLoading(false)}
        enablePaging
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
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
  loader: {
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
    zIndex: 1,
  },
  pdf: {
    flex: 1,
    width: '100%',
  },
});

export default PDFViewerScreen;
