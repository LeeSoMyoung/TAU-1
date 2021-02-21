import React from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Button
} from 'react-native'

import { Auth } from 'aws-amplify'

class SignIn extends React.Component {
  state = {
    username: '',
    password: '',
    user: {}
  }
  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        this.props.navigation.navigate('AppNav')
      })
      .catch(err => console.log('err: ', err))
  }
  onChangeText(key, value) {
    this.setState({ [key]: value })
  }
  signIn = () => {
    const { username, password } = this.state
    Auth.signIn(username, password)
      .then(user => {
        console.log('successful sign in!')
        this.setState({ user })
      })
      .catch(err => {
        console.log('error signin in!: ', err)
      })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          placeholder='아이디'
          autoCorrect={false}
          autoCapitalize='none'
          onChangeText={val => this.onChangeText('username', val)}
          style={styles.input}
        />
        <TextInput
          placeholder='비밀번호'
          onChangeText={val => this.onChangeText('password', val)}
          secureTextEntry={true}
          style={styles.input}
        />
        <Button
          title="Sign In"
          onPress={this.signIn}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'#0F1738'
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
    height: 50,
    margin: 10
  }
})

export default SignIn