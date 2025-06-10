import { useEffect, useState } from 'react';
import fetchData from '../../services/fetch';

const getStockBadgeColor = (stock) => {
  if (stock === 0) return 'bg-red-200 text-red-800';
  if (stock < 5) return 'bg-yellow-200 text-yellow-800';
  return 'bg-green-200 text-green-800';
};

export default function UserProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['Electronics', 'Clothing', 'Books']);
  const [searchCategory, setSearchCategory] = useState('');
  const [searchText, setSearchText] = useState('');

  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [orderError, setOrderError] = useState('');

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "";

  useEffect(() => {
    loadProducts();
    loadCategories();
    console.log(categories)
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchData('http://localhost:8080/products');
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await fetchData('http://localhost:8080/categories');
      
      setCategories(data);
      
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
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
      userId: user.id,
      productId: selectedProduct.id,
      quantity: orderQuantity,
      totalPrice: selectedProduct.price * orderQuantity,
      orderDate: new Date().toISOString(),
    };

    try {
      const response = await fetch(`http://localhost:8080/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      if (response.ok) {
        setOrderModalOpen(false);
        loadProducts(); // Refresh product stock
      } else {
        const err = await response.text();
        setOrderError('Failed to place order: ' + err);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setOrderError('Something went wrong.');
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = searchCategory === '' || product.category === searchCategory;
    const matchesName = product.name.toLowerCase().startsWith(searchText.toLowerCase());
    return matchesCategory && matchesName;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="px-4 py-2 w-full md:w-1/3 border border-gray-300 rounded shadow-sm text-gray-800"
        />
        {/* <select
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="px-4 py-2 w-full md:w-1/3 border border-gray-300 rounded shadow-sm text-gray-800"
        >
          <option value="">All Categories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select> */}
      </div>

      {/* Product Table */}
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
                  <td className="px-4 py-2">₹{product.price.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStockBadgeColor(product.stock)}`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => openOrderModal(product)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      disabled={product.stock === 0}
                    >
                      Order
                    </button>
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

      {/* Order Modal */}
      {orderModalOpen && selectedProduct && (
        <div className="tetx-black fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Place Order</h2>
            <div className="mb-3">
              <label className="block font-semibold">Quantity</label>
              <input
                type="number"
                min={1}
                value={orderQuantity}
                onChange={(e) => setOrderQuantity(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
              {orderError && <p className="text-red-600 mt-1 text-sm">{orderError}</p>}
            </div>
            <p className="font-semibold mb-4">Total: {(selectedProduct.price * orderQuantity).toFixed(2)}</p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={() => setOrderModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
