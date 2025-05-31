import axios from 'axios'

// TODO: If necessary - transform now manual checks, on submit button, into automated execution on content changes
// Current: on handle auth, injection attacks can only cause harm on submitting the malicious request to the db procedure
// But: XSS can happen on live rendering before submission

// Hosted Model Endpoint
const MODEL_URL = 'http://127.0.0.1:8001'

// General-purpose check for text inputs (username, password, etc.)
export async function checkDynamicContent(text) {
  try {
    const response = await axios.post(
      `${MODEL_URL}/predict`,
      { text },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    )

    return response.data?.prediction || 'safe'
  } catch (err) {
    console.error('Prediction error:', err)
    return 'safe' // Fallback to safe
  }
}

export default checkDynamicContent
