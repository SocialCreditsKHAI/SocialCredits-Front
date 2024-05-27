
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import LoginComponent from './pages/auth/LoginComponent';
import Registration from './pages/auth/Registration'
import Header from './layout/Header';
import Home from './pages/home page/Home';
import ProfilePage from './pages/profile page/ProfilePage';

import axios from 'axios';
import Cookies from 'js-cookie';


function App() {
    axios.interceptors.request.use(config => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = 'Bearer '+ token ;
        }
        return config;
    });
    return (
        <div>
            <Header />
          <Router>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/registration" element={<Registration />} />
                  <Route path="/login" element={<LoginComponent />} />
              </Routes>
          </Router>
        </div>
    );
}

export default App;
