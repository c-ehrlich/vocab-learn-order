import Header from './components/Header';
import Input from './components/Input';
import Results from './components/Results';
import BodyWrapper from './components/BodyWrapper';
import { defaultTheme } from './themes/default';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import {
  HashRouter,
  Route,
  Routes,
} from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto-serif/900.css';

function App() {
  return (
    <div className='App' data-testid='App'>
      <HashRouter basename='/'>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <Header />
          <BodyWrapper>
            <Routes>
              <Route path='/results' element={<Results />} />
              <Route path='/' element={<Input />} />
            </Routes>
          </BodyWrapper>
        </ThemeProvider>
      </HashRouter>
    </div>
  );
}

export default App;
