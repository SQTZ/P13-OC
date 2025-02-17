import { Routes, Route } from 'react-router-dom'
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import SignIn from './views/sign-in'
import User from './views/user'
import Home from './views/home'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route 
            path="/user" 
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            } 
          />
        </Routes>
      <Footer />
    </>
  )
}

export default App
