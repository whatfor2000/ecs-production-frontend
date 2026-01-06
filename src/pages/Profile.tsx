import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Avatar, Paper,
  LinearProgress, Grid, Button // <<-- Import Button
} from '@mui/material';
import Cookies from 'js-cookie';
import ImageDialog from '../components/ImageDialog';

// ... (Interface and other code remain the same)

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [images, setImages] = useState<ImageData[]>([]);
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(true);

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  
  // 1. Anonymous Toggle state
  const [isAnonymous, setIsAnonymous] = useState(false);

  // ... (useEffect, toggleLike, deleteImage code remain the same)

  // Function to toggle Anonymous state
  const toggleAnonymous = () => {
    setIsAnonymous(prev => !prev);
  };

  // ... (return code)
  return (
    <Box sx={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', color: '#fff' }}>
      {/* Profile Info */}
      <Paper sx={{ padding: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.1)', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={user.picture || undefined} sx={{ width: 80, height: 80 }} />
          <Box>
            <Typography variant="h5">{user.username}</Typography>
            <Typography variant="body2" color="grey.300">{user.email}</Typography>
            <Typography variant="body2" color="grey.300">
              Subscription: {user.subscriptionStatus || 'Free'}
            </Typography>
            {user.nextBillingAt && (
              <Typography variant="body2" color="grey.300">
                Next Billing: {new Date(user.nextBillingAt).toLocaleDateString()}
              </Typography>
            )}
          </Box>
        </Box>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Box sx={{ flexGrow: 1, mr: 2 }}>
            <Typography variant="body2">Images generated this month: {user.usedThisMonth} / {user.maxGenerate}</Typography>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 10, borderRadius: 5, mt: 1 }} />
          </Box>

          {/* 2. Anonymous Toggle button (Global setting for ImageDialog) */}
          <Button 
            variant="outlined" 
            onClick={toggleAnonymous}
            sx={{ 
              color: isAnonymous ? 'red' : 'green', 
              borderColor: isAnonymous ? 'red' : 'green',
            }}
          >
            {isAnonymous ? 'Show Name (Dialog)' : 'Go Anonymous (Dialog)'}
          </Button>
        </Box>
      </Paper>
{/* ... (Image History Grid remain the same) */}
    {/* 3. Send isAnonymous state to ImageDialog */}
    <ImageDialog
      selectedImage={selectedImage}
      setSelectedImage={setSelectedImage}
      likes={likes}
      toggleLike={toggleLike}
      deleteImage={deleteImage}
      isAnonymous={isAnonymous} // <<-- Send this prop
      creatorUsername={user.username} // <<-- Send creator name
    />
    </Box>
  );
};

export default ProfilePage;