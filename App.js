import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const API_URL = 'https://api.frankfurter.dev/v2/rates?base=CLP';

export default function App() {
  const [rate, setRate] = useState(null);
  const [amount, setAmount] = useState('1000');
  const [direction, setDirection] = useState('CLP_TO_BRL');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadRate();
  }, []);

  async function loadRate() {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('No se pudo obtener la tasa de cambio.');
      }

      const data = await response.json();
      const brlRate = getBrlRate(data);

      if (!Number.isFinite(brlRate)) {
        throw new Error('La respuesta no contiene una tasa valida para BRL.');
      }

      setRate(brlRate);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }

  const numericAmount = Number.parseFloat(amount.replace(',', '.'));

  const result = useMemo(() => {
    if (!rate || !Number.isFinite(numericAmount)) {
      return null;
    }

    return direction === 'CLP_TO_BRL'
      ? numericAmount * rate
      : numericAmount / rate;
  }, [direction, numericAmount, rate]);

  const sourceCurrency = direction === 'CLP_TO_BRL' ? 'CLP' : 'BRL';
  const targetCurrency = direction === 'CLP_TO_BRL' ? 'BRL' : 'CLP';

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#f7f3ea" />
      <View style={styles.container}>
        <Text style={styles.title}>Conversor CLP / BRL</Text>
        <Text style={styles.subtitle}>
          Convierte pesos chilenos y reales brasilenos con la tasa actual.
        </Text>

        <View style={styles.panel}>
          {isLoading ? (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#176b63" />
              <Text style={styles.helper}>Cargando tasa...</Text>
            </View>
          ) : (
            <>
              {error ? (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>{error}</Text>
                  <TouchableOpacity style={styles.secondaryButton} onPress={loadRate}>
                    <Text style={styles.secondaryButtonText}>Reintentar</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <Text style={styles.rate}>
                    1000 CLP = {(1000 * rate).toFixed(2)} BRL
                  </Text>

                  <View style={styles.segmentedControl}>
                    <TouchableOpacity
                      style={[
                        styles.segment,
                        direction === 'CLP_TO_BRL' && styles.segmentActive,
                      ]}
                      onPress={() => setDirection('CLP_TO_BRL')}
                    >
                      <Text
                        style={[
                          styles.segmentText,
                          direction === 'CLP_TO_BRL' && styles.segmentTextActive,
                        ]}
                      >
                        CLP a BRL
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.segment,
                        direction === 'BRL_TO_CLP' && styles.segmentActive,
                      ]}
                      onPress={() => setDirection('BRL_TO_CLP')}
                    >
                      <Text
                        style={[
                          styles.segmentText,
                          direction === 'BRL_TO_CLP' && styles.segmentTextActive,
                        ]}
                      >
                        BRL a CLP
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.label}>Monto en {sourceCurrency}</Text>
                  <TextInput
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="decimal-pad"
                    placeholder="Ingresa un monto"
                    style={styles.input}
                  />

                  <View style={styles.resultBox}>
                    <Text style={styles.resultLabel}>Resultado</Text>
                    <Text style={styles.result}>
                      {result === null
                        ? 'Ingresa un numero valido'
                        : `${formatMoney(result)} ${targetCurrency}`}
                    </Text>
                  </View>
                </>
              )}
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

function getBrlRate(data) {
  if (Array.isArray(data)) {
    return data.find((currency) => currency.quote === 'BRL')?.rate;
  }

  if (Array.isArray(data?.rates)) {
    return data.rates.find((currency) => currency.quote === 'BRL')?.rate;
  }

  return data?.rates?.BRL ?? data?.BRL;
}

function formatMoney(value) {
  return new Intl.NumberFormat('es-CL', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(value);
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f7f3ea',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#18211f',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: '#59615f',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 24,
  },
  panel: {
    backgroundColor: '#ffffff',
    borderColor: '#ded8c9',
    borderRadius: 8,
    borderWidth: 1,
    padding: 18,
  },
  loading: {
    alignItems: 'center',
    gap: 12,
    minHeight: 160,
    justifyContent: 'center',
  },
  helper: {
    color: '#59615f',
    fontSize: 15,
  },
  errorBox: {
    gap: 14,
  },
  errorText: {
    color: '#a23232',
    fontSize: 15,
    lineHeight: 21,
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#176b63',
    borderRadius: 8,
    padding: 13,
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  rate: {
    color: '#176b63',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 18,
  },
  segmentedControl: {
    backgroundColor: '#ece6d8',
    borderRadius: 8,
    flexDirection: 'row',
    marginBottom: 18,
    padding: 4,
  },
  segment: {
    alignItems: 'center',
    borderRadius: 6,
    flex: 1,
    paddingVertical: 11,
  },
  segmentActive: {
    backgroundColor: '#176b63',
  },
  segmentText: {
    color: '#33413e',
    fontSize: 14,
    fontWeight: '700',
  },
  segmentTextActive: {
    color: '#ffffff',
  },
  label: {
    color: '#33413e',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    borderColor: '#c8c1b2',
    borderRadius: 8,
    borderWidth: 1,
    color: '#18211f',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  resultBox: {
    backgroundColor: '#eef6f3',
    borderRadius: 8,
    padding: 16,
  },
  resultLabel: {
    color: '#59615f',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  result: {
    color: '#18211f',
    fontSize: 26,
    fontWeight: '800',
  },
});
