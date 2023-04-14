import './App.css';
import AppRoutes from "./routes/AppRoutes";
import { useState } from 'react';
import { GlobalData } from "./data/GlobalData.js";
import Loader from "./components/Loader"

function App() {
  const [loaderSpinnig, setLoaderSpinning] = useState(false);
  const [search, setSearch] = useState("");
  const [searchBox, setSearchBox] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  return (
    <div className="App" style={{ height: "100vh" }}>
      {loaderSpinnig && <Loader />}
      <GlobalData.Provider value={{ setLoaderSpinning, search, setSearch, searchBox, setSearchBox, showSearch, setShowSearch }}>
        <AppRoutes />
      </GlobalData.Provider>
    </div >
  );
}

export default App;
