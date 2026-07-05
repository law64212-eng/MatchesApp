import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import ChannelItem from '../components/ChannelItem';
import { getChannelsData } from '../services/channelsService';
import { findChannelsForMatch } from '../data/channelsTemplate';

export default function MatchDetailScreen({ route }) {
  const { match } = route.params;
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getChannelsData();
      const found = findChannelsForMatch(data, match.homeTeam?.name, match.awayTeam?.name);
      setChannels(found);
      setLoading(false);
    })();
  }, [match]);

  const homeScore = match.score?.fullTime?.home ?? '-';
  const awayScore = match.score?.fullTime?.away ?? '-';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={styles.scoreCard}>
          <Text style={styles.competition}>{match.competition?.name}</Text>
          <View style={styles.teamsRow}>
            <Text style={styles.teamName}>{match.homeTeam?.name}</Text>
            <Text style={styles.score}>{homeScore} - {awayScore}</Text>
            <Text style={styles.teamName}>{match.awayTeam?.name}</Text>
          </View>
          <Text style={styles.venue}>{match.venue || ''}</Text>
        </View>

        <Text style={styles.sectionTitle}>القنوات الناقلة</Text>

        {loading ? (
          <ActivityIndicator color={COLORS.primary} style={{ marginTop: 20 }} />
        ) : channels.length > 0 ? (
          channels.map((ch, idx) => <ChannelItem key={idx} channel={ch} />)
        ) : (
          <Text style={styles.emptyText}>
            لا توجد بيانات قنوات لهذه المباراة بعد. أضفها في ملف القنوات الخارجي (channels.json)
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  scoreCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  competition: {
    color: COLORS.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 10,
  },
  teamsRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamName: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  score: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: '800',
    marginHorizontal: 12,
  },
  venue: {
    color: COLORS.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
  sectionTitle: {
    color: COLORS.textPrimary,
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'right',
    marginBottom: 10,
  },
  emptyText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 20,
  },
});
