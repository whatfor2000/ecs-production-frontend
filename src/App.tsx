import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Function from './pages/Function'
import About from './pages/About'
import { Box } from '@mui/material'
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthProvider, AuthContext } from './AuthContext'
import FacebookRedirect from './pages/FacebookRedirect'
import SubscriptionPage from './pages/SubscriptionPage'
import Profile from './pages/Profile'
import Explore from './pages/HomeAfterLogin'

function App() {
  return (
    <AuthProvider>

      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        minWidth="100vw"
        sx={{
          backgroundImage: 'url(./images/bg.png)', // Or use direct link
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: '#333', // Set text color to match background
        }}
      >
        <Header />
        <Box sx={{ flexGrow: 1, pt: { xs: '70px', md: '80px' } }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/function" element={<Function />} />
            <Route path="/about" element={<About />} />
            <Route path="/#_=_" element={<FacebookRedirect />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/HomeAfterLogin" element={<Explore />} />
          </Routes>
        </Box>
      </Box>
    </AuthProvider>
  )
}

export default App
