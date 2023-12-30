import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './TabNavigation';

export default function RootNavigation() {
  return (
    <NavigationContainer>

      <TabNavigation />  
    </NavigationContainer>
  );
}