// Script simple para probar la API con datos básicos
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

async function testBasicData() {
  console.log('=== Probando datos básicos ===');

  try {
    // Primero crear un proveedor para poder crear productos
    console.log('\n1. Creando proveedor primero...');
    let providerId = null;
    try {
      const supplier = {
        name: 'Proveedor Test',
        company: 'Empresa Test',
        email: 'proveedor@test.com',
        phone: '123456789',
        address: 'Dirección Test',
        city: 'Bogotá'
      };
      const supplierResponse = await api.post('/providers', supplier);
      providerId = supplierResponse.data.id;
      console.log('Proveedor creado:', supplierResponse.data);
    } catch (error) {
      console.log('Error proveedor:', error.response?.data || error.message);
    }

    // Probar producto simple con providerId
    console.log('\n2. Probando producto con providerId...');
    try {
      const product = {
        name: 'Producto Test',
        description: 'Descripción simple',
        price: 10.99,
        stock: 5,
        category: 'Test',
        providerId: providerId || 1
      };
      const productResponse = await api.post('/products', product);
      console.log('Producto creado:', productResponse.data);
    } catch (error) {
      console.log('Error producto:', error.response?.data || error.message);
    }

    // Probar venta simple con saleDetails y userId
    console.log('\n3. Probando venta con saleDetails y userId...');
    try {
      const sale = {
        customer_name: 'Cliente Test',
        customer_email: 'cliente@test.com',
        total_amount: 50.00,
        payment_method: 'cash',
        status: 'pending',
        userId: 1, // ID del usuario admin que creamos antes
        saleDetails: [
          {
            productId: 1,
            quantity: 2,
            unitPrice: 25.00,
            totalPrice: 50.00
          }
        ]
      };
      const saleResponse = await api.post('/sales', sale);
      console.log('Venta creada:', saleResponse.data);
    } catch (error) {
      console.log('Error venta:', error.response?.data || error.message);
    }

    // Verificar datos
    console.log('\n=== Verificación final ===');
    const products = await api.get('/products');
    const suppliers = await api.get('/providers');
    const sales = await api.get('/sales');
    const users = await api.get('/users');

    console.log(`Productos: ${products.data.length}`);
    console.log(`Proveedores: ${suppliers.data.length}`);
    console.log(`Ventas: ${sales.data.length}`);
    console.log(`Usuarios: ${users.data.length}`);

  } catch (error) {
    console.error('Error general:', error.message);
  }
}

testBasicData();
