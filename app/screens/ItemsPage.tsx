import React, { useEffect, useState,createContext  } from 'react'
import { StyleSheet,ActivityIndicator, Text, View,Image, TouchableOpacity, Platform, FlatList } from 'react-native'
import { useTheme } from '@react-navigation/native';


export const ItemsPage = ({navigation}:any) => {
    
    const { colors } = useTheme();
   
    
    const [Data, setData]:any = useState("")
    const [loader,setloader]:any = useState(true)
    const data=async()=>{
        setloader(true)
      await  fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{setData(json);setloader(false)})
    }
    useEffect(() => {
        data();
        navigation.navigate("DrawerNavigation")
       
    }, [])
    const MovedToItemDetail=(data:any)=>{
        
        navigation.navigate("ProductDetail",{
           id:data,
        });
    
        
    }
    // console.log(Data[0].id)
    const render=(element:any)=>{
        
        return(
            
        <View style={Items.ParentContainer}>
            <View style={Items.Container}>
                <TouchableOpacity style={Items.Item} onPress={()=>MovedToItemDetail(element.item.id)}>
                        <Image style={Items.ItemImage} source={{uri:element.item.image}}/>
                    <View style={Items.ProductNameContainer}>
                    <Text style={Items.ProductNameText}>{element.item.title}</Text>
                    </View>
                    <View style={Items.LowerContent}>
                        <View style={Items.LowerContenttextcontainer}>
                            <Text style={Items.LowerContenttext}>{element.item.price}</Text></View>
                        <TouchableOpacity style={Items.LowerContentButton}>
                            <Text style={Items.LowerContentButtonText}>Add to Cart</Text>
                        </TouchableOpacity>
                    </View>
                    <View>

                    </View>
                </TouchableOpacity>
            </View>
        </View>
        )
    }
    const Styles = StyleSheet.create({
        ParentContainer:{
            backgroundColor:colors.background,
            flex: 1
        }
    })
    const UpperContainer = StyleSheet.create({
        container:{
            backgroundColor:colors.primary,
            height:120,
            paddingLeft:15,
        },
        Image:{
            width:30,
            height:30,
            marginTop:20,
           
        },
        text:{
            fontSize:30,
            fontWeight:'500',
            marginTop:20,
            color:colors.text
        }
    })
    const Items = StyleSheet.create({
        ParentContainer:{
            flex :1,
            marginTop:8,
            
        },
        Container:{
            width:"100%",
            justifyContent:"center",
            alignItems:"center"
        },
        Item:{
            width: '95%', 
            backgroundColor:colors.card,
            paddingBottom:20,
            
    
        },
        ItemImage:{
            width:"100%",
            height:200,
        },
        LowerContent:{
            flexDirection:'row',
            marginLeft:4,
            height:30
        },
        LowerContentButton:{
            backgroundColor:colors.primary,
            flex:1.5,
            justifyContent:'center',
            alignItems:'center',
            borderTopLeftRadius:13,
            borderBottomLeftRadius:13,
        },
        LowerContentButtonText:{
            fontSize:15,
            fontWeight:'500',
            color:colors.text
        },
        LowerContenttextcontainer:{
            flex:0.5,
            justifyContent:'center',
           marginLeft:5
        },
        LowerContenttext:{
            fontSize:15,
            fontWeight:'500',
            color:colors.text
        },
        ProductNameContainer:{
            justifyContent:"center",
            alignItems:'center',
            marginBottom:5
        },
        ProductNameText:{
            fontSize:18,
            fontWeight:'bold',
            height:20,
            overflow:"hidden",
            color:colors.text
        }
    })
    const flatList=StyleSheet.create({
        container:{
            flex: 1,
        }
    })
  return (

    <View style={Styles.ParentContainer}>
        <View style={UpperContainer.container}>
           <TouchableOpacity onPress={()=>{navigation.toggleDrawer();}}>
             <Image style={UpperContainer.Image} source={require('../assets/menuIcon.png')}/>
             </TouchableOpacity>
            <Text style={UpperContainer.text}>All Items</Text>
            
        </View>
        
        {loader && <ActivityIndicator style={{flex:1,justifyContent:"center",alignItems:"center"}} animating={loader} />}
      
      
        {!loader &&  <FlatList
        style={flatList.container}
        
        data={Data}
        renderItem={render}
        numColumns={2}
        keyExtractor={(item, index) => String(index)}
        />}

    </View>
   
    )
}
