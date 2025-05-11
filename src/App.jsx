import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ContentList from './pages/ContentList';
import FullContentPage from './pages/FullContentPage';
import UserProfilePage from './pages/UserProfilePage';
import CreateContentPage from './pages/ContentCreatePage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContentList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/content/:id" element={<FullContentPage />} />
        <Route path="/profile/:userId" element={<UserProfilePage />} />
        <Route path="/content/create" element={<CreateContentPage/>}/>
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;