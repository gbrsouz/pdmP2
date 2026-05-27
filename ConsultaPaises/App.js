import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, Image} from 'react-native';
import { useEffect, useState } from "react";
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [res, setRes] = useState(null);
  const [tipoBusca, setTipoBusca] = useState("pais");
  const [entrada, setEntrada] = useState("");

  async function buscar() {
    const url =
      tipoBusca === "pais"
        ? `https://restcountries.com/v3.1/name/${entrada}`
        : `https://restcountries.com/v3.1/capital/${entrada}`;

    const resposta = await fetch(url);
    const dados = await resposta.json();
    setRes(dados[0]);
  }

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 10 }}>Selecione o tipo de pesquisa:</Text>
      <Picker
        selectedValue={tipoBusca}
        onValueChange={(valor) => setTipoBusca(valor)}
        style={{ height: 30, width: 200, marginBottom: 30 }}
      >
        <Picker.Item label="Por País" value="pais" />
        <Picker.Item label="Por Capital" value="capital" />
      </Picker>

      <TextInput
        placeholder={
          tipoBusca === "pais"
            ? "Digite o nome de um País"
            : "Digite o nome de uma Capital"
        }
        value={entrada}
        onChangeText={(novoTexto) => setEntrada(novoTexto)}
        style={styles.input}
      />

      <Pressable style={styles.botao} onPress={buscar}>
        <Text style={styles.textoBotao}>Pesquisar</Text>
      </Pressable>

      {res && (
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 20 }}>Nome Comum: {res.name.common}</Text>

          <Text style={{ fontSize: 20 }}>Nome Oficial: {res.name.official}</Text>

          <Text style={{ fontSize: 20 , marginBottom: 30 }}>Nome - tradução para russo: {res.translations.rus.common}</Text>

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
    width: '50%',
    marginBottom: 30,
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
