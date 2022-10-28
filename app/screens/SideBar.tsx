import React, { useState,useContext, useEffect} from 'react';
import {View, Text, StyleSheet, Image } from 'react-native';

import {UserContext} from '../../App'

import {Switch, TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';
var global;
export const SideBar = ({navigation}: any) => {
  const { colors } = useTheme();
  
  useEffect(() => {
    global=colors;
  }, [colors])
   
  
  const {ThemeVal, setThemeVal}:any = useContext(UserContext);
  const [UserName, setUserName] = useState('');

  let GetValueFromStorage = async () => {
    try {
      const data:any = await AsyncStorage.getItem('userName');
      setUserName(data);
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  GetValueFromStorage();
 
  const [isEnabled,setisEnabled]= useState(false);
  const toggleSwitch=()=>{
    setThemeVal(!ThemeVal);
    setisEnabled(!isEnabled)
    
  }
  const styles = StyleSheet.create({
    //UpperContainer
    UpperContainer: {
      height: 200,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    ProfileIconImage: {
      width: 80,
      height: 80,
    },
    UpperContainerText: {
      fontSize: 20,
      fontWeight: '500',
      color: colors.text,
    },
  
    ////contaier
  
    TouchAble: {
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: 'lightblue',
      marginBottom: 2,
      paddingLeft: 15,
      paddingTop: 5,
      paddingBottom: 5,
    },
  
    Container: {
      marginTop: 20,
      marginBottom: 20,
      flex: 1.5,
    },
    Text: {
      fontSize: 20,
      paddingLeft: 15,
    },
    ButtonIconImaage: {
      width: 23,
      height: 23,
    },
    /////////BottomContainer////
  
    BottomContainer: {
      flex: 0.5,
      // backgroundColor:"blue",
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    BottomContainerButton: {
      marginBottom: 30,
      width: 100,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      borderRadius: 20,
    },
    BottomContainerButtonText: {
      fontSize: 20,
      fontWeight: '500',
      color:colors.text,
    },
  });
  

  return (
    <>
      <View style={styles.UpperContainer}>
        
          <Image
            style={styles.ProfileIconImage}
            source={require('../assets/image5.png')}
          />
          <View style={{width:"100%"}}>
              <TouchableOpacity style={{backgroundColor:"blue",width:50,marginRight:30, alignSelf:"flex-end",borderRadius:15 }}>
                <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
        value={isEnabled}>
                </Switch>
              </TouchableOpacity>
          </View>
          <Text style={styles.UpperContainerText}>{UserName}</Text>
        
      </View>
      <View style={styles.Container}>
        <TouchableOpacity
          style={styles.TouchAble}
          onPress={() => {
            navigation.navigate('DreamJob');
          }}>
          <Image
            style={styles.ButtonIconImaage}
            source={require('../assets/image2.png')}
          />
          <Text style={styles.Text}>DreamJob</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.TouchAble}
          onPress={() => {
            navigation.navigate('PersonList');
          }}>
          <Image
            style={styles.ButtonIconImaage}
            source={require('../assets/image3.png')}
          />
          <Text style={styles.Text}>PersonList</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.BottomContainer}>
        <TouchableOpacity
          style={styles.BottomContainerButton}
          onPress={() => {
            navigation.reset({index: 0, routes: [{name: 'Login'}]})
            // navigation.navigate("Login")
            AsyncStorage.removeItem("userName")
          }}>
          <Text style={styles.BottomContainerButtonText}>LogOut</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

console.log("global", global);


