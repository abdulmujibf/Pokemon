import React from 'react'
import {Text, StyleSheet, View} from 'react-native'

function About (props) {

  return (
    <View style={styles.container}>
      {/* <Text style={styles.item}>Height: {data?.height}</Text> */}
      {/* <Text style={styles.item}>Weight: {data?.weight}</Text> */}
      <Text style={styles.item}>Abilities: </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10
  },
  item: {
    marginVertical: 10
  }
})

export default About