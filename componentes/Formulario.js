import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const Formulario = ({moneda, criptomoneda, guardarMoneda, guardarCriptomoneda, guardarConsultarAPI}) => {
  
  // const [moneda, guardarMoneda] = useState('')
  // const [criptomoneda, guardarCriptomoneda] = useState('')
  const [criptomonedas, guardarCriptomonedas] = useState([])

  useEffect(() => {
    const consultarAPI= async ()=>{
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const resultado = await axios.get(url);
      guardarCriptomonedas(resultado.data.Data);
    }
    consultarAPI();
  },[])

  //Uso de alert
  const mostrarAlerta=_=>{
    Alert.alert(
      'Error...',
      'Ambos campos son obligatorios',
      [
        {text:'OK'}
      ]
    )
  }

  //alamcena las selecciones del usuario
  const obtenerMoneda=moneda=>guardarMoneda(moneda);
  const obtenerCriptoMoneda=cripto=>guardarCriptomoneda(cripto);
  const cotizarPrecio=_=>
            (moneda.trim()===''||criptomoneda.trim()==='')
              ?mostrarAlerta()
              :guardarConsultarAPI(true);


  return (
    <View>
      <Text style={styles.label}>Mondas</Text>
      <Picker
        selectedValue={moneda}
        onValueChange={e=>obtenerMoneda(e)}
        itemStyle={{height:120}}
      >
        <Picker.Item label='-Seleccione -' value='' />
        <Picker.Item label='Chile CLP' value='CLP' />
        <Picker.Item label='USA USD' value='USD' />
        <Picker.Item label='Mexico MXN' value='MXN' />
        <Picker.Item label='Euro EUR' value='EUR' />
        <Picker.Item label='Libra esterlina GBP' value='GBP' />
      </Picker>
      <Text style={styles.label}>Mondas</Text>
      <Picker
        selectedValue={criptomoneda}
        onValueChange={e=>obtenerCriptoMoneda(e)}
        itemStyle={{height:120}}

      >
        <Picker.Item label='-Seleccione -' value='' />
        {
          criptomonedas.map(cripto=>(
            <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
          ))
        }
      </Picker>
      <TouchableHighlight
        style={styles.btnCotizar}
        onPress={()=>cotizarPrecio()}
      >
        <Text style={styles.textoCotizar}>Cotizar</Text>
      </TouchableHighlight>

    </View>
  )
}

const styles = StyleSheet.create({
  label:{
    fontFamily: 'Lato-Black',
    textTransform:'uppercase',
    fontSize:22,
    marginVertical:20,
  },
  btnCotizar:{
    backgroundColor:'#5e49e2',
    padding:10,
    marginTop:20,
  },
  textoCotizar:{
    color:'#fff',
    fontSize:18,
    fontFamily:'Lato-Black',
    textTransform:'uppercase',
    textAlign:'center'

  }

})

export default Formulario
