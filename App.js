import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, } from 'react-native';
import { useState } from 'react'
import OyunBasla from './screens/OyunBasla';
import OyunBitis from './screens/OyunBitis';
import Oyun from './screens/Oyun';
import { LinearGradient } from 'expo-linear-gradient';


export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(true)
  const [guessCounts, setGuessCounts] = useState(0)

  // au debut le setGameIsoOver is false mais sil trouve le nbre je le mets a false 
  const sendedNumHandler = (gonderdigiSayi) => {
    setUserNumber(gonderdigiSayi);
    setGameIsOver(false)
  };
  // A=numberOfGuess
  function OyunDoneHandler(A) {
    setGameIsOver(true)
    setGuessCounts(A)
  }
  // j'ai lie un props a ce nom pour l'envoyer vers OyunBasla car bilgisyar tahmini yaparken lazimdir
  // Définir la variable `screens` ici, basée sur l'état `userNumber`.
  let screens = <OyunBasla onSendNumber={sendedNumHandler} />;

  if (userNumber) {
    screens = <Oyun userNumber={userNumber} onGaveOver={OyunDoneHandler} />;
  }
  // la partie de relancement du jeu avec la value
  function NewGameHandler() {
    setUserNumber(null)
    setGuessCounts(0) // Ceci est pr le nbre fois de tahmin de l'ordi
  }
  if (gameIsOver && userNumber) {
    screens = <OyunBitis roundsNumber={guessCounts} userNumber={userNumber} StartNewGame={NewGameHandler} />
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={['rgba(0,0,0,0.8)', 'transparent']}>

      <ImageBackground
        style={styles.container}
        source={require('./assets/backimg.jpg')}
        imageStyle={styles.img}
      >

        {screens}
      </ImageBackground>

    </LinearGradient>
  );
}
// ds cette partie j'ai  ajoute ImageStyle ki est une properti pr rendre img flou derniere somthing 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    opacity: 0.2,
  }
});
