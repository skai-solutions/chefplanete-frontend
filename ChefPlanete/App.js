import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Start from './Screens/Start';
import Login from './Screens/Login';
import Profile from './Screens/Profile';
import Dashboard from './Screens/Dashboard';

const MainNavigator = createStackNavigator({
  Start: { screen: Start }, 
  Login: { screen: Login },
  // Profile: { screen: Profile },
  Dashboard: { screen: Dashboard }
},
{
  initialRouteName: 'Start',
}

);

const AppContainer = createAppContainer(MainNavigator);

const App = () => {
  return <AppContainer/>
}

export default App;

//OLD CODE - KEEP FOR NOW, DELETE LATER WHEN WE'RE MORE SURE ABOUT THE ROUTING
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
