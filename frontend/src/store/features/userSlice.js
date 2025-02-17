import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  loading: false,
  error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Début du chargement des données utilisateur
    getUserStart: (state) => {
      state.loading = true
      state.error = null
    },
    // Données utilisateur reçues avec succès
    getUserSuccess: (state, action) => {
      state.loading = false
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.email = action.payload.email
    },
    // Échec du chargement des données utilisateur
    getUserFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    // Mise à jour du profil
    updateProfileSuccess: (state, action) => {
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
    },
    // Ajout d'un reducer pour réinitialiser l'état
    resetUser: () => {
      return initialState
    }
  }
})

export const { 
  getUserStart, 
  getUserSuccess, 
  getUserFailure,
  updateProfileSuccess,
  resetUser 
} = userSlice.actions
export default userSlice.reducer 