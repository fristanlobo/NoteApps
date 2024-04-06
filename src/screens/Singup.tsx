import { View, Text } from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootNavigationProps } from '../AppNavigator'

interface MyProps {
  navigation: StackNavigationProp<RootNavigationProps, 'Signup'>
}
const Singup = ({ navigation }: MyProps) => {
  return (
    <View>
      <Text>Singup</Text>
    </View>
  )
}

export default Singup