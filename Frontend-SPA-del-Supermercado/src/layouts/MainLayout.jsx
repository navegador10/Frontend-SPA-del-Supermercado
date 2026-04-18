import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const MainLayout = ({ children }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <strong>MarketSoft</strong>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/')}`} to="/">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/products')}`} to="/products">
                  Productos
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/users')}`} to="/users">
                  Usuarios
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/suppliers')}`} to="/suppliers">
                  Proveedores
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/sales')}`} to="/sales">
                  Ventas
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="container">
        {children}
      </main>
      <footer className="bg-light text-center py-3 mt-5">
        <p className="mb-0 text-muted">
          © 2024 MarketSoft - Sistema de Gestión de Supermercado
        </p>
      </footer>
    </div>
  );
};

export default MainLayout;
