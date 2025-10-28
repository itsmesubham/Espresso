import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StaffHomeStackParamList } from '../../navigation/staffTypes';
import { useEspressoStore } from '../../store/useEspressoStore';
import { useTheme } from '../../theme';
import { formatRelativeTime } from '../../utils/format';

const shortcuts = [
  { label: 'New personal notice', screen: 'PersonalNoticeComposer' as const },
  { label: 'Broadcast now', screen: 'BroadcastCenter' as const },
  { label: 'Inbox', screen: 'StaffInbox' as const },
];

export const StaffHomeScreen = ({
  navigation,
}: NativeStackScreenProps<StaffHomeStackParamList, 'StaffHomeMain'>) => {
  const theme = useTheme();
  const fetchPublicNotices = useEspressoStore((state) => state.fetchPublicNotices);
  const fetchWaitlist = useEspressoStore((state) => state.loadWaitlist);
  const waitlist = useEspressoStore((state) => state.waitlist.waitlist);
  const notices = useEspressoStore((state) => state.notices.publicNotices.slice(0, 2));

  useEffect(() => {
    fetchPublicNotices();
    fetchWaitlist();
  }, [fetchPublicNotices, fetchWaitlist]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.heading, { color: theme.colors.text }]}>Floor snapshot</Text>
      <View style={styles.shortcuts}>
        {shortcuts.map((shortcut) => (
          <TouchableOpacity
            key={shortcut.label}
            style={[styles.shortcut, { backgroundColor: theme.colors.primary }]}
            onPress={() => navigation.navigate(shortcut.screen)}
            accessibilityLabel={shortcut.label}
          >
            <Text style={styles.shortcutLabel}>{shortcut.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.panel, { borderColor: theme.colors.border }]}
        accessibilityRole="summary"
      >
        <Text style={[styles.panelTitle, { color: theme.colors.text }]}>Waitlist</Text>
        {waitlist.map((entry) => (
          <View key={entry.id} style={styles.row}>
            <Text style={[styles.rowPrimary, { color: theme.colors.text }]}>
              {entry.guestName} • {entry.partySize} ppl
            </Text>
            <Text style={{ color: theme.colors.textMuted }}>
              {entry.etaMinutes ? `${entry.etaMinutes} min` : 'TBD'}
            </Text>
          </View>
        ))}
        {waitlist.length === 0 ? (
          <Text style={{ color: theme.colors.textMuted }}>No one waiting.</Text>
        ) : null}
      </View>

      <View style={[styles.panel, { borderColor: theme.colors.border }]}
        accessibilityRole="summary"
      >
        <Text style={[styles.panelTitle, { color: theme.colors.text }]}>Latest notices</Text>
        {notices.map((notice) => (
          <View key={notice.id} style={styles.row}>
            <Text style={[styles.rowPrimary, { color: theme.colors.text }]}>{notice.title}</Text>
            <Text style={{ color: theme.colors.textMuted }}>{formatRelativeTime(notice.createdAt)}</Text>
          </View>
        ))}
        {notices.length === 0 ? (
          <Text style={{ color: theme.colors.textMuted }}>No notices yet.</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
  },
  shortcuts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  shortcut: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 16,
    flexGrow: 1,
    alignItems: 'center',
  },
  shortcutLabel: {
    color: '#FFFFFF',
    fontWeight: '700',
    textAlign: 'center',
  },
  panel: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowPrimary: {
    fontWeight: '600',
  },
});
