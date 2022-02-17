import Header from './components/Header';
import Sliders from './components/Sliders';
import Input from './components/Input';
import Results from './components/Results';
import useStore from './store';

function App() {
  const { serverResponse } = useStore();
  return (
    <div className='App' data-testid='App'>
      <Sliders />
      {serverResponse ? <Results /> : <Input />}
      <Header />
    </div>
  );
}

export default App;
