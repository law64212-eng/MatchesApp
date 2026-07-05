import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import COLORS from '../constants/colors';

const STATUS_LABELS = {
  SCHEDULED: 'لم تبدأ',
  TIMED: 'لم تبدأ',
  LIVE: 'مباشر',
  IN_PLAY: 'مباشر',
  PAUSED: 'استراحة',
  FINISHED: 'انتهت',
  POSTPONED: 'مؤجلة',
  CANCELLED: 'ملغاة',
};

function formatTime(utcDate) {
  const date = new Date(utcDate);
  return date.toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' });
}

export default function MatchCard({ match, onPress }) {
  const isLive = match.status === 'LIVE' || match.status === 'IN_PLAY' || match.status === 'PAUSED';
  const homeScore = match.score?.fullTime?.home ?? '-';
  const awayScore = match.score?.fullTime?.away ?? '-';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <Text style={styles.competition}>{match.competition?.name}</Text>
        {isLive ? (
          <View style={styles.liveBadge}>
            <Text style={styles.liveText}>مباشر</Text>
          </View>
        ) : (
          <Text style={styles.status}>{STATUS_LABELS[match.status] || match.status}</Text>
        )}
      </View>

      <View style={styles.teamsRow}>
        <Text style={styles.teamName} numberOfLines={1}>{match.homeTeam?.name}</Text>
        <Text style={styles.score}>
          {match.status === 'SCHEDULED' || match.status === 'TIMED'
            ? formatTime(match.utcDate)
            : `${homeScore} - ${awayScore}`}
        </Text>
        <Text style={styles.teamName} numberOfLines={1}>{match.awayTeam?.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  competition: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  status: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  liveBadge: {
    backgroundColor: COLORS.live,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  liveText: {
    color: '#04150A',
    fontSize: 11,
    fontWeight: '700',
  },
  teamsRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamName: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  score: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: '800',
    marginHorizontal: 10,
    minWidth: 60,
    textAlign: 'center',
  },
});
