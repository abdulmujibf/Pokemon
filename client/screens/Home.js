import {Text, StyleSheet, View, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react';
import {Button} from 'react-native-paper'
import Item from '../components/Item'

function Home ({navigation}) {
  const [pokedex, setPokedex] = useState([])
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => setPokedex(data.results))
  }, [])

  const renderItem = ({item}) => {
    return (
      <Item data={item} style={styles.itemStyles} navigation={navigation} />
    )
  }

  const toFavorite = () => {
    navigation.navigate('Favorites')
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10}}>
        <Text style={styles.head}>Pokedex</Text>
        <Button mode="outlined" onPress={toFavorite}>Favorites</Button>
      </View>
      <View style={styles.itemContainer}>
        <FlatList
          data={pokedex}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(_, index) => index}
        />
        {
          // pokedex.map((pokemon, idx) => {
          //   return <Item data={pokemon} key={idx} style={{margin: '100px'}} />
          // })
        }
        <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
          <Button mode="contained" icon="dialpad" color="blue" style={{borderRadius: 100, padding: 10, position:'absolute', left: 90, bottom: 10}}></Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 10,
    flex: 1
  },
  head: {
    fontSize: 20,
  }
});

export default Home