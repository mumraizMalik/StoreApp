import React, { useEffect, useState, createContext } from 'react'
import 'react-native-gesture-handler';

import {Defaulttheme,DarkTheme} from './app/screens/theme'

import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from 'react-native-splash-screen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
const Tab = createBottomTabNavigator();



import { SafeAreaView, Text, View } from 'react-native';
import { ItemsPage } from './app/screens/ItemsPage';
import { ProductDetail } from './app/screens/ProductDetail';
import { AddToCart } from './app/screens/AddToCart';
import { CustomNavigation } from './app/customNavigation/CustomNavigation';
import { DrawerNavigation } from './app/screens/DrawerNavigation';



export const UserContext = createContext({})
  SplashScreen.hide();
  const Stack=createStackNavigator();
 const App = () => {

  const [ThemeVal, setThemeVal] = useState(false)

  useEffect(()=>{
    console.log(ThemeVal)
  }, [ThemeVal])
  
  
  return (
    <UserContext.Provider value={{ThemeVal,setThemeVal}}>
    <NavigationContainer theme = {ThemeVal ? DarkTheme : Defaulttheme}
    >
    <SafeAreaView style={{flex:1}}>
      <Tab.Navigator  initialRouteName='ItemsPage'
      screenOptions={{headerShown:false}}>
        
        <Tab.Screen  name='ItemsPage' component={CustomNavigation}/>
        <Tab.Screen  name='AddToCart' component={AddToCart}/>
      </Tab.Navigator>
      </SafeAreaView>
      </NavigationContainer>
      </UserContext.Provider>

   
  )
}
export default App;