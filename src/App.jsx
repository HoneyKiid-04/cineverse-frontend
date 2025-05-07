import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ContentList from './pages/ContentList';
import FullContentPage from './pages/FullContentPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContentList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/content/:id" element={<FullContentPage />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;