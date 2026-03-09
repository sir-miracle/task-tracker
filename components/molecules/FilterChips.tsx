import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CustomText } from '@/components/atoms';
import { colors } from '@/utils/colors';
import { strings } from '@/utils/strings';
import type { TaskFilter } from '@/types/task';

const FILTERS: { key: TaskFilter; label: string }[] = [
  { key: 'all', label: strings.filters.all },
  { key: 'active', label: strings.filters.active },
  { key: 'completed', label: strings.filters.completed },
];

interface FilterChipsProps {
  activeFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}

const FilterChips: FC<FilterChipsProps> = ({ activeFilter, onFilterChange }) => {
  return (
    <View style={styles.container}>
      {FILTERS.map(({ key, label }) => {
        const isActive = activeFilter === key;
        return (
          <TouchableOpacity
            key={key}
            style={[styles.chip, isActive && styles.chipActive]}
            onPress={() => onFilterChange(key)}
            activeOpacity={0.7}
          >
            <CustomText style={[styles.label, isActive && styles.labelActive]}>
              {label}
            </CustomText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default FilterChips;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 24,
    backgroundColor: colors.grayHint,
  },
  chipActive: {
    backgroundColor: colors.mistyNavy,
  },
  label: {
    fontSize: 14,
    color: colors.matteGraphite,
  },
  labelActive: {
    color: colors.white,
    fontWeight: '600',
  },
});
