import { createSlice } from '@reduxjs/toolkit'

// État initial de l'authentification
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'), // Vérifie si le token existe
  loading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Début de la tentative de connexion
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    // Connexion réussie
    loginSuccess: (state, action) => {
      state.isAuthenticated = true
      state.token = action.payload
      state.loading = false
      localStorage.setItem('token', action.payload) // Sauvegarde le token
    },
    // Échec de la connexion
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    // Déconnexion
    logout: (state) => {
      state.isAuthenticated = false
      state.token = null
      localStorage.removeItem('token') // Supprime le token
    }
  }
})

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions
export default authSlice.reducer 