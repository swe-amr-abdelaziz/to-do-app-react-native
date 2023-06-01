// import { Provider } from 'react-redux';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import store from './src/Redux/store';
// import Home from './src/pages/Home';
// import Details from './src/pages/Details';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
//           <Stack.Screen name="Details" component={Details} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </Provider>
//   );
// }

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import store from './src/Redux/store';
import Home from './src/pages/Home';
import Details from './src/pages/Details';
import { persistStore } from 'redux-persist';

const Stack = createNativeStackNavigator();

const persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Details" component={Details} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
