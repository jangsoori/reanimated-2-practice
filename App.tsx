import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PortalProvider } from '@gorhom/portal';
import { Routes } from './Routes';
import CardColorSwitcher from './src/CardColorSwitcher/CardColorSwitcher';
import Main from './src/Main';
import Reflectly from './src/Reflectly/Reflecty';
import Twitter from './src/Twitter/Twitter';
import ExpandableHeader from './src/ExpandableHeader/ExpandableHeader';
import YoutubePlayButton from './src/YoutubePlayButton/YoutubePlayButton';

const Stack = createNativeStackNavigator<Routes>();

const App = () => {
  return (
    <PortalProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              title: 'Reanimated 2',
            }}
          />
          <Stack.Screen
            name="Card Color Change"
            component={CardColorSwitcher}
          />
          <Stack.Screen
            name="Reflectly"
            component={Reflectly}
          />
          <Stack.Screen
            name="Twitter"
            component={Twitter}
          />
          <Stack.Screen
            name="ExpandableHeader"
            component={ExpandableHeader}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="YoutubePlayButton"
            component={YoutubePlayButton}

          />
        </Stack.Navigator>
      </NavigationContainer>
    </PortalProvider>
  );
};

export default App;
