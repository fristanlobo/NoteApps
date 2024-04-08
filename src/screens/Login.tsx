import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootNavigationProps } from '../AppNavigator';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/slices/LoginSlice';
import Loader from '../component/Loader';


interface MyProps {
  navigation: StackNavigationProp<RootNavigationProps, 'Login'>
}
const Login = ({ navigation }: MyProps) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<String>('');
  const [password, setPassword] = useState<String>('')
  const [badEmail, setbadEmail] = useState<boolean>(false);
  const [badPassword, setbadPassword] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<String>("");
  const [loader, setLoader] = useState<boolean>(false);

  const validate = () => {

    let valid = true;
    if (email == '') {
      setbadEmail(true);
      valid = false
    }
    else {
      setbadPassword(false)
    }
    if (password == '') {
      setbadPassword(true);
      valid = false;
    }
    else {
      setbadPassword(false);
    }
    return valid;
  }

  const login = async () => {
    setLoader(true);
    const header = new Headers();
    header.append("Content-Type", "application/json");
    const body = {
      email: email,
      password: password
    }

    const res = await fetch("http://192.168.0.214:8001/api/auth/login", {
      headers: header,
      method: 'POST',
      body: JSON.stringify(body)
    })
    const data = await res.json()
    if (data.status === false) {
      setErrMsg(data.message);
      return;
    }
    /**"_id": "661042a6e3ffe48c002440f4", "createdAt": "2024-04-05T18:27:50.076Z", "email": "fristanlobo@gmail.com", "name": "fristan", "password": "fristan123", "updatedAt": "2024-04-05T18:27:50.076Z" */
    // dispatch(addUser({
    //   id: data._id,
    //   email: data.email,
    //   name: data.name,
    //   password: data.password
    // }))
    setLoader(false);
    navigation.navigate('Home', {
      id: data._id,
    });
  }

  const handleOnFocus = () => {
    setbadEmail(false);
    setbadPassword(false);
    setErrMsg('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Notes App!</Text>

      <Image
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZqO7D2x04zXa24R5nDmeu4e7zSM2FMwOtnYRTrCsKpQ&s'
        }}
        style={styles.logo}
      />

      <View style={styles.secondary}>
        <TextInput
          style={styles.textInput}
          onChangeText={txt => setEmail(txt)}
          placeholder='username'
          onFocus={() => handleOnFocus()}
        />
        {
          badEmail && <Text style={
            styles.errormsg
          }>
            Username cannot be empty
          </Text>
        }
        <TextInput
          style={styles.textInput}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={(txt) => setPassword(txt)}
          onFocus={() => handleOnFocus()}
        />
        {
          badPassword && <Text style={
            styles.errormsg
          }>
            Password cannot be empty
          </Text>
        }
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (validate()) {
              login();
            }
          }}
        >
          <Text style={styles.btnText}>
            Login
          </Text>
        </TouchableOpacity>

        {
          errMsg && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={{
                color: '#000',
                fontSize: 16
              }}>{errMsg}</Text>
            </View>
          )
        }

        <View style={styles.singup}>
          <View>
            <Text style={{
              color: '#000',
              fontSize: 16,
            }}>
              User is not Register?
            </Text>
          </View>

          <View>
            <TouchableOpacity
              style={{
                //backgroundColor: 'pink',

                alignSelf: 'center'
              }}
              onPress={() => {
                navigation.navigate('Signup')
              }}
            >
              <Text style={{
                fontSize: 16,
                color: 'red',

              }}>
                SignUp here !
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
      <Loader visible={loader} />
    </View >
  )
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor:'#9e9e9e',
    flexDirection: 'column'
  },
  heading: {
    fontSize: 30,
    alignSelf: 'center',
    marginTop: '30%',
    color: '#000',
  },
  textInput: {
    borderWidth: 1,
    margin: 10,
    borderRadius: 8,
    paddingHorizontal: 10
  },
  button: {
    borderWidth: 1,
    borderRadius: 8,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 10,
    width: 200,
    margin: 10,
  },
  btnText: {
    fontSize: 16,
    color: '#fff'
  },
  singup: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#9e9e9e'
  },
  secondary: {
    flex: 2,
    marginTop: '5%',
    marginHorizontal: '5%'
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 10
  },
  errormsg: {
    fontSize: 14,
    color: 'red',
    marginHorizontal: 10,
  }
})