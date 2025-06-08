import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  getCategories,
  searchCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '../services/categories.js';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', id: '' });
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle search with debounce
  useEffect(() => {
    if (searchTerm.trim() === '') {
      fetchCategories();
      return;
    }

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      performSearch(searchTerm);
    }, 500);

    setSearchTimeout(timeout);

    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTerm]);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const data = await getCategories();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const performSearch = async (keyword) => {
    try {
      setIsLoading(true);
      const data = await searchCategories(keyword);
      setCategories(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.name || !newCategory.id) {
      setError('Both name and ID are required');
      return;
    }

    try {
      setIsLoading(true);
      const createdCategory = await createCategory({
        id: parseInt(newCategory.id),
        name: newCategory.name
      });
      setCategories([...categories, createdCategory]);
      setNewCategory({ name: '', id: '' });
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      setIsLoading(true);
      await deleteCategory(id);
      setCategories(categories.filter(cat => cat.id !== id));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory({...category});
  };

  const handleSaveEdit = async () => {
    if (!editingCategory.name) {
      setError('Category name is required');
      return;
    }

    try {
      setIsLoading(true);
      const updatedCategory = await updateCategory(editingCategory.id, {
        name: editingCategory.name
      });
      setCategories(categories.map(cat => 
        cat.id === updatedCategory.id ? updatedCategory : cat
      ));
      setEditingCategory(null);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-2xl text-gray-700 font-bold mb-6">Category Management</h1>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {/* Add New Category Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
            <input
              type="text"
              className="w-full p-2 border text-gray-700 border-gray-300 rounded-md"
              placeholder="Enter category name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
            <input
              type="number"
              className="w-full p-2 border text-gray-700 border-gray-300 rounded-md"
              value={newCategory.id}
              onChange={(e) => setNewCategory({...newCategory, id: e.target.value})}
            />
          </div>
        </div>
        <button
          onClick={handleAddCategory}
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? 'Adding...' : 'Add Category'}
        </button>
      </div>
      
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border text-gray-700 border-gray-300 rounded-md"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {/* Categories Table */}
      {!isLoading && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button 
                        onClick={() => handleEdit(category)}
                        disabled={isLoading}
                        className="text-blue-600 hover:text-blue-800 mr-3 disabled:opacity-50"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(category.id)}
                        disabled={isLoading}
                        className="text-red-600 hover:text-red-800 disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white text-gray-700 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Edit Category</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={editingCategory.name}
                onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                value={editingCategory.id}
                readOnly
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setEditingCategory(null)}
                disabled={isLoading}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;

