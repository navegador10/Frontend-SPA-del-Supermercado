import React from 'react';

const HomePage = () => {
  return (
    <div className="text-center py-5">
      <h1 className="display-4 text-primary mb-4">
        Bienvenido a MarketSoft
      </h1>
      <p className="lead mb-4">
        Sistema de Gestión de Supermercado
      </p>
      <div className="row mt-5">
        <div className="col-md-3 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title text-primary">📦 Productos</h5>
              <p className="card-text">
                Gestiona el inventario de productos del supermercado
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title text-success">👥 Usuarios</h5>
              <p className="card-text">
                Administra los usuarios del sistema
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title text-warning">🏪 Proveedores</h5>
              <p className="card-text">
                Gestiona los proveedores de productos
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title text-info">💰 Ventas</h5>
              <p className="card-text">
                Controla las ventas y transacciones
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
