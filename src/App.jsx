// App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './Pages/home/home.jsX'
import NotFound from './pages/notFound/NotFound.jsx'; // Página para manejar rutas no encontradas
import VerPaquetes from './Pages/verPaquetes/VerPaquetes.jsx'; // Página para manejar la lista de paquetes
import VerDetalle from './Pages/verDetalle/verDetalle.jsx'; // Página para manejar los detalles de un paquete
import Header from './utils/Header';
import Footer from './utils/Footer';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/ver-paquetes" element={<VerPaquetes />} />
        <Route path="/detalle" element={<VerDetalle />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
