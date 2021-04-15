import React from 'react'
import {Text, View, StyleSheet, FlatList} from 'react-native'
import { useSelector } from 'react-redux';
import {Button} from 'react-native-paper'
import Item from '../components/Item'

function Favorites ({navigation}) {
  const favorites = useSelector(state => state.favorites)

  const renderItem = ({item}) => {
    return (
      <Item data={item} style={styles.itemStyles} navigation={navigation} />
    )
  }

  const back = () => {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10}}>
        <Text style={styles.head}>My Pokemon List</Text>
        <Button mode="outlined" onPress={back}>Back</Button>
      </View>
      <View style={styles.itemContainer}>
        <FlatList
          data={favorites}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(_, index) => index}
        />

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

export default Favorites