import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { TasksProvider } from '@/contexts/TasksContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <TasksProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="add-task"
            options={{
              presentation: 'modal',
              title: 'New task',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="edit-task"
            options={{
              presentation: 'modal',
              title: 'Edit task',
              headerShown: false,
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </TasksProvider>
    </ThemeProvider>
  );
}
