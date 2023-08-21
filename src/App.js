import React, {
  BrowserRouter as Router, Routes, Route
} from 'react-router-dom';
import { useContext } from 'react';
import TopBar from './components/topbar/TopBar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Setting from './pages/settings/Settings';
import Single from './pages/single/Single';
import CreateEvent from './pages/createEvent/CreateEvent';
import Footer from './pages/footer/Footer';
import { Context } from './context/Context';

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="register" element={user ? <Home /> : <Register />} />
        <Route path="login" element={user ? <Home /> : <Login />} />
        <Route path="create_event" element={user ? <CreateEvent /> : <Register />} />
        <Route path="setting" element={user ? <Setting /> : <Register />} />
        <Route path="/event/:eventId" element={<Single />} />
      </Routes>
      <Footer />
    </Router>

  );
}

export default App;
