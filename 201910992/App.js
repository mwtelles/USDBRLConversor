import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SplashScreen from 'expo-splash-screen';
const baseURL = 'https://economia.awesomeapi.com.br/json/last/USD-BRL';

export function TelaSegura() {
  const [access, setAccess] = useState(false);

  useEffect(() => {
    (async () => {
      const authentication = await LocalAuthentication.authenticateAsync();
      if (authentication.success)
        setAccess(true)
      else
        setAccess(false)
    })();
  }, []);

  return (
    <View>
      {access && (
        <Text style={styles.textHeader}>Usuario logado com sucesso!</Text>
      )}
    </View>
  )

}


export default function App() {
  var [totalReal, setTotalReal] = useState('');
  var [totalDolar, setTotalDolar] = useState('');
  const [cotacao, setCotacao] = useState('');
  var [resultado, setResultado] = useState('');

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setCotacao(response.data);
    });
  }, []);

  console.log(cotacao.USDBRL);

  function CalcularConversao() {
    totalDolar = parseFloat(totalReal) / parseFloat(cotacao.USDBRL.ask);

    setResultado(totalDolar.toFixed(2));
  }
  
  
const [biometria, setBiometria] = useState(false);
  const [render, setRender] = useState(false);

  const changeRender = () => setRender(true)

  useEffect(() => {
    (async () => {
      const compativel = await LocalAuthentication.hasHardwareAsync();
      setBiometria(compativel);
    })();
  }, []);

  if (render) {
    return (
      <TelaSegura />
    )
  } else {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('./assets/background.png')}
          style={styles.logoBackground}
          resizeMode="contain"
        />
        <Image
          source={require('./assets/logo-reverse.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.textHeader}>Conversor UniVass</Text>
      <Text style={styles.textDev}>Por Matheus Telles - 201910992</Text>

      <TextInput
        style={styles.campo}
        placeholder="Montante em Reais.."
        onChangeText={(totalReal) => setTotalReal(totalReal)}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.botao} onPress={CalcularConversao}>
        <Text style={styles.textBotao}>Converter</Text>
      </TouchableOpacity>
      <Text style={styles.resultado}>
        {'O total em dolar será: $' + resultado}
      </Text>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  resultado: {
    textAlign: 'left',
    marginTop: 10,
    marginLeft: 18,
    marginBottom: 10,
    fontSize: 15,
    color: '#fff'
  },

  campo: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 15,
    padding: 10,
    fontSize: 15,
  },

  botao: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    backgroundColor: '#880000',
    padding: 10,
    borderRadius: 8,
  },

  textBotao: {
    color: '#fff'
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBackground: {
    width: '50%'
  },
  logo: {
    position: 'absolute',
    width: '30%',
  },
  textHeader: {
    color: '#880000',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -25
  },
  textDev: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
});