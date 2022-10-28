import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { color } from 'react-native-reanimated';




export const ProductDetail = ({navigation, route}: any) => {
  const {id} = route.params;
  const [quantity, setAquantity] = useState(0);
  const [ProductData, setProductData]: any = useState([]);
  const { colors } = useTheme();


  const styles = StyleSheet.create({
    ParentContainer: {
      flex: 1,
    },
  });
  
  const UpperContainer = StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
      height: 120,
      paddingLeft: 15,
    },
    containerButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
    },
    Image: {
      width: 30,
      height: 30,
    },
    ButtonText: {
      fontSize: 18,
      color: colors.text,
    },
    text: {
      fontSize: 30,
      fontWeight: '500',
      marginTop: 20,
      color: colors.text,
    },
  });
  
  const ProducContainer = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      height: 550,
      margin: 20,
    },
    StarContainer: {},
    Titlecontainer: {
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    TitleText: {
      fontSize: 20,
      fontWeight: 'bold',
      height: 25,
      overflow: 'hidden',
      color:colors.text
    },
    ProductImageContainer: {
      height: 280,
      // backgroundColor:"red",
    },
    ProductImage: {
      height: 280,
      width: '100%',
     
    },
    ProductPriceContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 3,
    },
    StockContainer: {},
    ProductDesContainer: {
      marginTop: 5,
    },
    QuantityDetail: {
      flexDirection: 'row',
      marginTop: 15,
    },
    AddToCartContainer: {},
    AddToCartButton: {
      backgroundColor: colors.primary,
      borderWidth: 1,
      borderRadius: 20,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30,
    },
  });
  
  const box = StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: 90,
      backgroundColor: colors.text,
      marginLeft: 15,
    },
    ButtonBox: {
      borderWidth: 1,
      borderColor: colors.card,
      width: 30,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:colors.text
    },
    BoxImage: {
      width: 15,
      height: 15,
      backgroundColor:colors.text
    },
  });
  








  
  const dataurl = 'https://fakestoreapi.com/products/' + id;
  console.log(dataurl);
  const getData = async () => {
    await fetch(dataurl)
      .then(res => res.json())
      .then(json => setProductData(json));
  };

  useEffect(() => {
    getData();
  }, []);

  const Incrementquantity = () => {
    setAquantity(quantity + 1);
  };
  const Decrementquantity = () => {
    if (quantity > 0) {
      setAquantity(quantity - 1);
    }
  };

  ////////////////////Add To Cart Button
  const AddToCartButton = async () => {
    try {

        const dataValue = await AsyncStorage.getItem('Cart');
        console.log('cart items', dataValue);
        if (dataValue == undefined) {
          console.log('Null');
        //   let obj = {ID: id, Quantity: quantity};
          AsyncStorage.setItem('Cart', JSON.stringify([{ProductData,quantity}]));
        } else {
            console.log("else")
        //   let obj = {ID: id, Quantity: quantity};
          const ParseData = JSON.parse(dataValue);
          console.log(ParseData)
          ParseData.push({ProductData,quantity});
          AsyncStorage.setItem('Cart', JSON.stringify(ParseData));
        }
        navigation.navigate('AddToCart')
      } catch (e) {
        console.log('error', e);
      }
  };
// useEffect(() => {
//     AsyncStorage.clear();
// }, [])
const [disabledButton,setdisabledButton] =useState(true);
useEffect(()=>{
if(quantity == 0){
    setdisabledButton(true);
}else{
    setdisabledButton(false);
}
},[quantity])
  return (
    <View style={styles.ParentContainer}>
      <View style={UpperContainer.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={UpperContainer.containerButton}>
          <Image
            style={UpperContainer.Image}
            source={require('../assets/BackIcon.png')}
          />
          <Text style={UpperContainer.ButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={UpperContainer.text}>Product Detail</Text>
      </View>
      <View style={ProducContainer.container}>
        <View style={ProducContainer.Titlecontainer}>
          <Text style={ProducContainer.TitleText}>{ProductData.title}</Text>
        </View>
        <View style={ProducContainer.StarContainer}></View>
        <View style={ProducContainer.ProductImageContainer}>
          <Image 
            resizeMode="contain"
            style={ProducContainer.ProductImage}
            source={{uri: ProductData.image}}></Image>
        </View>
        <View style={ProducContainer.ProductPriceContainer}>
          <Text style={{fontWeight: 'bold', fontSize: 18,color:colors.text}}>
            ${ProductData.price}
          </Text>
        </View>
        <View style={ProducContainer.StockContainer}>
          <Text style={{fontWeight: 'bold',color:colors.text}}>In Stock</Text>
        </View>
        <View style={ProducContainer.ProductDesContainer}>
          <Text style={{height: 80, overflow: 'hidden', color: colors.text}}>
            {ProductData.description}
          </Text>
        </View>
        <View style={ProducContainer.QuantityDetail}>
          <Text style={{fontWeight: 'bold',color:colors.text}}>Quantity </Text>
          <View style={box.container}>
            <TouchableOpacity onPress={Decrementquantity} style={box.ButtonBox}>
              <Image
                style={box.BoxImage}
                source={require('../assets/minusIcon.png')}
              />
            </TouchableOpacity>
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.card,
                justifyContent: 'center',
                alignItems: 'center',
                width: 30,
              }}>
              <Text style={{color:colors.card}}>{quantity}</Text>
            </View>

            <TouchableOpacity onPress={Incrementquantity} style={box.ButtonBox}>
              <Image
                style={box.BoxImage}
                source={require('../assets/plusIcon.png')}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
            <TouchableOpacity>
              <Text
                style={{fontSize: 13, fontWeight: 'bold', color: colors.primary}}>
                Add to wishlist
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={ProducContainer.AddToCartContainer}>
          <TouchableOpacity
          disabled={disabledButton}
            style={ProducContainer.AddToCartButton}
            onPress={AddToCartButton}>
            <Text style={{color: colors.text, fontWeight: 'bold'}}>
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   ParentContainer: {
//     flex: 1,
//   },
// });

// const UpperContainer = StyleSheet.create({
//   container: {
//     backgroundColor: '#2BADF9',
//     height: 120,
//     paddingLeft: 15,
//   },
//   containerButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   Image: {
//     width: 30,
//     height: 30,
//   },
//   ButtonText: {
//     fontSize: 18,
//     color: Colors.text,
//   },
//   text: {
//     fontSize: 30,
//     fontWeight: '500',
//     marginTop: 20,
//     color: Colors.text,
//   },
// });

// const ProducContainer = StyleSheet.create({
//   container: {
//     backgroundColor: Colors.text,
//     height: 550,
//     margin: 20,
//   },
//   StarContainer: {},
//   Titlecontainer: {
//     width: '80%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   TitleText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     height: 25,
//     overflow: 'hidden',
//   },
//   ProductImageContainer: {
//     height: 300,
//     // backgroundColor:"red",
//   },
//   ProductImage: {
//     height: 300,
//     width: '100%',
//   },
//   ProductPriceContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 3,
//   },
//   StockContainer: {},
//   ProductDesContainer: {
//     marginTop: 5,
//   },
//   QuantityDetail: {
//     flexDirection: 'row',
//     marginTop: 15,
//   },
//   AddToCartContainer: {},
//   AddToCartButton: {
//     backgroundColor: '#2BADF9',
//     borderWidth: 1,
//     borderRadius: 20,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 30,
//   },
// });

// const box = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     width: 90,
//     backgroundColor: '#F4F3F8',
//     marginLeft: 15,
//   },
//   ButtonBox: {
//     borderWidth: 1,
//     borderColor: 'black',
//     width: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   BoxImage: {
//     width: 15,
//     height: 15,
//   },
// });
