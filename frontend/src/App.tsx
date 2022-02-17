import Header from './components/Header';
import Input from './components/Input';
import Results from './components/Results';
import useStore from './store';
import BodyWrapper from './components/BodyWrapper';
import { defaultTheme } from './themes/default';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

function App() {
  const { serverResponse } = useStore();
  return (
    <div className='App' data-testid='App'>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Header />
        <BodyWrapper>{serverResponse ? <Results /> : <Input />}</BodyWrapper>
      </ThemeProvider>
    </div>
  );
}

export default App;
