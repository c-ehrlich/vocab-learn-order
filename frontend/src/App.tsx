import Header from "./components/Header";
import Input from "./components/Input";
import Results from "./components/Results";
import Sliders from "./components/Sliders";

function App() {
  return (
    <div className='App' data-testid='App'>
      <Header />
      <Sliders />
      <Input />
      <Results />
    </div>
  );
}

export default App;
