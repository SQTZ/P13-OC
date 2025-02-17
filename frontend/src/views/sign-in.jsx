import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginStart, loginSuccess, loginFailure } from '../store/features/authSlice'
import { getUserSuccess } from '../store/features/userSlice'
import { authService } from '../services/authService'

export default function SignIn() {
    // États locaux pour le formulaire
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)

    // Hooks Redux et React Router
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error } = useSelector(state => state.auth)

    // Gestionnaire de soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            // Début de la tentative de connexion
            dispatch(loginStart())
            
            // Appel à l'API pour la connexion
            const response = await authService.login(email, password)
            
            // Si la connexion réussit, on stocke le token
            dispatch(loginSuccess(response.body.token))
            
            // Récupération du profil utilisateur
            const userProfile = await authService.getUserProfile(response.body.token)
            
            // Mise à jour des données utilisateur dans Redux
            dispatch(getUserSuccess({
                firstName: userProfile.body.firstName,
                lastName: userProfile.body.lastName,
                email: userProfile.body.email
            }))

            // Si "Remember me" est coché, on peut sauvegarder des informations supplémentaires
            if (remember) {
                localStorage.setItem('userEmail', email)
            }

            // Redirection vers la page profil
            navigate('/user')
            
        } catch (error) {
            // En cas d'erreur, on dispatch l'erreur
            dispatch(loginFailure(error.message))
        }
    }

    return (
        <div>
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="username"
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                            />
                        </div>
                        <div className="input-remember">
                            <input 
                                type="checkbox" 
                                id="remember-me"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                            />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        
                        {/* Affichage des erreurs */}
                        {error && (
                            <div className="error-message" role="alert">
                                {error}
                            </div>
                        )}
                        
                        {/* Bouton de connexion */}
                        <button 
                            type="submit" 
                            className="sign-in-button"
                            disabled={loading}
                        >
                            {loading ? 'Connexion en cours...' : 'Sign In'}
                        </button>
                    </form>
                </section>
            </main>
        </div>
    )
}