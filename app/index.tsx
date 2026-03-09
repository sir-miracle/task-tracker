import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { ScreenRootWrapper } from '@/components/organisms';
import { CustomButton, HeaderComponent } from '@/components/atoms';
import { FilterChips, TaskListItem, EmptyState } from '@/components/molecules';
import { useTasks } from '@/contexts/TasksContext';
import { colors } from '@/utils/colors';
import { strings } from '@/utils/strings';
import { height } from '@/utils/utilityFunctions';

export default function TasksScreen() {
  const { filteredTasks, filter, setFilter, toggleTask, deleteTask, isLoading } = useTasks();

  const Header = () => (
    <HeaderComponent
      title={strings.screens.tasks}
      onGoBack={() => { }}
      showBackButton={false}
    />
  );

  if (isLoading) {
    return (
      <ScreenRootWrapper Header={Header}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.mistyNavy} />
        </View>
      </ScreenRootWrapper>
    );
  }

  const emptyMessage =
    filter === 'all'
      ? strings.empty.noTasks
      : filter === 'active'
        ? strings.empty.noActive
        : strings.empty.noCompleted;

  return (
    <ScreenRootWrapper
      Header={Header}
      enableScroll={false}
      footerComponent={() => (
        <View style={styles.footer}>
          <CustomButton
            label={strings.actions.addTask}
            onPress={() => router.push('/add-task')}
          />
        </View>
      )}
    >
      <View style={styles.content}>
        <FilterChips activeFilter={filter} onFilterChange={setFilter} />
        {filteredTasks.length === 0 ? (
          <EmptyState
            message={emptyMessage}
            actionLabel={filter === 'all' ? strings.actions.addTask : undefined}
            onAction={filter === 'all' ? () => router.push('/add-task') : undefined}
          />
        ) : (
          <FlatList
            data={filteredTasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TaskListItem
                task={item}
                onToggle={toggleTask}
                onPress={(task) => router.push({ pathname: '/edit-task', params: { id: task.id } })}
                onDelete={deleteTask}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            style={{ height: height * 0.8, marginBottom: 50}}
          />
        )}
      </View>
    </ScreenRootWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
  },
  listContent: {
    paddingBottom: 50,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingVertical: 16,
  },
});
