import React, {useEffect, useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import { useTheme } from '@react-navigation/native';





export const AddToCart = ({navigation}:any) => {
  const { colors } = useTheme();
  const UpperContainer = StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
      height: 120,
      paddingLeft: 15,
    },
    Image: {
      width: 30,
      height: 30,
      marginTop: 20,
    },
    text: {
      fontSize: 30,
      fontWeight: '500',
      marginTop: 20,
      color: 'white',
    },
  });
  const ItemContainer = StyleSheet.create({
    Container: {
      width: '100%',
      height: 110,
      borderWidth: 1,
      borderColor: colors.text,
      flexDirection:'row',
      overflow:"hidden"
    },
  });
  const box = StyleSheet.create({
      container: {
        flexDirection: 'row',
        width: 90,
        backgroundColor: colors.card,
        marginLeft: 15,
      },
      ButtonBox: {
        borderWidth: 1,
        borderColor: colors.text,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:colors.card
      },
      BoxImage: {
        width: 15,
        height: 15,
      },
    });
 

  const [CartData, setCartData]: any = useState([]);
  const [dataLoaded, setdataLoaded]:any = useState(false);
//   useEffect(() => {
//     AsyncStorage.clear();
// }, [])
  const totalProductValue=()=>{
    var totalPrice=0;
    CartData.map((element:any)=>{
        totalPrice+=element.quantity*element.ProductData.price;
    })
   
     return totalPrice;
  }
 const [calData,setCalData]:any =useState([])
  const totalProduct=()=>{
    let array:any=[];
    let total=0;
    CartData.map((element:any)=>{
        total+=element.quantity/element.quantity;
        let obj={
          quantity:element.quantity,
          price:element.ProductData.price
        }
        array.push(obj)
        console.log("visted")
    })
    setCalData([...array])
    // return array
     
     
  }
  // useEffect(()=>{
  //         totalProduct()

  // },[dataLoaded,CartData])
  

 

   
  const loadCartData = async () => {
    try {
        const data = await AsyncStorage.getItem('Cart');
        console.log("data",data)
      if (data) {
        setCartData(JSON.parse(data));
        setdataLoaded(true)
      }
    } catch {}
  };

  useEffect(() => {
     loadCartData();
     
    // totalProductValue();
  }, []);


  function Decrementquantity(Index:any){
      
        CartData[Index].quantity=CartData[Index].quantity-1;
        
        if(CartData[Index].quantity<1){
          CartData.splice(Index,1);
          
          console.log("spile")
        }
        AsyncStorage.setItem('Cart', JSON.stringify(CartData));   
        setCartData([...CartData]);
        
        
        
    }

const Incrementquantity=(Index:any)=>{
  
        CartData[Index].quantity=CartData[Index].quantity+1;
        AsyncStorage.setItem('Cart', JSON.stringify(CartData));   
        setCartData([...CartData]);
}
const Delete=(Index:any)=>{

    CartData.splice(Index,1);
    console.log("spile")
    AsyncStorage.setItem('Cart', JSON.stringify(CartData));   
    setCartData([...CartData]);
}


  const render = ({item, index}: any) => {
    return (
      <View style={ItemContainer.Container}>
        <View style={{flex:0.5,justifyContent:"center",alignItems:"center"}}>
        <TouchableOpacity onPress={()=>{Decrementquantity(index)}} style={box.ButtonBox}>
              <Image
                style={{width: 15, height: 15,backgroundColor:colors.card}}
                source={require('../assets/minusIcon.png')}
              />
            </TouchableOpacity>
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.text,
                justifyContent: 'center',
                alignItems: 'center',
                width: 30,
              }}>
              <Text style={{color:colors.text,}}>{item.quantity}</Text>
            </View>

            <TouchableOpacity onPress={()=>{Incrementquantity(index)}} style={box.ButtonBox}>
              <Image
                style={box.BoxImage}
                source={require('../assets/plusIcon.png')}
              />
            </TouchableOpacity>
        
        </View>
        <View style={{flex:1}}>
            <Image resizeMode='contain' style={{width:"100%",height:"100%",backgroundColor:colors.primary}} source={{uri:item.ProductData.image}}/>
        </View>
        <View style={{flex:2}}>
            <Text style={{fontSize:15,fontWeight:"bold",color:colors.text}}>{item.ProductData.title}</Text>
            <Text style={{fontSize:15,fontWeight:"bold",color:colors.text}}>price:{item.ProductData.price}</Text>
          <Text style={{fontSize:15,fontWeight:"bold",color:colors.text}}>Quantity:{item.quantity}</Text>
        </View >
        <View style={{flex:0.5,justifyContent:"center",alignItems:"center"}}>
        <Text style={{color:colors.text,}}>{item.ProductData.price*item.quantity}</Text>
        <TouchableOpacity style={{marginRight:10,justifyContent:"center",alignItems:"center"}} onPress={()=>{Delete(index)}}>
        <Icon style={{color:colors.text,}} name='delete' size={30}>
    
  </Icon>
        </TouchableOpacity>
       
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={UpperContainer.container}>
        <TouchableOpacity onPress={()=>{navigation.navigate("ItemsPage")}}>
          <Image
            style={UpperContainer.Image}
            source={require('../assets/menuIcon.png')}
          />
        </TouchableOpacity>
        <Text style={UpperContainer.text}>Cart</Text>
      </View>

      <View>
        <FlatList data={CartData} renderItem={render} />
      </View>
      {/* <View style={{marginTop:20}}>
      {
      console.log(calData)}
      {(dataLoaded) && calData.map((element:any)=>{
      return(
      <View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
      

          <Text style={{fontSize:15,fontWeight:"bold",color:"black"}}>price:{element.price}</Text>
          <Text style={{fontSize:15,fontWeight:"bold",color:"black"}}>Quantity:{element.quantity}</Text>
          <Text style={{fontSize:15,fontWeight:"bold",color:"black"}}>price*Quantity={element.price*element.quantity}</Text>
          
          </View>
          )})}
          
      </View> */}
      <View style={{height:80,justifyContent:"center",alignItems:"flex-end"}}>
        <Text style={{fontWeight:"bold", fontSize:18,color:"black"}}>Total Price:${totalProductValue()}</Text>
        
      </View>
    </View>
  );
};
  // const UpperContainer = StyleSheet.create({
  //   container: {
  //     backgroundColor: '#2BADF9',
  //     height: 120,
  //     paddingLeft: 15,
  //   },
  //   Image: {
  //     width: 30,
  //     height: 30,
  //     marginTop: 20,
  //   },
  //   text: {
  //     fontSize: 30,
  //     fontWeight: '500',
  //     marginTop: 20,
  //     color: 'white',
  //   },
  // });
  // const ItemContainer = StyleSheet.create({
  //   Container: {
  //     width: '100%',
  //     height: 110,
  //     borderWidth: 1,
  //     borderColor: 'black',
  //     flexDirection:'row',
  //     overflow:"hidden"
  //   },
  // });
  // const box = StyleSheet.create({
  //     container: {
  //       flexDirection: 'row',
  //       width: 90,
  //       backgroundColor: '#F4F3F8',
  //       marginLeft: 15,
  //     },
  //     ButtonBox: {
  //       borderWidth: 1,
  //       borderColor: 'black',
  //       width: 30,
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //     },
  //     BoxImage: {
  //       width: 15,
  //       height: 15,
  //     },
  //   });