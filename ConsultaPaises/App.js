import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from "react";
import { WebView } from 'react-native-webview';

export default function App() {
  const [res, setRes] = useState(null);

  useEffect(() => {
    async function buscarPais() {
      const resposta = await fetch(
        "https://restcountries.com/v3.1/name/brazil"
      );
      const dados = await resposta.json();
      setRes(dados[0]);
    }

    buscarPais();
  }, []);

  return (
    <View style={styles.container}>
      {res && (
        <Text style={{ fontSize: 20 }}>
          {res.name.common}
        </Text>
      )}
      {res && (
        <Text style={{ fontSize: 20 }}>
          {res.name.nativeName.por.official}
        </Text>
      )}
      {res && (
        <Text style={{ fontSize: 20 }}>
          {res.translations.rus.common}
        </Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
