import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Image} from 'react-native';
import { useEffect, useState } from "react";

export default function App() {
  const [res, setRes] = useState(null);
  const [nomePais, setNomePais] = useState("");
  const [nomeCapital, setNomeCapital] = useState("");

  async function buscarPais() {
    const resposta = await fetch( 
      `https://restcountries.com/v3.1/name/${nomePais}`
    );
    const dados = await resposta.json();
    setRes(dados[0]);
  }

  async function buscarCapital() {
    const resposta = await fetch( 
      `https://restcountries.com/v3.1/capital/${nomeCapital}`
    );
    const dadosCap = await resposta.json();
    setRes(dadosCap[0]);
  }

  return (
    <View style={styles.container}>
        <Text>Pesquisa por País:</Text>
        <TextInput
          placeholder='Digite o nome de um País'
          value={nomePais}
          onChangeText={(novoTexto) => setNomePais(novoTexto)}
          style={styles.input}
        />

        <Pressable style={styles.botao} onPress={buscarPais}>
          <Text style={styles.textoBotao}>Pesquisar</Text>
        </Pressable>
        <Text>Pesquisa por Capital:</Text>
        <TextInput
          placeholder='Digite o nome de uma Capital'
          value={nomeCapital}
          onChangeText={(novoTextoCap) => setNomeCapital(novoTextoCap)}
          style={styles.input}
        />

        <Pressable style={styles.botao} onPress={buscarCapital}>
          <Text style={styles.textoBotao}>Pesquisar</Text>
        </Pressable>

        {res && (
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 20 }}>Nome Comum: {res.name.common}</Text>

            <Text style={{ fontSize: 20 }}>Nome Oficial: {res.name.official}</Text>

            <Text style={{ fontSize: 20 }}>Nome - tradução para russo: {res.translations.rus.common}</Text>
            
            <Image
              source={{ uri: res.flags.png }} 
              style={{ width: 120, height: 80 }} 
            />
          </View>
        )}
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007bff32',
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 10,
  },
  botao: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
  },
});
