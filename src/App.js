import ContextProviders from "./ContextProviders/ContextProviders";
import { HashRouter as Router } from "react-router-dom";
import AppMainLayout from "./Layouts/AppMainLayout/AppMainLayout";


function App() {
  return (
    <div className="App">

      <ContextProviders>
        <Router>
          <AppMainLayout></AppMainLayout>
        </Router>
      </ContextProviders>
      
    </div>
  );
}

export default App;
