// URL de base de l'API
const API_URL = 'http://localhost:3001/api/v1/user'

// Service pour gérer les appels API liés à l'authentification
export const authService = {
  // Fonction de connexion
  async login(email, password) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Login failed')
    }
    
    return data
  },

  // Fonction pour obtenir le profil utilisateur
  async getUserProfile(token) {
    const response = await fetch(`${API_URL}/profile`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to get user profile')
    }
    
    return data
  },

  // Fonction pour mettre à jour le profil
  async updateUserProfile(token, firstName, lastName) {
    const response = await fetch(`${API_URL}/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName }),
    })
    
    if (!response.ok) {
      throw new Error('Failed to update profile')
    }
    
    return await response.json()
  },

  async checkToken(token) {
    try {
      const response = await this.getUserProfile(token)
      return response.status === 200
    } catch (error) {
      return false
    }
  }
} 