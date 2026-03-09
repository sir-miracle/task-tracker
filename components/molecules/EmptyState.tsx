import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { CustomText, CustomButton } from '@/components/atoms';
import { colors } from '@/utils/colors';

interface EmptyStateProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: FC<EmptyStateProps> = ({ message, actionLabel, onAction }) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.message}>{message}</CustomText>
      {actionLabel && onAction && (
        <CustomButton label={actionLabel} onPress={onAction} style={styles.button} />
      )}
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  message: {
    fontSize: 16,
    color: colors.lightGray,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    maxWidth: 200,
  },
});
