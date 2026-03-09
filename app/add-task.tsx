import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { ScreenRootWrapper } from '@/components/organisms';
import { CustomButton, CustomInput, CustomText, HeaderComponent } from '@/components/atoms';
import { useTasks } from '@/contexts/TasksContext';
import { colors } from '@/utils/colors';
import { strings } from '@/utils/strings';

const MIN_TITLE_LENGTH = 1;

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(false);
  const { addTask } = useTasks();

  const handleSave = () => {
    const trimmed = title.trim();
    if (trimmed.length < MIN_TITLE_LENGTH) {
      setError(true);
      return;
    }
    setError(false);
    addTask(trimmed, body);
    setTitle('');
    setBody('');
    router.back();
  };

  const Header = () => (
    <HeaderComponent
      title={strings.screens.addTask}
      onGoBack={() => router.back()}
      useCloseIcon
    />
  );

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
          numberOfLines={2}
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
          numberOfLines={3}
          wrapperStyle={styles.bodyInput}
          rootStyle={{ height: 200, alignItems: 'flex-start', }}
          style={{ width: '100%' }}
        />
        <CustomButton
          label={strings.actions.addTask}
          onPress={handleSave}
          disabled={!title.trim()}
          style={styles.button}
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
  button: {
    marginTop: 24,
  },
  errorText: {
    color: colors.naturalRed,
    fontSize: 13,
    marginTop: 6,
  },
});
