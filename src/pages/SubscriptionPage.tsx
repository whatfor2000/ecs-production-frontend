import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import SubscriptionForm from '../components/SubscriptionForm';

const SubscriptionPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f6f9fc',
        py: { xs: 4, md: 8 },
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 600,
              color: '#0a2540',
              mb: 1,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            Complete your Subscribe
          </Typography>
          <Typography
            sx={{
              fontSize: '1rem',
              color: '#425466',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            Secure payment powered by Omise
          </Typography>
        </Box>

        {/* Main Content - 2 Column Layout */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
            alignItems: 'start',
          }}
        >
          {/* Left Column - Order Summary */}
          <Box>
            <Box
              sx={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                padding: 3,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: '#0a2540',
                  mb: 2,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                Order Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography
                  sx={{
                    color: '#425466',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}
                >
                  Premium Plan
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: '#0a2540',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}
                >
                  $299
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography
                  sx={{
                    color: '#425466',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}
                >
                  Billed monthly
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  sx={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: '#0a2540',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}
                >
                  Total
                </Typography>
                <Typography
                  sx={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: '#0a2540',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}
                >
                  $299
                </Typography>
              </Box>
            </Box>

            {/* Security Badge */}
            <Box
              sx={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                padding: 2,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                textAlign: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  color: '#425466',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                🔒 Your payment information is secure and encrypted
              </Typography>
            </Box>
          </Box>

          {/* Right Column - Payment Form */}
          <Box>
            <SubscriptionForm planId="premium_299" amount={299} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SubscriptionPage;
