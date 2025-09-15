import axios from 'axios'

// Hosted Model Endpoint
const MODEL_URL = 'http://127.0.0.1:8001'
// Model Expose to VM for Testing
//const MODEL_URL = 'http://192.168.0.2:8001'

// General-purpose check for text inputs (username, password, etc.)
export async function checkDynamicContent(text) {
  try {
    const response = await axios.post(
      `${MODEL_URL}/predict`,
      { text },
      { headers: { 'Content-Type': 'application/json' } },
    )

    return response.data?.prediction || 'benign'
  } catch (err) {
    console.error('Prediction error:', err)
    return 'malicious' // Fallback: Malicious - Deny by Default
  }
}

export default checkDynamicContent
