import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ImageComponent from '../components/Images'
import { NavLink } from 'react-router-dom'
import Cookies from 'js-cookie'

const Home: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const token = Cookies.get('access_token')
    setIsLogin(() => {
      if (!token) return false
      return true
    })

  }, [])


  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at 20% 20%, rgba(135,0,73,0.25), transparent 35%), radial-gradient(circle at 80% 0%, rgba(0,62,135,0.35), transparent 30%), linear-gradient(135deg, #05070d 0%, #0d0f1a 60%, #0a0c13 100%)',
        color: '#fff',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          px: { xs: 2, md: 4, lg: 6 },
          py: { xs: 6, md: 10 },
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
          <Box
            sx={{
              width: '100%',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <Typography
              component="div"
              sx={{
                textAlign: 'left',
                fontFamily: 'Bebas Neue, sans-serif',
                letterSpacing: { xs: '3px', md: '5px', lg: '6px' },
                lineHeight: 1,
                fontWeight: 400,
                textTransform: 'uppercase',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                background: 'linear-gradient(135deg, #ffffff 0%, #dfe7ff 50%, #ffffff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                whiteSpace: 'nowrap',
                textShadow: '0 0 40px rgba(255,255,255,0.1)',
                fontSize: { xs: 'clamp(2rem, 7vw, 5rem)', md: 'clamp(3rem, 5.5vw, 7rem)', lg: 'clamp(3.5rem, 4.5vw, 8rem)' },
                position: 'relative',
                display: 'inline-block',
                width: '100%',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-8px',
                  left: 0,
                  width: '100px',
                  height: '4px',
                  background: 'linear-gradient(90deg, #2b6bff, transparent)',
                  borderRadius: '2px',
                },
              }}
            >
              LET YOUR VOICE PAINT THE UNSEEN
            </Typography>
          </Box>

          <Typography
            sx={{
              textAlign: 'left',
              fontSize: { xs: '0.9rem', md: '1.25rem' },
              color: '#dfe7ff',
              fontFamily: 'Poppins, sans-serif',
              lineHeight: 1.6,
              maxWidth: { xs: '100%', md: '100%' },
              fontWeight: 300,
              letterSpacing: '0.3px',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            }}
          >
            Transform your voice into stunning AI-generated soundscapes and visuals. <br />
            Create immersive audio and visual experiences from your recordings.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: 'repeat(1, minmax(0, 1fr))',
              sm: 'repeat(2, minmax(0, 1fr))',
              md: 'repeat(4, minmax(0, 1fr))'
            },
            gap: { xs: 2, md: 3 },
            width: '100%',
          }}
        >
          {[1, 2, 3, 4].map((index) => (
            <Box
              key={index}
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                width: '100%',
                boxSizing: 'border-box',
                "&:hover": {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.45)',
                },
              }}
            >
            
              <ImageComponent
                height={'auto'}
                width={'100%'}
                src={`./images/image${index}.png`}
                alt={`Image ${index}`}
                title={''}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default Home
