import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useEspressoStore } from '../../store/useEspressoStore';
import { useTheme } from '../../theme';
import { NoticeList } from '../../components/NoticeList';

export const StaffInboxScreen = () => {
  const theme = useTheme();
  const fetchNotices = useEspressoStore((state) => state.fetchPublicNotices);
  const personalNotices = useEspressoStore((state) => state.notices.personalNotices);

  useEffect(() => {
    const guestId = useEspressoStore.getState().guests.selectedGuest?.id;
    if (guestId) {
      useEspressoStore.getState().fetchPersonalNotices(guestId);
    }
    fetchNotices();
  }, [fetchNotices]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.heading, { color: theme.colors.text }]}>Guest acknowledgements</Text>
      <NoticeList
        notices={personalNotices}
        emptyState="No replies yet"
      />
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
});
