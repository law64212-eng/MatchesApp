import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MatchesScreen from '../screens/MatchesScreen';
import MatchDetailScreen from '../screens/MatchDetailScreen';
import COLORS from '../constants/colors';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.surface },
          headerTintColor: COLORS.textPrimary,
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="Matches"
          component={MatchesScreen}
          options={{ title: 'نتائج المباريات' }}
        />
        <Stack.Screen
          name="MatchDetail"
          component={MatchDetailScreen}
          options={{ title: 'تفاصيل المباراة' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
