import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserSuccess } from '../store/features/userSlice'
import { authService } from '../services/authService'

export default function AuthProvider({ children }) {
    const dispatch = useDispatch()
    const { token, isAuthenticated } = useSelector(state => state.auth)

    useEffect(() => {
        // Si on a un token mais pas les données utilisateur, on les récupère
        const initializeAuth = async () => {
            if (token && isAuthenticated) {
                try {
                    const userProfile = await authService.getUserProfile(token)
                    dispatch(getUserSuccess({
                        firstName: userProfile.body.firstName,
                        lastName: userProfile.body.lastName,
                        email: userProfile.body.email
                    }))
                } catch (error) {
                    // Si le token est invalide, on peut le gérer ici
                    console.error('Failed to restore session:', error)
                }
            }
        }

        initializeAuth()
    }, [dispatch, token, isAuthenticated])

    return children
} 