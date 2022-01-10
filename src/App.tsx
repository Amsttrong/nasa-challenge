import "./App.css";
import { Navbar } from "./components/Navbar";
import { HomeView } from "./views/HomeView";

function App() {
  return (
    <div>
      <Navbar />
      <HomeView />;
    </div>
  );
}

export default App;
