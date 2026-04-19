// Script para insertar datos de prueba en la API
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Datos de prueba para productos
const testProducts = [
  {
    name: 'Arroz Blanco',
    description: 'Arroz blanco de grano largo, calidad premium',
    price: 25.50,
    stock: 100,
    category: 'Granos'
  },
  {
    name: 'Leche Entera',
    description: 'Leche entera pasteurizada 1L',
    price: 18.75,
    stock: 50,
    category: 'Lácteos'
  },
  {
    name: 'Pan Integral',
    description: 'Pan integral fresco, 500g',
    price: 12.00,
    stock: 30,
    category: 'Panadería'
  }
];

// Datos de prueba para proveedores
const testSuppliers = [
  {
    name: 'Distribuidora Nacional',
    company: 'Distribuidora Nacional S.A.',
    email: 'contacto@distnacional.com',
    phone: '+57 1 2345678',
    address: 'Calle 100 #45-67, Bogotá'
  },
  {
    name: 'Alimentos del Campo',
    company: 'Alimentos del Campo Ltda.',
    email: 'info@alimentoscampo.com',
    phone: '+57 2 3456789',
    address: 'Av. Siempre Viva 123, Medellín'
  }
];

// Datos de prueba para usuarios
const testUsers = [
  {
    name: 'Administrador Sistema',
    email: 'admin@marketsoft.com',
    password: 'admin123',
    role: 'admin',
    phone: '+57 1 1112222'
  },
  {
    name: 'Cajero Principal',
    email: 'cajero@marketsoft.com',
    password: 'cajero123',
    role: 'user',
    phone: '+57 1 3334444'
  }
];

// Datos de prueba para ventas
const testSales = [
  {
    customer_name: 'Juan Pérez',
    customer_email: 'juan.perez@email.com',
    total_amount: 150.75,
    payment_method: 'cash',
    status: 'completed'
  },
  {
    customer_name: 'María García',
    customer_email: 'maria.garcia@email.com',
    total_amount: 89.50,
    payment_method: 'card',
    status: 'completed'
  },
  {
    customer_name: 'Carlos Rodríguez',
    customer_email: 'carlos.rodriguez@email.com',
    total_amount: 220.00,
    payment_method: 'transfer',
    status: 'pending'
  }
];

// Función para insertar datos de prueba
async function insertTestData() {
  console.log('Iniciando inserción de datos de prueba...');

  try {
    // Insertar productos
    console.log('\n=== Insertando Productos ===');
    for (const product of testProducts) {
      try {
        const response = await api.post('/products', product);
        console.log(`Producto creado: ${product.name} (ID: ${response.data.id})`);
      } catch (error) {
        console.log(`Error al crear producto ${product.name}:`, error.response?.data?.message || error.message);
      }
    }

    // Insertar proveedores
    console.log('\n=== Insertando Proveedores ===');
    for (const supplier of testSuppliers) {
      try {
        const response = await api.post('/providers', supplier);
        console.log(`Proveedor creado: ${supplier.name} (ID: ${response.data.id})`);
      } catch (error) {
        console.log(`Error al crear proveedor ${supplier.name}:`, error.response?.data?.message || error.message);
      }
    }

    // Insertar usuarios
    console.log('\n=== Insertando Usuarios ===');
    for (const user of testUsers) {
      try {
        const response = await api.post('/users', user);
        console.log(`Usuario creado: ${user.name} (ID: ${response.data.id})`);
      } catch (error) {
        console.log(`Error al crear usuario ${user.name}:`, error.response?.data?.message || error.message);
      }
    }

    // Insertar ventas
    console.log('\n=== Insertando Ventas ===');
    for (const sale of testSales) {
      try {
        const response = await api.post('/sales', sale);
        console.log(`Venta creada: ${sale.customer_name} (ID: ${response.data.id})`);
      } catch (error) {
        console.log(`Error al crear venta ${sale.customer_name}:`, error.response?.data?.message || error.message);
      }
    }

    console.log('\n=== Inserción de datos de prueba completada ===');

  } catch (error) {
    console.error('Error general:', error.message);
  }
}

// Función para verificar datos
async function verifyData() {
  console.log('\n=== Verificando datos insertados ===');

  try {
    // Verificar productos
    const productsResponse = await api.get('/products');
    console.log(`Productos encontrados: ${productsResponse.data.length}`);
    productsResponse.data.forEach(p => console.log(`- ${p.name}: $${p.price} (${p.stock} unidades)`));

    // Verificar proveedores
    const suppliersResponse = await api.get('/providers');
    console.log(`\nProveedores encontrados: ${suppliersResponse.data.length}`);
    suppliersResponse.data.forEach(s => console.log(`- ${s.name} (${s.company})`));

    // Verificar usuarios
    const usersResponse = await api.get('/users');
    console.log(`\nUsuarios encontrados: ${usersResponse.data.length}`);
    usersResponse.data.forEach(u => console.log(`- ${u.name} (${u.email}) - ${u.role}`));

    // Verificar ventas
    const salesResponse = await api.get('/sales');
    console.log(`\nVentas encontradas: ${salesResponse.data.length}`);
    salesResponse.data.forEach(s => console.log(`- ${s.customer_name}: $${s.total_amount} (${s.status})`));

  } catch (error) {
    console.error('Error al verificar datos:', error.message);
  }
}

// Ejecutar el script
async function main() {
  await insertTestData();
  await verifyData();
}

// Ejecutar el script
main().catch(console.error);

export { insertTestData, verifyData };
