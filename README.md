# Task Tracker

A simple, clean mobile task tracker built with **React Native**, **Expo**, and **TypeScript**. Tasks are stored locally and persist across app restarts.

## Features

- **View tasks** – List all tasks with a clear, minimal UI
- **Create tasks** – Add new tasks via a modal; empty titles are rejected with validation feedback
- **Complete / incomplete** – Toggle completion with a switch on each task
- **Filter** – View **All**, **Active**, or **Completed** tasks
- **Persistence** – Tasks are saved to device storage (AsyncStorage) and restored on launch

## Requirements

- Node.js (LTS recommended)
- npm or yarn
- Expo Go on a device/simulator (or a development build)

## How to run the app code:

### 1. Install dependencies

```bash
npm install
```

### 2. Start the app

```bash
npx expo start
```

Then:

- Press **i** for iOS simulator  
- Press **a** for Android emulator  
- Or scan the QR code with **Expo Go** on a physical device  

The app runs with the standard Expo workflow; no eject or custom native build is required for basic use.

## Project structure

```
├── app/
│   ├── _layout.tsx          # Root layout, theme, TasksProvider, Stack + modal route
│   ├── index.tsx            # Main tasks list screen
│   └── add-task.tsx         # Modal screen to create a new task
├── components/
│   ├── atoms/               # CustomButton, CustomInput, CustomText, HeaderComponent
│   ├── molecules/           # FilterChips, TaskListItem, EmptyState, modals, etc.
│   └── organisms/           # ScreenRootWrapper (used on every screen)
├── contexts/
│   └── TasksContext.tsx     # Global task state, persistence sync, add/toggle/filter
├── services/
│   └── taskStorage.ts       # AsyncStorage read/write for tasks
├── types/
│   └── task.ts              # Task and TaskFilter types
├── constants/
│   ├── storage.ts           # Storage key for tasks
│   └── theme.ts             # App theme constants
├── utils/
│   ├── colors.ts
│   ├── strings.ts           # Copy and validation strings
│   └── utilityFunctions.ts
└── assets/
    └── fonts/
```

## Architecture

- **Routing**: Expo Router (file-based). Main screen is `index` (root); “Add task” is a **modal** route `add-task`. No bottom tab bar.
- **State**: React Context (`TasksContext`) holds the task list, active filter, and loading flag. It loads from storage on mount and writes back when tasks change.
- **Persistence**: `taskStorage` service uses `@react-native-async-storage/async-storage` with a single JSON array key. No backend required.
- **UI**: Reuses your design system: `ScreenRootWrapper` on all screens, atoms (buttons, inputs, text, header) and molecules (filter chips, task row, empty state). Validation and empty states are handled in the UI layer.

## UI and UX

- **Empty states**: Different messages for “no tasks”, “no active”, and “no completed”; “Add task” CTA when there are no tasks at all.
- **Validation**: Creating a task with an empty or whitespace-only title shows an error and does not add a task. The primary button is disabled until there is some input.
- **Clean layout**: Single main screen with filter chips, list of task rows with a completion switch, and a footer “Add task” button that opens the modal.

## Scripts

| Command        | Description                |
|----------------|----------------------------|
| `npm start`    | Start Expo dev server      |
| `npm run ios`  | Start and open iOS         |
| `npm run android` | Start and open Android |
| `npm run lint` | Run ESLint                 |

## Tech stack

- **React Native** + **Expo** (SDK 54)
- **TypeScript**
- **Expo Router** (no React Navigation direct usage for routing)
- **@react-native-async-storage/async-storage** for local persistence
- **Lucide React Native** for icons (e.g. list, chevron)
- Existing project components and utilities (ScreenRootWrapper, CustomButton, CustomInput, etc.)

## License

Private / use as needed for this project.
