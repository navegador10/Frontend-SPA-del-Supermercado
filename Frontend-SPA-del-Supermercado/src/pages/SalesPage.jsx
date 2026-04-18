import React, { useState, useEffect } from 'react';
import { salesService } from '../services/api';

const SalesPage = () => {
  const [sales, setSales] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingSale, setEditingSale] = useState(null);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    total_amount: '',
    payment_method: 'cash',
    status: 'pending'
  });

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    try {
      const response = await salesService.getAll();
      setSales(response.data);
    } catch (error) {
      console.error('Error loading sales:', error);
      alert('Error al cargar las ventas');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.customer_email && !emailRegex.test(formData.customer_email)) {
        alert('Por favor, ingrese un email válido');
        return;
      }

      // Validar monto
      if (parseFloat(formData.total_amount) <= 0) {
        alert('El monto total debe ser mayor a 0');
        return;
      }

      const saleData = {
        ...formData,
        total_amount: parseFloat(formData.total_amount)
      };
      
      if (editingSale) {
        await salesService.update(editingSale.id, saleData);
      } else {
        await salesService.create(saleData);
      }
      setShowModal(false);
      setEditingSale(null);
      setFormData({ customer_name: '', customer_email: '', total_amount: '', payment_method: 'cash', status: 'pending' });
      loadSales();
    } catch (error) {
      console.error('Error saving sale:', error);
      alert('Error al guardar la venta: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (sale) => {
    setEditingSale(sale);
    setFormData({
      customer_name: sale.customer_name,
      customer_email: sale.customer_email,
      total_amount: sale.total_amount,
      payment_method: sale.payment_method,
      status: sale.status
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta venta?')) {
      try {
        await salesService.delete(id);
        loadSales();
      } catch (error) {
        console.error('Error deleting sale:', error);
        alert('Error al eliminar la venta');
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: 'bg-warning',
      completed: 'bg-success',
      cancelled: 'bg-danger'
    };
    const statusText = {
      pending: 'Pendiente',
      completed: 'Completada',
      cancelled: 'Cancelada'
    };
    return (
      <span className={`badge ${statusMap[status] || 'bg-secondary'}`}>
        {statusText[status] || status}
      </span>
    );
  };

  const getPaymentMethod = (method) => {
    const methods = {
      cash: 'Efectivo',
      card: 'Tarjeta',
      transfer: 'Transferencia'
    };
    return methods[method] || method;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Ventas</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingSale(null);
            setFormData({ customer_name: '', customer_email: '', total_amount: '', payment_method: 'cash', status: 'pending' });
            setShowModal(true);
          }}
        >
          Nueva Venta
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Email</th>
              <th>Monto Total</th>
              <th>Método de Pago</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(sale => (
              <tr key={sale.id}>
                <td>{sale.id}</td>
                <td>{sale.customer_name}</td>
                <td>{sale.customer_email}</td>
                <td>${parseFloat(sale.total_amount).toFixed(2)}</td>
                <td>{getPaymentMethod(sale.payment_method)}</td>
                <td>{getStatusBadge(sale.status)}</td>
                <td>{new Date(sale.created_at).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(sale)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(sale.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingSale ? 'Editar Venta' : 'Nueva Venta'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nombre del Cliente</label>
                    <input
                      type="text"
                      className="form-control"
                      name="customer_name"
                      value={formData.customer_name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email del Cliente</label>
                    <input
                      type="email"
                      className="form-control"
                      name="customer_email"
                      value={formData.customer_email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Monto Total</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-control"
                      name="total_amount"
                      value={formData.total_amount}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Método de Pago</label>
                    <select
                      className="form-select"
                      name="payment_method"
                      value={formData.payment_method}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="cash">Efectivo</option>
                      <option value="card">Tarjeta</option>
                      <option value="transfer">Transferencia</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Estado</label>
                    <select
                      className="form-select"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="pending">Pendiente</option>
                      <option value="completed">Completada</option>
                      <option value="cancelled">Cancelada</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingSale ? 'Actualizar' : 'Crear'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPage;
