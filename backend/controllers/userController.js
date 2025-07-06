import { getUserProfile, loadUserData, updateUserProfile } from '../models/userModel.js'

/* === VULNERABLE FETCH USER PROFILE === */
export const fetchUserProfile = (req, res) => {
  const { username } = req.params
  getUserProfile(username, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' })
    if (results.length === 0) return res.status(404).json({ message: 'User not found' })
    res.status(200).json(results[0])
  })
}

/* === VULNERABLE LOAD USER DATA === */
export const fetchUserData = (req, res) => {
  const { username } = req.params
  loadUserData(username, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' })
    if (results.length === 0) return res.status(404).json({ message: 'User data not found' })
    res.status(200).json(results[0])
  })
}

/* === VULNERABLE SAVE USER PROFILE === */
export const saveUserProfile = (req, res) => {
  const { username } = req.params
  const updatedData = req.body
  updateUserProfile(username, updatedData, (err) => {
    if (err) return res.status(500).json({ message: 'Database update error', error: err.message })
    res.status(200).json({ message: 'Profile updated successfully' })
  })
}
