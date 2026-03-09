import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ScreenRootWrapper } from '@/components/organisms';
import { CustomButton, CustomInput, CustomText, HeaderComponent } from '@/components/atoms';
import { CustomSwitchComponent } from '@/components/molecules';
import { useTasks } from '@/contexts/TasksContext';
import { colors } from '@/utils/colors';
import { strings } from '@/utils/strings';

const MIN_TITLE_LENGTH = 1;

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getTaskById, updateTask, deleteTask } = useTasks();
  const task = id ? getTaskById(id) : undefined;

  const [title, setTitle] = useState(task?.title ?? '');
  const [body, setBody] = useState(task?.body ?? '');
  const [completed, setCompleted] = useState(task?.completed ?? false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setBody(task.body ?? '');
      setCompleted(task.completed);
    }
  }, [task?.id]);

  const handleSave = () => {
    const trimmed = title.trim();
    if (trimmed.length < MIN_TITLE_LENGTH) {
      setError(true);
      return;
    }
    if (!id) {
      router.back();
      return;
    }
    setError(false);
    updateTask(id, { title: trimmed, body: body.trim(), completed });
    router.back();
  };

  const handleDelete = () => {
    if (id) {
      deleteTask(id);
      router.back();
    }
  };

  const Header = () => (
    <HeaderComponent
      title={strings.screens.editTask}
      onGoBack={() => router.back()}
      useCloseIcon
    />
  );

  if (!task && id) {
    return (
      <ScreenRootWrapper Header={Header}>
        <View style={styles.centered}>
          <CustomText style={styles.notFound}>{strings.notFound.task}</CustomText>
          <CustomButton label={strings.actions.goBack} onPress={() => router.back()} style={styles.button} />
        </View>
      </ScreenRootWrapper>
    );
  }

  return (
    <ScreenRootWrapper Header={Header}>
      <View style={styles.content}>
        <CustomInput
          placeholder={strings.placeholder.taskTitle}
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            if (error && text.trim().length >= MIN_TITLE_LENGTH) setError(false);
          }}
          error={error}
          multiline
          numberOfLines={3}
        />
        {error && (
          <CustomText style={styles.errorText}>
            {strings.validation.taskTitleRequired}
          </CustomText>
        )}
        <CustomInput
          placeholder={strings.placeholder.taskBody}
          value={body}
          onChangeText={setBody}
          multiline
          numberOfLines={4}
          wrapperStyle={styles.bodyInput}
          rootStyle={{ height: 200, alignItems: 'flex-start', }}
          style={{ width: '100%' }}
        />
        <View style={styles.row}>
          <CustomText style={styles.label}>Completed</CustomText>
          <CustomSwitchComponent
            value={completed}
            onValueChange={setCompleted}
          />
        </View>
        <CustomButton
          label={strings.actions.save}
          onPress={handleSave}
          disabled={!title.trim()}
          style={styles.button}
        />
        <CustomButton
          label={strings.actions.deleteTask}
          onPress={handleDelete}
          style={styles.deleteButton}
          labelStyle={styles.deleteButtonLabel}
        />
      </View>
    </ScreenRootWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
  },
  bodyInput: {
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingVertical: 12,
  },
  label: {
    fontSize: 16,
  },
  button: {
    marginTop: 24,
  },
  deleteButton: {
    marginTop: 16,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.solidRed,
  },
  deleteButtonLabel: {
    color: colors.solidRed,
  },
  errorText: {
    color: colors.naturalRed,
    fontSize: 13,
    marginTop: 6,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFound: {
    marginBottom: 16,
  },
});
