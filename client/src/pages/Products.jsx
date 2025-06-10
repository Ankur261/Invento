import { useEffect, useState } from 'react';
import fetchData from '../services/fetch';

const getStockBadgeColor = (stock) => {
  if (stock === 0) return 'bg-red-200 text-red-800';
  if (stock < 5) return 'bg-yellow-200 text-yellow-800';
  return 'bg-green-200 text-green-800';
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', stock: '' });

  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [orderError, setOrderError] = useState('');

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "";

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchData('http://localhost:8080/products');
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:8080/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts((prev) => prev.filter((product) => product.id !== id));
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
        }),
      });

      if (response.ok) {
        resetModal();
        loadProducts();
      } else {
        const error = await response.text();
        alert('Error: ' + error);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleEditClick = (product) => {
    setIsEditing(true);
    setEditingProductId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
    });
    setShowModal(true);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/products/${editingProductId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
        }),
      });

      if (response.ok) {
        resetModal();
        loadProducts();
      } else {
        const error = await response.text();
        alert('Error: ' + error);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const resetModal = () => {
    setFormData({ name: '', price: '', stock: '' });
    setIsEditing(false);
    setEditingProductId(null);
    setShowModal(false);
  };

  const openOrderModal = (product) => {
    setSelectedProduct(product);
    setOrderQuantity(1);
    setOrderError('');
    setOrderModalOpen(true);
  };

  const handlePlaceOrder = async () => {
    if (orderQuantity > selectedProduct.stock) {
      setOrderError('Quantity exceeds available stock!');
      return;
    }

    const orderPayload = {
      userId: user?.id || 1,
      productId: selectedProduct.id,
      quantity: orderQuantity,
      totalPrice: selectedProduct.price * orderQuantity,
      orderDate: new Date().toISOString().split('T')[0], // "YYYY-MM-DD"
    };


    try {
      const response = await fetch('http://localhost:8080/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      if (response.ok) {
        setOrderModalOpen(false);
        loadProducts();
      } else {
        const err = await response.text();
        setOrderError('Failed to place order: ' + err);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setOrderError('Something went wrong.');
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.trim().toLowerCase().startsWith(searchTerm.trim().toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        {role === 'ADMIN' && (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={() => {
              setIsEditing(false);
              setFormData({ name: '', price: '', stock: '' });
              setShowModal(true);
            }}
          >
            Add Product
          </button>
        )}
      </div>

      <input
        type="text"
        placeholder="Search products by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 mb-6 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-400 text-gray-800"
      />

      <div className="overflow-x-auto bg-white rounded shadow-sm">
        <table className="min-w-full text-left text-sm text-gray-800">
          <thead className="bg-gray-200 text-gray-800 font-semibold">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.category}</td>
                  <td className="px-4 py-2">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStockBadgeColor(product.stock)}`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    {role === "ADMIN" ? (
                      <>
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={() => handleEditClick(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <button
                        disabled={product.stock === 0}
                        className={`px-3 py-1 rounded ${product.stock === 0
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                          }`}
                        onClick={() => openOrderModal(product)}
                      >
                        Order
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center px-4 py-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="text-black fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form
              onSubmit={isEditing ? handleUpdateProduct : handleAddProduct}
              autoComplete="off"
              className="space-y-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded"
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={resetModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {isEditing ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Modal */}
      {orderModalOpen && (
        <div className="text-black fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-4">Order: {selectedProduct?.name}</h2>

            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold">Available Stock:</label>
                <span>{selectedProduct?.stock}</span>
              </div>

              <div>
                <label className="block mb-1 font-semibold">Quantity:</label>
                <input
                  type="number"
                  value={orderQuantity}
                  min={1}
                  max={selectedProduct?.stock}
                  onChange={(e) => setOrderQuantity(parseInt(e.target.value))}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>

              {orderError && (
                <div className="text-red-500 text-sm">{orderError}</div>
              )}

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setOrderModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
