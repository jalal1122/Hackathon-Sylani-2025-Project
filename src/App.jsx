import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Router from "./Router/Router";
import { AppProvider } from "./Context/AppContext";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppProvider>
        <Navbar />
        <main className="flex-1">
          <Router />
        </main>
        <Footer />
      </AppProvider>
    </div>
  );
}

export default App;
