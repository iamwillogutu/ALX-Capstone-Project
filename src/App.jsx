import Header from "./components/Header";
import Converter from "./components/Converter";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0089d1' }}>
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        <Header />
        <Converter />
      </div>
    </div>
  );
}

export default App;