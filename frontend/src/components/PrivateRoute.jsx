import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useSelector(state => state.auth)
  const { loading: userLoading } = useSelector(state => state.user)
  const location = useLocation()

  // Si on est en train de charger, on peut afficher un spinner
  if (loading || userLoading) {
    return <div>Loading...</div>
  }

  // Si l'utilisateur n'est pas authentifié et qu'il essaie d'accéder à une route protégée
  if (!isAuthenticated && location.pathname === '/user') {
    return <Navigate to="/" />
  }

  return children
}

// Ajout de la validation des props
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
}