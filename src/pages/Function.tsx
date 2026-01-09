import React, { useState, useEffect } from 'react'
import { Box, Typography, Tabs, Tab, Paper } from '@mui/material'
import AudioRecorder from '../components/AudioRecord'
import AudioUpload from '../components/AudioUpload'
import ImageComponent from '../components/Images'
import EmotionBar from '../components/Emotion'
import Cookies from 'js-cookie'

// Interface for subscription from backend
interface UserSubscription {
  hasSubscription: boolean
  usedThisMonth: number
  maxGenerate: number
}

const Function: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0)
  const [result, setResult] = useState<any>(null)
  const [subscription, setSubscription] = useState<UserSubscription>({
    hasSubscription: false,
    usedThisMonth: 0,
    maxGenerate: 2,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchSubscription() {
      try {
        const token = localStorage.getItem('access_token');
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/subscriptions/me`, {
          credentials: 'include',
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
        if (!res.ok) throw new Error('Failed to fetch subscription')
        const data = await res.json()
        setSubscription(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchSubscription()
  }, [])

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue)
  }

  const handleGenerate = async (data: any) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/subscriptions/generate-image`, {
        method: 'POST',
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ imageUrl: data.image, amount: 0 }),
      })
      const resData = await res.json()
      if (!res.ok) {
        alert(resData.message || 'An error occurred')
        return
      }

      setResult(data)
      setSubscription(prev => ({
        ...prev,
        usedThisMonth: resData.usedThisMonth,
      }))
    } catch (err) {
      console.error(err)
      alert('Error connecting to server')
    } finally {
      setLoading(false)
    }
  }

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
        <Typography
          sx={{
            textAlign: 'left',
            fontSize: { xs: '8vw', md: '3.5vw' },
            fontFamily: 'Bebas Neue, sans-serif',
            letterSpacing: { xs: '2px', md: '3px' },
            lineHeight: 1.1,
            fontWeight: 400,
            textTransform: 'uppercase',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            marginBottom: 2,
          }}
        >
          Record or upload an audio file to analyze and generate AI image
        </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
        {/* LEFT SIDE - Tabs */}
        <Box sx={{ width: { xs: '100%', md: '60%' } }}>
          <Paper 
            elevation={6} 
            sx={{ 
              backgroundColor: 'rgba(255,255,255,0.05)', 
              backdropFilter: 'blur(20px)', 
              borderRadius: 3, 
              overflow: 'hidden', 
              paddingBottom: 2,
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
            }}
          >
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              centered
              sx={{ 
                color: 'white', 
                backgroundColor: 'rgba(0,0,0,0.3)', 
                borderBottom: '1px solid rgba(255,255,255,0.15)',
                '& .MuiTab-root': {
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '1.1rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontWeight: 400,
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                },
              }}
            >
              <Tab label="Record Audio" />
              <Tab label="Upload Audio" />
            </Tabs>

            <Box>
              {tabIndex === 0 && <AudioRecorder onResult={handleGenerate} disabled={loading} />}
              {tabIndex === 1 && <AudioUpload onResult={handleGenerate} disabled={loading} />}
            </Box>
          </Paper>
          <Typography 
            sx={{ 
              mt: 2, 
              color: '#dfe7ff', 
              fontFamily: 'Poppins, sans-serif', 
              fontSize: '0.95rem',
              fontWeight: 300,
              letterSpacing: '0.3px',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            }}
          >
            You can generate up to {subscription.maxGenerate} images per month
          </Typography>
          <Typography 
            sx={{ 
              color: '#dfe7ff', 
              fontFamily: 'Poppins, sans-serif', 
              fontSize: '0.95rem',
              fontWeight: 300,
              letterSpacing: '0.3px',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            }}
          >
            Images used: {subscription.usedThisMonth} images
          </Typography>
          {loading && (
            <Typography 
              sx={{ 
                color: '#dfe7ff', 
                fontFamily: 'Poppins, sans-serif', 
                fontSize: '0.95rem',
                fontWeight: 300,
                letterSpacing: '0.3px',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
              }}
            >
              Processing... Please wait
            </Typography>
          )}
        </Box>

        {/* RIGHT SIDE - Result */}
        <Box 
          sx={{ 
            backgroundColor: 'rgba(255,255,255,0.05)', 
            backdropFilter: 'blur(20px)',
            borderRadius: 3, 
            width: { xs: '100%', md: '40%' }, 
            height: '100%',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
            overflow: 'hidden',
          }}
        >
          {result ? (
            <>
              <Typography 
                sx={{ 
                  mt: 2, 
                  ml: 2, 
                  fontWeight: 400, 
                  marginBottom: 3, 
                  color: '#fff',
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '1.5rem',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                }}
              >
                Analysis Results
              </Typography>
              <ImageComponent height="240px" width="100%" src={result.image} alt="Generated" title=""/>
              <Box sx={{ mt: 4, marginInline: '10px' }}>
                <EmotionBar emoji="😠" emotion="Anger" value={result.probabilities.anger * 100} color="#d32f2f" />
                <EmotionBar emoji="😤" emotion="Frustration" value={result.probabilities.frustration * 100} color="#ff9800" />
                <EmotionBar emoji="😊" emotion="Happiness" value={result.probabilities.happiness * 100} color="#fbc02d" />
                <EmotionBar emoji="😐" emotion="Neutral" value={result.probabilities.neutral * 100} color="#9e9e9e" />
                <EmotionBar emoji="😢" emotion="Sadness" value={result.probabilities.sadness * 100} color="#1565c0" />
              </Box>
              <Typography 
                sx={{ 
                  mt: 2, 
                  ml: 2, 
                  color: '#dfe7ff', 
                  fontFamily: 'Poppins, sans-serif', 
                  fontSize: '0.95rem',
                  fontWeight: 300,
                  letterSpacing: '0.3px',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                }}
              >
                Images used: {subscription.usedThisMonth} / {subscription.maxGenerate} images
              </Typography>
            </>
          ) : (
            <Typography 
              sx={{ 
                p: 2, 
                color: '#dfe7ff', 
                fontFamily: 'Poppins, sans-serif', 
                fontSize: '1rem',
                fontWeight: 300,
                letterSpacing: '0.3px',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
              }}
            >
              No result yet.
            </Typography>
          )}
        </Box>
      </Box>
      </Box>
    </Box>
  )
}

export default Function
