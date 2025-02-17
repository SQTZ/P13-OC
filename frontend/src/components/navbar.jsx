import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/features/authSlice'

export default function Navbar() {
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector(state => state.auth)
    const { firstName } = useSelector(state => state.user)

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src="./img/argentBankLogo.png"
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {isAuthenticated ? (
                    <div className="main-nav-items">
                        <Link to="/user" className="main-nav-item">
                            <i className="fa fa-user-circle"></i>
                            {firstName}
                        </Link>
                        <button onClick={handleLogout} className="main-nav-item">
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <Link to="/signin" className="main-nav-item">
                        <i className="fa fa-user-circle"></i>
                        Sign In
                    </Link>
                )}
            </div>
        </nav>
    )
}