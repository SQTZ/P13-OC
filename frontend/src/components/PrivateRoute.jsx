import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useSelector(state => state.auth)
  const { loading: userLoading } = useSelector(state => state.user)

  // Si on est en train de charger, on peut afficher un spinner
  if (loading || userLoading) {
    return <div>Loading...</div> // Ou votre composant de chargement
  }

  return isAuthenticated ? children : <Navigate to="/signin" />
} 