import axios from 'axios'

// TODO: If necessary - transform now manual checks, on submit button, into automated execution on content changes
// Current: on handle auth, injection attacks can only cause harm on submitting the malicious request to the db procedure
// But: XSS can happen on live rendering before submission

// REFACTOR: Three endpoints to One => Gather all input data and check all of them in sequence then allow or block on success

// Model Endpoint
const MODEL_URL = 'http://sarraa-hosted-model/api'
// const MODEL_URL = import.meta.env.SARRAA_API_URL

// Model - Check username and password [SQLi, XSS]
export async function checkUserInput({ username, password }) {
  try {
    const res = await axios.post(`${MODEL_URL}/check-sqli-xss`, {
      username,
      password,
    })
    return res.data?.status || 'safe'
  } catch (err) {
    console.error('Model error (input check):', err)
    return 'safe' // TESTING DEFAULT
  }
}

// Model - Check URL parameters [SLQi, XSS]
export async function checkUrlParams(params) {
  try {
    const res = await axios.post(`${MODEL_URL}/check-url`, params)
    return res.data?.status || 'safe'
  } catch (err) {
    console.error('Model error (URL param check):', err)
    return 'safe'
  }
}

// Model - Check dynamic content injection [SLQi, XSS]
export async function checkDynamicContent(content) {
  try {
    const res = await axios.post(`${MODEL_URL}/check-dynamic`, { content })
    return res.data?.status || 'safe'
  } catch (err) {
    console.error('Model error (dynamic check):', err)
    return 'safe'
  }
}

export default { checkUserInput, checkUrlParams, checkDynamicContent }
