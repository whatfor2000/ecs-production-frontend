import React, { useState } from "react";
import Script from "react-load-script";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  TextField,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";

import Cookies from "js-cookie";

declare global {
  interface Window {
    Omise: any;
  }
}

interface SubscriptionFormProps {
  amount: number;
  planId: string;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ amount, planId }) => {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "promptpay">("card");
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [omiseLoaded, setOmiseLoaded] = useState(false);

  // ✅ Load Omise.js and set Public Key from .env
  const handleScriptLoad = () => {
    const Omise = window.Omise;
    if (!Omise) {
      console.error("Omise.js not found");
      return;
    }

    const publicKey = import.meta.env.VITE_OMISE_PUBLIC_KEY;
    if (!publicKey) {
      console.error("❌ Missing REACT_APP_OMISE_PUBLIC_KEY in .env");
      return;
    }

    Omise.setPublicKey(publicKey);
    setOmiseLoaded(true);
    console.log("✅ Omise.js loaded successfully with key:", publicKey);
  };

  // ✅ When Submit is clicked
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === "card") {
      if (!omiseLoaded || !window.Omise) {
        alert("Omise not ready yet. Please wait a moment...");
        return;
      }

      const card = {
        name: (document.getElementById("name") as HTMLInputElement)?.value,
        number: (document.getElementById("number") as HTMLInputElement)?.value,
        expiration_month: (document.getElementById("exp_month") as HTMLInputElement)?.value,
        expiration_year: (document.getElementById("exp_year") as HTMLInputElement)?.value,
        security_code: (document.getElementById("cvc") as HTMLInputElement)?.value,
      };

      window.Omise.createToken("card", card, async (status: number, response: any) => {
        console.log("Omise createToken response:", status, response);

        if (status === 200) {
          const token = response.id;
          console.log("✅ Card Token Created:", token);

          // Send token to backend to create subscription
          try {
            const token = localStorage.getItem('access_token');
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/subscriptions/subscribe`, {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
              },
              body: JSON.stringify({ token, amount, planId }),
            });

            const data = await res.json();
            alert("🎉 Subscription created successfully!");
            console.log("Subscription result:", data);
          } catch (error: any) {
            alert("❌ Error creating subscription: " + error.message);
          }
        } else {
          alert("❌ Payment failed: " + response.message);
        }
      });
    }

    if (paymentMethod === "promptpay") {
      setLoading(true);
      try {
        const token = localStorage.getItem('access_token');
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/omise/promptpay`, {
          method: "POST",
          credentials: "include",
          headers: { 
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          body: JSON.stringify({ amount }),
        });
        const data = await res.json();
        setQrUrl(data.promptpayUrl);
      } catch (error: any) {
        alert("❌ Error creating PromptPay charge: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box>
      <Script url="https://cdn.omise.co/omise.js" onLoad={handleScriptLoad} />

      <Card 
        sx={{ 
          width: "100%", 
          p: { xs: 3, md: 4 }, 
          borderRadius: '8px', 
          backgroundColor: '#fff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <CardHeader
          title="Payment Method"
          titleTypographyProps={{ 
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#0a2540',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
          sx={{ pb: 2 }}
        />
        <CardContent sx={{ pt: 0 }}>
          <Box mb={3}>
            <Typography 
              variant="body2" 
              sx={{
                color: '#425466',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '0.875rem',
                mb: 2,
              }}
            >
              Select payment method
            </Typography>
            <ToggleButtonGroup
              color="primary"
              value={paymentMethod}
              exclusive
              onChange={(_, val) => val && setPaymentMethod(val)}
              fullWidth
              sx={{ 
                '& .MuiToggleButton-root': {
                  color: '#425466',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontWeight: 500,
                  borderColor: '#e0e6ed',
                  textTransform: 'none',
                  py: 1.5,
                  '&.Mui-selected': {
                    backgroundColor: '#635bff',
                    color: '#fff',
                    borderColor: '#635bff',
                    '&:hover': {
                      backgroundColor: '#5851ea',
                    },
                  },
                  '&:hover': {
                    backgroundColor: '#f6f9fc',
                    borderColor: '#cbd5e0',
                  },
                },
              }}
            >
              <ToggleButton value="card">Credit / Debit Card</ToggleButton>
              <ToggleButton value="promptpay">PromptPay</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <form onSubmit={handleSubmit}>
            {paymentMethod === "card" && (
              <Box>
                <FormControl fullWidth margin="normal">
                  <TextField 
                    id="name" 
                    label="Cardholder Name" 
                    required
                    placeholder="John Doe"
                    sx={{
                      '& .MuiInputLabel-root': {
                        color: '#425466',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      },
                      '& .MuiOutlinedInput-root': {
                        color: '#0a2540',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        backgroundColor: '#fff',
                        '& fieldset': {
                          borderColor: '#e0e6ed',
                        },
                        '&:hover fieldset': {
                          borderColor: '#cbd5e0',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#635bff',
                        },
                      },
                    }}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField 
                    id="number" 
                    label="Card Number" 
                    required
                    placeholder="1234 5678 9012 3456"
                    sx={{
                      '& .MuiInputLabel-root': {
                        color: '#425466',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      },
                      '& .MuiOutlinedInput-root': {
                        color: '#0a2540',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        backgroundColor: '#fff',
                        '& fieldset': {
                          borderColor: '#e0e6ed',
                        },
                        '&:hover fieldset': {
                          borderColor: '#cbd5e0',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#635bff',
                        },
                      },
                    }}
                  />
                </FormControl>
                <Grid container component="div" spacing={2}>
                  <Grid component="div" size={{ xs: 4 }}>
                    <TextField 
                      id="exp_month" 
                      label="MM" 
                      required
                      placeholder="12"
                      sx={{
                        '& .MuiInputLabel-root': {
                          color: '#425466',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        },
                        '& .MuiOutlinedInput-root': {
                          color: '#0a2540',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          backgroundColor: '#fff',
                          '& fieldset': {
                            borderColor: '#e0e6ed',
                          },
                          '&:hover fieldset': {
                            borderColor: '#cbd5e0',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#635bff',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid component="div" size={{ xs: 4 }}>
                    <TextField 
                      id="exp_year" 
                      label="YY" 
                      required
                      placeholder="25"
                      sx={{
                        '& .MuiInputLabel-root': {
                          color: '#425466',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        },
                        '& .MuiOutlinedInput-root': {
                          color: '#0a2540',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          backgroundColor: '#fff',
                          '& fieldset': {
                            borderColor: '#e0e6ed',
                          },
                          '&:hover fieldset': {
                            borderColor: '#cbd5e0',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#635bff',
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid component="div" size={{ xs: 4 }}>
                    <TextField 
                      id="cvc" 
                      label="CVC" 
                      required
                      placeholder="123"
                      sx={{
                        '& .MuiInputLabel-root': {
                          color: '#425466',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        },
                        '& .MuiOutlinedInput-root': {
                          color: '#0a2540',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          backgroundColor: '#fff',
                          '& fieldset': {
                            borderColor: '#e0e6ed',
                          },
                          '&:hover fieldset': {
                            borderColor: '#cbd5e0',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#635bff',
                          },
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ 
                    mt: 3, 
                    py: 1.75,
                    backgroundColor: '#635bff',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontWeight: 600,
                    fontSize: '1rem',
                    textTransform: 'none',
                    borderRadius: '6px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    "&:hover": {
                      backgroundColor: '#5851ea',
                      boxShadow: '0 4px 12px rgba(99,91,255,0.3)',
                    },
                  }}
                >
                  Pay ${amount}
                </Button>
              </Box>
            )}

            {paymentMethod === "promptpay" && (
              <Box textAlign="center" my={3}>
                <Typography 
                  variant="body1" 
                  gutterBottom
                  sx={{
                    color: '#425466',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontWeight: 500,
                    mb: 3,
                  }}
                >
                  Scan QR to pay ${amount}
                </Typography>
                <Box
                  sx={{
                    width: 250,
                    height: 250,
                    borderRadius: '8px',
                    mx: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: qrUrl ? "transparent" : "#f6f9fc",
                    border: qrUrl ? 'none' : '2px dashed #e0e6ed',
                    mb: 3,
                  }}
                >
                  {qrUrl ? (
                    <img src={qrUrl} alt="PromptPay QR" style={{ width: 250, height: 250, borderRadius: '8px' }} />
                  ) : loading ? (
                    <Typography 
                      variant="body2"
                      sx={{
                        color: '#425466',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      }}
                    >
                      Generating QR...
                    </Typography>
                  ) : (
                    <Typography 
                      variant="body2"
                      sx={{
                        color: '#8898aa',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                      }}
                    >
                      QR CODE
                    </Typography>
                  )}
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ 
                    py: 1.75,
                    backgroundColor: '#635bff',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontWeight: 600,
                    fontSize: '1rem',
                    textTransform: 'none',
                    borderRadius: '6px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    "&:hover": {
                      backgroundColor: '#5851ea',
                      boxShadow: '0 4px 12px rgba(99,91,255,0.3)',
                    },
                  }}
                >
                  Generate QR Code
                </Button>
              </Box>
            )}
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SubscriptionForm;
