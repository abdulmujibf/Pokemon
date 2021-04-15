import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from 'react'
import {Card, Title, Avatar, Chip} from 'react-native-paper'

function Item ({data, navigation}) {
  const [pokemon, setPokemon] = useState({})

  useEffect(() => {
    if(data.url){
      fetch(data.url, {
        method: 'GET'
      })
        .then(res => res.json())
        .then(data => setPokemon(data))
        .catch(err => console.log(err))
    } else {
      setPokemon(data)
    }
  }, [])

  const detail = (id) => {
    navigation.navigate('Detail', {id})
  }

  return (
    <TouchableOpacity onPress={() => detail(pokemon.id)}>
      <Card style={styles.cardContaier}>
        <Card.Content>
          <Title style={{color: '#fff'}}>{pokemon.name}</Title>
          <View style={{flexDirection: "row"}}>
            <View>
              {
                pokemon?.types?.map(item => {
                  return <Chip style={styles.chip} key={item.slot}>{item.type.name}</Chip>
                })
              }
            </View>
            <Image source={{uri: pokemon?.sprites?.front_default}} style={styles.image} />
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    alignSelf: 'flex-end',
    width: 100,
    height: 100,
    justifyContent: 'flex-end'
  },
  cardContaier: {
    width: 175,
    backgroundColor: 'grey',
    margin: 5,
    borderRadius: 20
  },
  chip: {
    alignSelf: 'flex-start',
    marginTop: 2
  },
})

export default Item