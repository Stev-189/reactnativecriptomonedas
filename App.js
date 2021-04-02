import React,{useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
  View,
} from 'react-native';
import axios from 'axios';
import Header from './componentes/Header';
import Formulario from './componentes/Formulario';
import Cotizacion from './componentes/Cotizacion';


const App= () => {
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [consultarAPI, guardarConsultarAPI] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda= async ()=>{
      if(consultarAPI){
        const url= `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const resultado = await axios.get(url);
        guardarCargando(true)
        setTimeout(() => {
          guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
          guardarConsultarAPI(false)
          guardarCargando(false)
        }, 3000);
      }
    }
    cotizarCriptomoneda()
  }, [consultarAPI])

  const componente =cargando? <ActivityIndicator size='large' color='#5e49e2' />:<Cotizacion resultado={resultado}/>;
  return (
    <ScrollView>
      <Header/>
      <Image
        style={styles.imagen}
        source={require('./assets/img/cryptomonedas.png')}
      />
      <View style={styles.contenido}>
        <Formulario
          moneda={moneda}
          criptomoneda={criptomoneda}
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
          guardarConsultarAPI={guardarConsultarAPI}
        />
      </View>
      <View style={{marginTop:40}}>
        {componente}
      </View>
       
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imagen:{
    width:'100%',
    height:150,
    marginHorizontal:'2.5%'
  },
  contenido:{
    marginHorizontal:'2.5%'
  }
});

export default App;
