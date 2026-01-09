import { useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// NOTE: This component assumes that Material-UI and a custom font like 'Bebas Neue'
// are loaded in your main application's HTML file or theme configuration.
// For example, in your index.html head:
// <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap" />
// <script src="https://cdn.tailwindcss.com"></script>

// Create a custom theme for consistency, though we are using 'sx' for most styles.
const theme = createTheme({
    typography: {
        fontFamily: '"Bebas Neue", sans-serif',
    },
    palette: {
        background: {
            default: '#1a202c', // Matches bg-gray-900
        },
        text: {
            primary: '#ffffff',
            secondary: '#d1d5db', // Matches text-gray-300
        },
    },
});

const Login = () => {
    const [, setCookie] = useCookies(['access_token']);
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleFacebookLogin = () => {
        // Redirect to backend
        window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/facebook`;
    };

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.success) {
<<<<<<< HEAD
                    console.log('Login response:', data);
                    console.log('Cookies after login:', document.cookie);
                    // Cookie is automatically set by backend via Set-Cookie header
                    if (data.access_token) {
                        localStorage.setItem('access_token', data.access_token);
                    }
=======
                    console.log(data);
                    // sessionStorage.setItem("access_token", data.access_token);
                    setCookie('access_token', data.access_token,);
>>>>>>> 6c71d2bc8c9dd228fa7fa4e5156a6c9c0f2073ff
                    setMessage('Login successful!');
                    // You would typically redirect the user here or update state
                    setTimeout(() => {
                        navigate('/HomeAfterLogin');
                        window.location.reload();
                    }, 1500)
                } else {
                    setMessage(`Login failed: ${data.message || 'Unknown error'}`);
                }
            } else {
                setMessage(`Login failed: ${data.message || 'Invalid credentials'}`);
            }
        } catch (error) {
            console.error('Login error:', error);
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
                    Log In
                </Typography>
                <Box component="form" onSubmit={handleLogin} sx={{ width: '100%', mt: 2 }}>
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
                            sx={{ transition: 'all 0.2s' }}
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
                            sx={{ transition: 'all 0.2s' }}
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
                        {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Login'}
                    </Button>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', my: 3, width: '100%' }}>
                        <Box sx={{ flex: 1, height: '1px', bgcolor: 'rgba(255,255,255,0.2)' }} />
                        <Typography sx={{ px: 2, color: 'rgba(255,255,255,0.6)', fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem' }}>
                            OR
                        </Typography>
                        <Box sx={{ flex: 1, height: '1px', bgcolor: 'rgba(255,255,255,0.2)' }} />
                    </Box>

                    <Button 
                        onClick={handleFacebookLogin}
                        fullWidth
                        variant="contained"
                        startIcon={
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        }
                        sx={{
                            py: 1.5,
                            borderRadius: '25px',
                            fontWeight: 400,
                            fontFamily: 'Bebas Neue, sans-serif',
                            fontSize: '1.1rem',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            backgroundColor: '#1877F2',
                            color: 'white',
                            border: '1px solid rgba(255,255,255,0.2)',
                            boxShadow: '0 10px 30px rgba(24,119,242,0.35)',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, border-color 0.2s ease',
                            WebkitFontSmoothing: 'antialiased',
                            MozOsxFontSmoothing: 'grayscale',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1,
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 14px 34px rgba(24,119,242,0.5), 0 0 16px rgba(255,255,255,0.32)',
                                backgroundColor: '#2980f2',
                                borderColor: 'rgba(255,255,255,0.45)',
                            },
                            '& .MuiButton-startIcon': {
                                marginRight: 0,
                                marginLeft: 0,
                            },
                        }}
                    >
                        Login with Facebook
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
                            color: message.startsWith('Login successful') ? '#4ade80' : '#f87171',
                        }}
                    >
                        {message}
                    </Typography>
                )}
                <Box mt={3} sx={{ textAlign: 'center' }}>
                    <Button 
                        onClick={() => navigate('/register')} 
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
                        Don't have an account? register here.
                    </Button>
                </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Login;