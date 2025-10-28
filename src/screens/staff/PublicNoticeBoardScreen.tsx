import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useEspressoStore } from '../../store/useEspressoStore';
import { useTheme } from '../../theme';
import { NoticeList } from '../../components/NoticeList';

export const PublicNoticeBoardScreen = () => {
  const theme = useTheme();
  const fetchNotices = useEspressoStore((state) => state.fetchPublicNotices);
  const notices = useEspressoStore((state) => state.notices.publicNotices);
  const togglePin = useEspressoStore((state) => state.togglePin);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.heading, { color: theme.colors.text }]}>Public notices</Text>
      <NoticeList
        notices={notices}
        emptyState="Nothing posted yet"
        onPressNotice={(notice) => togglePin(notice.id)}
      />
      <Text style={[styles.helper, { color: theme.colors.textMuted }]}>Tap a notice to pin/unpin it.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    padding: 16,
  },
  helper: {
    textAlign: 'center',
    paddingBottom: 24,
  },
});
