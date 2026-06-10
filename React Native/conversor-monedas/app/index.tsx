import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.body}>
      <View>
        <Text>Conversor de Reales a Pesos Chilenos</Text>
        <Text>
          1000 pesos chilenos equivalen hoy a (1000 en reales) reales.
        </Text>
      </View>
      <View>
        <Text>Ingrese el valor en Reales a convertir a pesos chilenos:</Text>
        <TextInput />
        <Button />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#000",
    color: "#fff",
  },
});
