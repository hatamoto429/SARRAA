import axios from 'axios'

const API_TO_DATABASE = 'http://localhost:5002'
const API_TO_MODEL = ''

export async function fetchUserData() {
  try {
    const response = await fetch(`${API_BASE_URL}account`)
    if (!response.ok) {
      throw new Error('Failed to fetch account data')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching account data:', error)
    throw error
  }
}
