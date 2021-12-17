import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./bootstrap.min.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
