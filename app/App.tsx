import { useFonts } from 'expo-font';
import { Main } from './src/Main';
import { StatusBar } from 'react-native';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export default function App() {
  const [isFontsLoaded] = useFonts({
    'GeneralSans400': require('./src/assets/fonts/GeneralSans-Regular.otf'),
    'GeneralSans500': require('./src/assets/fonts/GeneralSans-Semibold.otf'),
    'GeneralSans700': require('./src/assets/fonts/GeneralSans-Bold.otf'),
  });

  if (!isFontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar backgroundColor='transparent' barStyle={'dark-content'} />
      <Main />
    </>
  );
}

