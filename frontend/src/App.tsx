import Header from "./components/Header";
import Sliders from "./components/Sliders";
import Input from "./components/Input";
import Results from "./components/Results";

function App() {
  return (
    <div className='App' data-testid='App'>
      <Sliders />
      <Input />
      <Results />
      <Header />
    </div>
  );
}

export default App;
