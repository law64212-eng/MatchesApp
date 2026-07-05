import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../constants/colors';

export default function ChannelItem({ channel }) {
  return (
    <View style={styles.item}>
      <Ionicons name="tv-outline" size={20} color={COLORS.primary} />
      <View style={styles.textWrap}>
        <Text style={styles.channelName}>{channel.channel}</Text>
        <Text style={styles.details}>
          {channel.country} · {channel.satellite}
        </Text>
        <Text style={styles.frequency}>التردد: {channel.frequency}</Text>
        {channel.note ? <Text style={styles.note}>{channel.note}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row-reverse',
    backgroundColor: COLORS.surfaceElevated,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  textWrap: {
    marginRight: 10,
    flex: 1,
  },
  channelName: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'right',
  },
  details: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 2,
    textAlign: 'right',
  },
  frequency: {
    color: COLORS.primary,
    fontSize: 13,
    marginTop: 4,
    textAlign: 'right',
  },
  note: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 4,
    textAlign: 'right',
    fontStyle: 'italic',
  },
});
