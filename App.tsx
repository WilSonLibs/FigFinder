import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MainNavigation from './src/Navigation/MainNavigation';
import {ThemeProvider} from './src/Utils/Theme/ThemeContext';

const App: React.FC = () => {
  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
