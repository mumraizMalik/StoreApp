import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { ItemsPage } from '../screens/ItemsPage';
import { ProductDetail } from '../screens/ProductDetail';
import { AddToCart } from '../screens/AddToCart';
import { NavigationContainer } from '@react-navigation/native'
import { DrawerNavigation } from '../screens/DrawerNavigation';

export const CustomNavigation = ({}) => {
    const Stack=createStackNavigator();
    
  return (
    <> 
    
    {/* <NavigationContainer independent={true}> */}
        <Stack.Navigator 
        screenOptions={{headerShown:false}} initialRouteName={"ItemsPage"}
        >
        <Stack.Screen   name='ItemsPage' component={ItemsPage} />
        <Stack.Screen   name='ProductDetail' component={ProductDetail}/>
        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
        </Stack.Navigator>
        {/* </NavigationContainer> */}
        </>
  )
}
