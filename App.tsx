import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PortalProvider } from "@gorhom/portal";

import type { Routes } from "./Routes";
import { CardColorSwitcher } from "./src/CardColorSwitcher/CardColorSwitcher";
import { Main } from "./src/Main";
import { Reflectly } from "./src/Reflectly/Reflecty";
import { Twitter } from "./src/Twitter/Twitter";
import { ExpandableHeader } from "./src/ExpandableHeader/ExpandableHeader";
import { YoutubePlayButton } from "./src/YoutubePlayButton/YoutubePlayButton";
import { SliderIndicator } from "./src/SliderIndicator/SliderIndicator";
import { CardSwiper } from "./src/CardSwiper/CardSwiper";
import { CardList } from "./src/CardList/CardList";

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
              title: "Reanimated 2",
            }}
          />
          <Stack.Screen
            name="Card Color Change"
            component={CardColorSwitcher}
          />
          <Stack.Screen name="Reflectly" component={Reflectly} />
          <Stack.Screen name="Twitter" component={Twitter} />
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
            options={{
              title: "Youtube Play Button",
            }}
          />
          <Stack.Screen name="SliderIndicator" component={SliderIndicator} />
          <Stack.Screen name="CardSwiper" component={CardSwiper} />
          <Stack.Screen name="CardList" component={CardList} />
        </Stack.Navigator>
      </NavigationContainer>
    </PortalProvider>
  );
};

export default App;
