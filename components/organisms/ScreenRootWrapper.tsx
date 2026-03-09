import { colors } from '@/utils/colors';
import { height, width } from '@/utils/utilityFunctions';
import React, { FC } from 'react';
import {
  NativeScrollEvent,
  RefreshControl,
  StatusBar,
  StatusBarStyle,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  style?: StyleProp<ViewStyle>;
  safeAreaStyle?: StyleProp<ViewStyle>;
  children: any;
  Header?: () => React.ReactNode;
  enableScroll?: boolean;
  useScrollFlex?: boolean;
  headerWrapperStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  refreshing?: boolean;
  onRefresh?: () => void;
  canRefresh?: boolean;
  statusBarbackgroundColor?: string;
  statusBarStyle?: StatusBarStyle;
  onScrollToEnd?: () => void;
  notifyOnScrollToEnd?: boolean;
  useStatusBar?: boolean;
  footerComponent?: () => React.ReactNode;
  onKeyboardDismiss?: () => void;
  onKeyboardShow?: () => void;
}
const ScreenRootWrapper: FC<Props> = ({
  onScrollToEnd,
  notifyOnScrollToEnd = false,
  children,
  style,
  safeAreaStyle,
  Header,
  enableScroll = false,
  useScrollFlex = false,
  headerWrapperStyle,
  contentContainerStyle,
  refreshing = false,
  onRefresh = () => { },
  canRefresh = false,
  statusBarbackgroundColor = null,
  statusBarStyle = 'dark-content',
  useStatusBar = true,
  footerComponent,
}) => {
  const insets = useSafeAreaInsets();

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return (
    <View
      style={[
        styles.container,
        { width: width, height: height },
        {
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          // paddingBottom: 10,
        },
        safeAreaStyle,
      ]}
    >
      {useStatusBar && (
        <StatusBar
          barStyle={statusBarStyle}
          backgroundColor={
            statusBarbackgroundColor ? statusBarbackgroundColor : colors.white
          }
          animated={true}
        />
      )}
      <View style={[styles.header, headerWrapperStyle]}>
        {Header && <Header />}
      </View>
      <View style={[styles.root, style]}>
        <TouchableWithoutFeedback accessible={false}>
          <KeyboardAwareScrollView
            nestedScrollEnabled
            onScroll={({ nativeEvent }) => {
              if (notifyOnScrollToEnd)
                if (isCloseToBottom(nativeEvent)) {
                  onScrollToEnd && onScrollToEnd();
                }
            }}
            scrollEventThrottle={400}
            enableOnAndroid
            extraScrollHeight={5}
            extraHeight={5}
            style={{ width: '100%' }}
            contentContainerStyle={
              useScrollFlex
                ? // @ts-ignore
                {
                  ...styles.scrollContent,
                  ...{ flex: 1, justifyContent: 'space-between', padding: 0 },
                  // @ts-ignore
                  ...contentContainerStyle,
                }
                : // @ts-ignore
                { ...styles.scrollContent, ...contentContainerStyle }
            }
            showsVerticalScrollIndicator={false}
            scrollEnabled={enableScroll}
            refreshControl={
              canRefresh ? (
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              ) : undefined
            }
          >
            {children}
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </View>
      {footerComponent && (
        <View style={styles.footer}>{footerComponent()}</View>
      )}
    </View>
  );
};

export default ScreenRootWrapper;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.white,
    width: '100%',
    paddingHorizontal: (16),
    marginRight: 'auto',
    marginLeft: 'auto',
    flex: 1,
  },
  container: {
    backgroundColor: colors.white,
    alignItems: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    flex: 1,
  },
  header: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: (16),
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingVertical: 10,
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    width: '100%',
    paddingHorizontal: (16),
  },
});
