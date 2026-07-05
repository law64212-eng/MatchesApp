import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MatchCard from '../components/MatchCard';
import COLORS from '../constants/colors';
import { getMatchesByDate } from '../services/footballApi';

function todayISO(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

export default function MatchesScreen({ navigation }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dayOffset, setDayOffset] = useState(0);

  const loadMatches = useCallback(async (offset) => {
    const data = await getMatchesByDate(todayISO(offset));
    setMatches(data);
  }, []);

  useEffect(() => {
    setLoading(true);
    loadMatches(dayOffset).finally(() => setLoading(false));
  }, [dayOffset, loadMatches]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMatches(dayOffset);
    setRefreshing(false);
  };

  const dayLabel = dayOffset === 0 ? 'اليوم' : dayOffset === 1 ? 'غدًا' : dayOffset === -1 ? 'أمس' : todayISO(dayOffset);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>مباريات {dayLabel}</Text>

      <View style={styles.dayNav}>
        <TouchableOpacity onPress={() => setDayOffset((d) => d - 1)} style={styles.dayButton}>
          <Text style={styles.dayButtonText}>اليوم السابق</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDayOffset(0)} style={styles.dayButton}>
          <Text style={styles.dayButtonText}>اليوم</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDayOffset((d) => d + 1)} style={styles.dayButton}>
          <Text style={styles.dayButtonText}>اليوم التالي</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator color={COLORS.primary} size="large" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={matches}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ paddingBottom: 24 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>لا توجد مباريات في هذا اليوم</Text>
          }
          renderItem={({ item }) => (
            <MatchCard match={item} onPress={() => navigation.navigate('MatchDetail', { match: item })} />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'right',
    marginBottom: 12,
  },
  dayNav: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  dayButton: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dayButtonText: {
    color: COLORS.textPrimary,
    fontSize: 12,
  },
  emptyText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 40,
  },
});
