import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import OrdersPage from './pages/OrdersPage/OrdersPage.jsx';
import OrderDetailPage from './pages/OrderDetailPage/OrderDetailPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/orders" replace />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:orderId" element={<OrderDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
