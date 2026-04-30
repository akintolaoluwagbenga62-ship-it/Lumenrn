import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { useApp } from '@/context/AppContext';
import { LoginScreen, RegisterScreen } from '@/screens/AuthScreens';
import { HomeScreen } from '@/screens/HomeScreen';
import { PracticeScreen, QuizScreen, ResultsScreen } from '@/screens/PracticeScreen';
import { FlashcardsScreen } from '@/screens/FlashcardsScreen';
import { GroupsScreen } from '@/screens/GroupsScreen';
import { ChatScreen } from '@/screens/ChatScreen';
import { LeaderboardScreen } from '@/screens/LeaderboardScreen';
import { PaywallScreen } from '@/screens/PaywallScreen';
import { AdminScreen } from '@/screens/AdminScreen';
import { NotificationsScreen } from '@/screens/NotificationsScreen';
import { NewsScreen } from '@/screens/NewsScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { colors, fontSize } from '@/theme';
import { AuthStackParamList, RootStackParamList } from '@/navigation/types';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator();

const TabIcon: React.FC<{ icon: string; focused: boolean }> = ({ icon, focused }) => (
  <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.6 }}>{icon}</Text>
);

const MainTabs = () => {
  const { unreadNewsCount } = useApp();
  const newsBadge = unreadNewsCount();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { paddingTop: 6, height: 64, paddingBottom: 8 },
        tabBarLabelStyle: { fontSize: fontSize.xs, fontWeight: '700' },
      }}
    >
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon icon="🏠" focused={focused} /> }}
      />
      <Tabs.Screen
        name="PracticeTab"
        component={PracticeScreen}
        options={{ title: 'Practice', tabBarIcon: ({ focused }) => <TabIcon icon="📝" focused={focused} /> }}
      />
      <Tabs.Screen
        name="FlashcardsTab"
        component={FlashcardsScreen}
        options={{ title: 'Cards', tabBarIcon: ({ focused }) => <TabIcon icon="🃏" focused={focused} /> }}
      />
      <Tabs.Screen
        name="NewsTab"
        component={NewsScreen}
        options={{
          title: 'News',
          tabBarIcon: ({ focused }) => <TabIcon icon="📰" focused={focused} />,
          tabBarBadge: newsBadge > 0 ? newsBadge : undefined,
        }}
      />
      <Tabs.Screen
        name="GroupsTab"
        component={GroupsScreen}
        options={{ title: 'Groups', tabBarIcon: ({ focused }) => <TabIcon icon="👥" focused={focused} /> }}
      />
      <Tabs.Screen
        name="LeaderboardTab"
        component={LeaderboardScreen}
        options={{ title: 'Top', tabBarIcon: ({ focused }) => <TabIcon icon="🏆" focused={focused} /> }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon icon="👤" focused={focused} /> }}
      />
    </Tabs.Navigator>
  );
};

const AuthFlow = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
  </AuthStack.Navigator>
);

const RootNavigator = () => (
  <RootStack.Navigator>
    <RootStack.Screen name="Tabs" component={MainTabs} options={{ headerShown: false }} />
    <RootStack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Quiz' }} />
    <RootStack.Screen name="Results" component={ResultsScreen} options={{ title: 'Results' }} />
    <RootStack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat' }} />
    <RootStack.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Notifications' }} />
    <RootStack.Screen name="Paywall" component={PaywallScreen} options={{ title: 'Premium', presentation: 'modal' }} />
    <RootStack.Screen name="Admin" component={AdminScreen} options={{ title: 'Admin Panel' }} />
  </RootStack.Navigator>
);

const Loading = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg }}>
    <Text style={{ fontSize: 36, color: colors.primary, fontWeight: '900' }}>Lumen</Text>
  </View>
);

export const Navigation: React.FC = () => {
  const { user, loading } = useApp();
  if (loading) return <Loading />;
  return (
    <NavigationContainer>
      {user ? <RootNavigator /> : <AuthFlow />}
    </NavigationContainer>
  );
};
