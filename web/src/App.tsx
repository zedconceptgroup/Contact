import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import RentalListPage from './pages/RentalListPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import RatesAndDiscountsPage from './pages/RatesAndDiscountsPage';
import FeesTaxesPage from './pages/FeesTaxesPage';
import PaymentSchedulePage from './pages/PaymentSchedulePage';
import RoomsPage from './pages/RoomsPage';
import './styles/layout.css';

function App() {
  const location = useLocation();

  return (
    <div className="layout">
      <aside className="sidebar">
        <h1 className="logo">PMS</h1>
        <nav>
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Dashboard
          </NavLink>
          <NavLink to="/rentals" className={({ isActive }) => (isActive ? 'active' : '')}>
            Rentals
          </NavLink>
          <NavLink to="/rates" className={({ isActive }) => (isActive ? 'active' : '')}>
            Rates & Discounts
          </NavLink>
          <NavLink to="/fees" className={({ isActive }) => (isActive ? 'active' : '')}>
            Fees & Taxes
          </NavLink>
          <NavLink to="/payment" className={({ isActive }) => (isActive ? 'active' : '')}>
            Payment Schedule
          </NavLink>
          <NavLink to="/rooms" className={({ isActive }) => (isActive ? 'active' : '')}>
            Rooms
          </NavLink>
        </nav>
      </aside>
      <main className="content">
        <header className="topbar">
          <h2>{location.pathname === '/' ? 'Dashboard' : location.pathname.replace('/', '')}</h2>
          <div className="topbar-actions">
            <span className="user-chip">Admin</span>
          </div>
        </header>
        <section className="page">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/rentals" element={<RentalListPage />} />
            <Route path="/rentals/:id" element={<PropertyDetailsPage />} />
            <Route path="/rates" element={<RatesAndDiscountsPage />} />
            <Route path="/fees" element={<FeesTaxesPage />} />
            <Route path="/payment" element={<PaymentSchedulePage />} />
            <Route path="/rooms" element={<RoomsPage />} />
          </Routes>
        </section>
      </main>
    </div>
  );
}

export default App;
