import Header from "./components/Header";
import Converter from "./components/Converter";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-700">
      <div>
        <Header />
        <Converter />
      </div>
    </div>
  );
}

export default App;