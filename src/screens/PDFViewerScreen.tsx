import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Pdf from 'react-native-pdf';
import { BackArrowIcon } from '../components/Icons';
import { theme } from '../theme';

const PDFViewerScreen = ({ route, navigation }: any) => {
  const { url, title } = route.params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <BackArrowIcon size={24} color="#2D2D2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{title || 'Document'}</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading && !error && (
        <ActivityIndicator style={styles.loader} size="large" color="#3A8EDB" />
      )}

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>Failed to load PDF.</Text>
          <TouchableOpacity onPress={() => { setError(false); setLoading(true); }}>
            <Text style={styles.retry}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Pdf
          source={{ uri: url, cache: true }}
          style={styles.pdf}
          trustAllCerts={false}
          onLoadComplete={() => setLoading(false)}
          onError={() => { setLoading(false); setError(true); }}
        />
      )}
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
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 16, fontFamily: theme.fonts.bold, color: '#2D2D2D' },
  loader: { position: 'absolute', top: '50%', alignSelf: 'center', zIndex: 1 },
  pdf: { flex: 1, width: '100%' },
  errorBox: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  errorText: { fontSize: 14, fontFamily: theme.fonts.regular, color: '#6B7280' },
  retry: { fontSize: 14, fontFamily: theme.fonts.bold, color: '#3A8EDB' },
});

export default PDFViewerScreen;
