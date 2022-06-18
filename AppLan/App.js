import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

// import Imagex from './assets/icons/eco-light-off.png'
const App = () => {
  const [toggle, setToggle] = useState(false); //useState momoriza o valor antigo

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    //Liga flash do celular
    Torch.switchState(toggle);
    console.log('trocou estado da lanterna');
  }, [toggle]);

  useEffect(() => {
    /**
     * Quando o celualr for chacoalhado, mudar o toggle
     */
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });

    /**
     * Essa função é chamada quando o componets
     * for desmontado
     */
    return () => subscription.remove();
  }, []);

  return (
    <View style={toggle ? style.containerLight : style.container}>
      <TouchableOpacity onPress={handleChangeToggle}>
        <Image
          style={toggle ? style.lightingOn : style.lightingOff}
          source={
            toggle
              ? require('./assets/icons/eco-light.png')
              : require('./assets/icons/eco-light-off.png')
          }
        />
        <Image
          style={style.dioLogo}
          source={
            toggle
              ? require('./assets/icons/logo-dio.png')
              : require('./assets/icons/logo-dio-white.png')
          }
        />
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
  logoDio: {
    resizeMode: 'contain',

    tintColor: 'white',
    width: 250,
    height: 250,
  },
});

export default App;
