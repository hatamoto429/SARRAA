import { getUserProfile, updateUserProfile } from '../models/userModel.js'

export const fetchUserProfile = (req, res) => {
  const { username } = req.params
  try {
    getUserProfile(username, (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' })
      if (results.length === 0) return res.status(404).json({ message: 'User not found' })

      res.status(200).json(results[0])
    })
  } catch (error) {
    console.log('getUserProfile failed:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

export const saveUserProfile = (req, res) => {
  const { username } = req.params
  const updatedData = req.body

  console.log(updatedData)

  try {
    updateUserProfile(username, updatedData, (err, result) => {
      if (err) {
        console.error('Database update error:', err) // Log full error
        return res.status(500).json({ message: 'Database update error', error: err.message })
      }

      res.status(200).json({ message: 'Profile updated successfully' })
    })
  } catch (error) {
    console.error('saveUserProfile failed:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
