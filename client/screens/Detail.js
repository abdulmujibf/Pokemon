import React, { useEffect, useState } from 'react'
import {Text, StyleSheet, View, Image } from 'react-native'
import {Chip, Button} from 'react-native-paper'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import About from './Tabs/About';
import BaseStats from './Tabs/BaseStats';
import Evolution from './Tabs/Evolution';
import Moves from './Tabs/Moves';
import {useDispatch, useSelector} from 'react-redux'

const Tab = createMaterialTopTabNavigator();

function Detail ({route, navigation}) {

  const id = route.params.id
  const dispatch = useDispatch()
  const [pokemon, setPokemon] = useState({})
  const favorites = useSelector(state => state.favorites)
  const [isFavorite, setIsfavorites] = useState(false)

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => res.json())
      .then(data => setPokemon(data))
      .catch(err => console.log(err))
  }, [])

  const back = () => {
    navigation.navigate('Home')
  }

  useEffect(() => {
    favorites.forEach(el => {
      if(el.id === id){
        setIsfavorites(true)
      }
    })
  }, [])

  const addFavorite = () => {
    let exist = favorites.filter(el => {
      return el.id === pokemon.id
    })
    if(!exist.length){
      dispatch({type: 'ADDFAVORITES', payload: pokemon})
      setIsfavorites(true)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerButton}>
        <Button icon="arrow-left" mode="outlined" onPress={back}>Back</Button>
        <Button icon="heart" mode="outlined" onPress={addFavorite} disabled={isFavorite}>Add Favorites</Button>
      </View>
      <View style={styles.header}>
        <View>
          <Text style={styles.textHead}>{pokemon.name?.toUpperCase()}</Text>
          <View style={styles.chipContainer}>
            {
              pokemon?.types?.map(item => {
                return <Chip style={styles.chip} key={item.slot}>{item.type.name?.toUpperCase()}</Chip>
              })
            }
          </View>
        </View>
        <Text style={styles.textHeader}>#{pokemon.id}</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Image source={{uri: pokemon?.sprites?.front_default}} style={styles.image} />
      </View>
      <Tab.Navigator tabBarOptions={{style: {borderTopEndRadius: 20, borderTopStartRadius: 20}, labelStyle: {fontSize: 11}}}>
        <Tab.Screen name="About" component={About} />
        <Tab.Screen name="Base Stats" component={BaseStats} />
        <Tab.Screen name="Evolution" component={Evolution} />
        <Tab.Screen name="Moves" component={Moves} />
      </Tab.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50
  },
  containerButton: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
  chipContainer: {
    marginVertical: 10,
    flexDirection: 'row'
  },
  header: {
    marginTop: 40,
    marginLeft: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textHeader: {
    margin: 10,
    fontSize: 20
  },
  chip: {
    marginRight: 10,
    backgroundColor: 'green',
    paddingHorizontal: 10,
  },
  textHead: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  image: {
    width: 150,
    height: 150
  }
});

export default Detail