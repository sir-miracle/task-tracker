import React, { FC } from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import { CustomText } from '@/components/atoms';
import CustomSwitchComponent from './CustomSwitchComponent';
import { colors } from '@/utils/colors';
import { strings } from '@/utils/strings';
import type { Task } from '@/types/task';


interface TaskListItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onPress?: (task: Task) => void;
  onDelete?: (id: string) => void;
  style?: ViewStyle;
}


const TaskListItem: FC<TaskListItemProps> = ({ task, onToggle, onPress, onDelete, style }) => {
  const hasBody = (task.body?.trim?.() ?? '') !== '';

  return (
    <View style={[styles.root, style]}>
      {onDelete && (
        <Pressable
          style={styles.deleteButton}
          onPress={() => onDelete(task.id)}
          hitSlop={8}
        >
          <Trash2 size={20} color={colors.solidRed} strokeWidth={2} />
        </Pressable>
      )}
      <Pressable
        style={styles.titleWrap}
        onPress={() => onPress?.(task)}
        android_ripple={null}
      >
        <CustomText
          style={[styles.title, task.completed && styles.titleCompleted]}
          numberOfLines={2}
        >
          {task.title}
        </CustomText>
        {hasBody && (
          <CustomText
            style={[styles.body, task.completed && styles.titleCompleted]}
            numberOfLines={2}
          >
            {task.body}
          </CustomText>
        )}
        {(
          <CustomText style={styles.expandHint}>
            {strings.taskItem.tapToExpand}
          </CustomText>
        )}
      </Pressable>
      <CustomSwitchComponent
        value={task.completed}
        onValueChange={() => onToggle(task.id)}
      />
    </View>
  );
};

export default TaskListItem;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: colors.whiteMarble,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.mistyBlue + '80',
  },
  titleWrap: {
    flex: 1,
    marginLeft: 8,
    marginRight: 12,
    justifyContent: 'center',
  },
  deleteButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    color: colors.matteGraphite,
  },
  body: {
    fontSize: 13,
    color: colors.lightGray,
    marginTop: 4,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.lightGray,
  },
  expandHint: {
    fontSize: 12,
    color: colors.lightGray,
    marginTop: 4,
  },
});
