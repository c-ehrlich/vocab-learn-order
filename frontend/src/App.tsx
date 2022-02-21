import Header from './components/Header';
import Input from './components/Input';
import Results from './components/Results';
import useStore from './store';
import BodyWrapper from './components/BodyWrapper';
import { defaultTheme } from './themes/default';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto-serif/900.css';

function App() {
  const { serverResponse } = useStore();
  return (
    <div className='App' data-testid='App'>
      <Router>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <Header />
          <BodyWrapper>{serverResponse ? <Results /> : <Input />}</BodyWrapper>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
