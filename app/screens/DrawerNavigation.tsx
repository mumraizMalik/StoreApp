
import React from 'react'
import 'react-native-gesture-handler';
import { SideBar } from "../screens/SideBar";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ItemsPage } from './ItemsPage';
import { AddToCart } from './AddToCart';
const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  return (
   <>
        <Drawer.Navigator screenOptions={{headerShown:false}}
         drawerContent={props=><SideBar {...props}/>}>
       
        <Drawer.Screen name="ItemsPage" component={ItemsPage} />
        <Drawer.Screen name="AddToCart" component={AddToCart} />
      </Drawer.Navigator>
      </>
  )
}
