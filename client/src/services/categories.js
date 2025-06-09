import axios from 'axios'

const API_URL = 'http://localhost:8080/categories'

// Get all categories
export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}

// Search categories
export const searchCategories = async (keyword) => {
  try {
    const response = await axios.get(`${API_URL}/search?keyword=${keyword}`)
    return response.data
  } catch (error) {
    console.error('Error searching categories:', error)
    throw error
  }
}

// Create category
export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(API_URL, categoryData)
    return response.data
  } catch (error) {
    console.error('Error creating category:', error)
    throw error
  }
}

// Update category
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, categoryData)
    return response.data
  } catch (error) {
    console.error('Error updating category:', error)
    throw error
  }
}

// Delete category
export const deleteCategory = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`)
  } catch (error) {
    console.error('Error deleting category:', error)
    throw error
  }
}