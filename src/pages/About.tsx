import { Box, Typography } from '@mui/material'
import React from 'react'

const About: React.FC = () => {
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
          maxWidth: '1200px',
          margin: '0 auto',
          px: { xs: 2, md: '11vw' },
          py: { xs: 6, md: 10 },
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Box sx={{ position: 'relative', display: 'inline-block', mb: 4 }}>
          {/* Main text */}
          <Typography
            sx={{
              textAlign: 'left',
              fontSize: { xs: '12vw', md: '6vw' },
              fontFamily: 'Bebas Neue, sans-serif',
              letterSpacing: { xs: '2px', md: '3px' },
              lineHeight: 1.1,
              fontWeight: 400,
              textTransform: 'uppercase',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              color: '#fff',
            }}
          >
            LET YOUR VOICE PAINT THE UNSEEN
          </Typography>

          {/* Reflection shadow */}
          <Typography
            sx={{
              textAlign: 'left',
              fontSize: { xs: '12vw', md: '6vw' },
              fontFamily: 'Bebas Neue, sans-serif',
              letterSpacing: { xs: '2px', md: '3px' },
              lineHeight: 1.1,
              fontWeight: 400,
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.1)',
              transform: 'scaleY(-1)',
              opacity: 0.3,
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
            }}
          >
            LET YOUR VOICE PAINT THE UNSEEN
          </Typography>
        </Box>

        <Typography
          sx={{
            textAlign: 'left',
            color: '#fff',
            fontSize: { xs: '2.5rem', md: '3rem' },
            fontFamily: 'Bebas Neue, sans-serif',
            fontWeight: 400,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            mb: 2,
          }}
        >
          About Us
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Box
            sx={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)',
              borderRadius: 3,
              padding: { xs: 3, md: 4 },
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
            }}
          >
            <Typography
              sx={{
                textAlign: "left",
                fontSize: { xs: '1rem', md: '1.25rem' },
                color: "#dfe7ff",
                fontFamily: 'Poppins, sans-serif',
                lineHeight: 1.6,
                fontWeight: 300,
                letterSpacing: '0.3px',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
              }}
            >
              At Echoshape, we believe in the power of sound and data to create transformative digital experiences. <br />
              Our passion lies in reshaping how audio is understood and interacted with,<br />
              pushing the boundaries of technology to craft the most innovative and intuitive digital products.<br />
              we're on a mission to design the world we've always envisioned — <br />
              where sound and technology converge in ways never seen before. <br /><br />
              — The Echoshape Team
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default About
