import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard/Dashboard';
import MyProject from './pages/MyProject';
import Login from './pages/auth/Login/Login';


import MainStructure from './components/MainStructure/MainStructure';
import Register from './pages/auth/Register/Register';
import { Test } from './pages/Test/Test';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<MainStructure><Dashboard /></MainStructure>} />
        <Route path="/my-project" element={<MainStructure><MyProject /></MainStructure>} />
        <Route path="/test" element={<Test />} />
        {/* Puedes agregar más rutas aquí */}
      </Routes>
    </Router>
  );
}

export default App;
