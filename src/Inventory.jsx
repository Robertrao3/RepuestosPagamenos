// src/Inventory.jsx
import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: ''
  });

  // Fetch inventory from Firebase
  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'inventory'));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setInventory(items);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      setLoading(false);
    }
  };

  // Add new item
  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'inventory'), {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        createdAt: new Date()
      });
      setFormData({ name: '', category: '', price: '', stock: '', description: '' });
      fetchInventory(); // Refresh the list
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'inventory', id));
      fetchInventory();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Cargando inventario...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      <h2 className="text-4xl font-bold mb-8 text-center text-[#1a1a2e]">Inventario</h2>

      {/* Add Item Form */}
      <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
        <h3 className="text-2xl font-semibold mb-4 text-[#e94560]">Agregar Nuevo Repuesto</h3>
        <form onSubmit={handleAddItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nombre del repuesto"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Categoría"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
            className="p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Precio"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
            className="p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Stock disponible"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            required
            className="p-3 border border-gray-300 rounded-lg"
          />
          <textarea
            placeholder="Descripción"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="p-3 border border-gray-300 rounded-lg md:col-span-2"
            rows="3"
          />
          <button
            type="submit"
            className="md:col-span-2 bg-[#e94560] text-white py-3 rounded-lg hover:bg-[#d63651] transition-colors"
          >
            Agregar Repuesto
          </button>
        </form>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventory.length === 0 ? (
          <p className="col-span-3 text-center text-gray-500">No hay repuestos en el inventario.</p>
        ) : (
          inventory.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-[#1a1a2e] mb-2">{item.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{item.category}</p>
              <p className="text-gray-700 mb-4">{item.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-[#e94560]">${item.price}</span>
                <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                  Stock: {item.stock}
                </span>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Inventory;