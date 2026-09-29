import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
