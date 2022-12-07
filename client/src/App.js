import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import "./styles/styles.scss";
import generateStore from "./store/store";
import ElementsRoutes from "./components/routers/ElementsRoutes";

function App() {
  const store = generateStore();

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/*" element={<ElementsRoutes />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
