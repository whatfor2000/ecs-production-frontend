import { useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const theme = createTheme({
  typography: {
    fontFamily: '"Bebas Neue", sans-serif',
  },
  palette: {
    background: {
      default: '#1a202c',
    },
    text: {
      primary: '#ffffff',
      secondary: '#d1d5db',
    },
  },
});

const Register = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleRegister = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.success) {
          setMessage('Registration successful! You can now log in.');
          setTimeout(() => navigate('/login'), 1000); // Redirect to login after success
        } else {
          setMessage(`Registration failed: ${data.message || 'Unknown error'}`);
        }
      } else {
        setMessage(`Registration failed: ${data.message || 'Invalid data'}`);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage('Network error or server unreachable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'radial-gradient(circle at 20% 20%, rgba(135,0,73,0.25), transparent 35%), radial-gradient(circle at 80% 0%, rgba(0,62,135,0.35), transparent 30%), linear-gradient(135deg, #05070d 0%, #0d0f1a 60%, #0a0c13 100%)',
          color: '#fff',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          pt: { xs: 12, md: 16 },
          pb: { xs: 4, md: 6 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '500px',
            p: { xs: 3, md: 4 },
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'white',
            mx: { xs: 2, md: 0 },
          }}
        >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 400,
            textAlign: 'center',
            mb: { xs: 2, md: 3 },
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: { xs: '2rem', md: '3rem' },
            letterSpacing: '2px',
            textTransform: 'uppercase',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          }}
        >
          Register
        </Typography>
        <Box component="form" onSubmit={handleRegister} sx={{ width: '100%', mt: 2 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1, fontFamily: 'Poppins, sans-serif', fontSize: '0.95rem', fontWeight: 500 }}>
              Email
            </Typography>
            <TextField
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                sx: {
                  color: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  fontFamily: 'Poppins, sans-serif',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2b6bff',
                  },
                },
              }}
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1, fontFamily: 'Poppins, sans-serif', fontSize: '0.95rem', fontWeight: 500 }}>
              Username
            </Typography>
            <TextField
              type="text"
              fullWidth
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              InputProps={{
                sx: {
                  color: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  fontFamily: 'Poppins, sans-serif',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2b6bff',
                  },
                },
              }}
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1, fontFamily: 'Poppins, sans-serif', fontSize: '0.95rem', fontWeight: 500 }}>
              Password
            </Typography>
            <TextField
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                sx: {
                  color: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  fontFamily: 'Poppins, sans-serif',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2b6bff',
                  },
                },
              }}
            />
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              py: 1.5,
              borderRadius: '25px',
              fontWeight: 400,
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '1.1rem',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              boxShadow: '0 12px 30px rgba(43,107,255,0.35), inset 0 1px 0 rgba(255,255,255,0.22)',
              mt: 2,
              backgroundColor: '#2b6bff',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.2)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, border-color 0.2s ease',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 14px 34px rgba(43,107,255,0.5), 0 0 16px rgba(255,255,255,0.32)',
                backgroundColor: '#3976ff',
                borderColor: 'rgba(255,255,255,0.45)',
              },
              '&.Mui-disabled': {
                background: 'rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.5)',
              },
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Register'}
          </Button>
        </Box>
        {message && (
          <Typography
            variant="body2"
            sx={{
              mt: 2,
              textAlign: 'center',
              fontWeight: 500,
              fontFamily: 'Poppins, sans-serif',
              color: message.startsWith('Registration successful') ? '#4ade80' : '#f87171',
            }}
          >
            {message}
          </Typography>
        )}
        <Box mt={3} sx={{textAlign: 'center'}}>
          <Button 
            onClick={() => navigate('/login')} 
            sx={{ 
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '0.9rem',
              textTransform: 'none',
              '&:hover': {
                color: '#fff',
                backgroundColor: 'rgba(255,255,255,0.05)',
              },
            }}
          >
            Already have an account? Login here.
          </Button>
        </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Register;
