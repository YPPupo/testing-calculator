import { Calculator } from "./components/Calculator";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Calculator
        </h1>
        <Calculator />
        <div className="text-center mt-8 text-gray-600">
          <p>
            Made with ❤️ by{" "}
            <a href="https://github.com/YPPupo">Yasel Pérez Pupo</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
