import React, { useEffect, useState } from 'react';
import { ActivityIndicator,StatusBar, FlatList, Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView } from 'react-native';
//const { width, height } = Dimensions.get('screen');


const ScrollItems= () => {
  
const [user, setUser]= useState([]);
const [louding, setLoading] = useState(false);
 const [pakect, setPakect] = useState(10);
const url = `https://randomuser.me/api/?results=${pakect}`; 

const fechtUser = async()=> 
{setLoading(true);
  try {
    const response = await fetch(url)
const data = await response.json();
    setUser(prevUsers=>[...prevUsers, ...data.results] );
    setPakect(prevPakect => prevPakect + 10); 
  } catch (error) {
    console.error.log(error);
  }finally{setLoading(false);}

    
    
  }
useEffect(() => 
{
    fechtUser()
},[url]);

const renderFooter = () => {
  return (
    louding && <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
  );
}
    return (
        <SafeAreaView style={styles.containerSafeArea}>
    <FlatList
      data={user}
      keyExtractor={(item, index) => String(index)}
      renderItem={({ item }) => (
        
        <View style={styles.containerUsers}>
            <Image source={{ uri: item.picture.large }} style={styles.imageUsers} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.nameUser}>{item.name.first} {item.name.last}</Text>
              <Text style={styles.emailUser}>{item.email}</Text>
            </View>
          </View>
      )}
      onEndReached={fechtUser}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
    />
    </SafeAreaView>
  )
}
export default ScrollItems

const styles = StyleSheet.create(
    {
        containerSafeArea: 
        {
            flex: 1,
            backgroundColor: '#FFE5E5',
            padding:10,
            //alignItems: 'center',
            justifyContent: 'center',
        },
        containerUsers:{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            padding: 18,
            marginTop: 10,
            backgroundColor:'#f7f7f7',
            borderRadius:15,
            
        },
        imageUsers: 
        {
            width: 70,
            height: 70,
            borderRadius: 35,
        },
        nameUser:
        {
            fontWeight: '900',
            fontSize: 25,
            
            color: '#000000'
        },
        emailUser:
        {
            fontWeight: 'bold',
            fontSize: 15,
            color: '#3468C0'
        }
    })