import React, { useState } from "react";
import { Dialog, DialogContent, Box, Typography, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/Delete";

interface ImageData {
  id: string;
  title: string;
  src: string;
}

interface Props {
  selectedImage: ImageData | null;
  setSelectedImage: (img: ImageData | null) => void;
  likes: { [key: string]: boolean };
  toggleLike: (id: string) => void;
  deleteImage: (id: string) => void;
  // <<< Add Props for Anonymous Toggle
  isAnonymous: boolean;
  creatorUsername: string;
  // >>>
}

const ImageDialog: React.FC<Props> = ({ 
  selectedImage, 
  setSelectedImage, 
  likes, 
  toggleLike, 
  deleteImage,
  isAnonymous, // Receive isAnonymous value
  creatorUsername // Receive creatorUsername value
}) => {
  
  // Set creator name to display (use Anonymous if isAnonymous is true)
  const displayedCreator = isAnonymous ? "Anonymous User" : creatorUsername;

  return (
    <Dialog
      open={!!selectedImage}
      onClose={() => setSelectedImage(null)}
      maxWidth="lg"
      fullWidth
      PaperProps={{ sx: { backgroundColor: "#121212", p: 2 } }}
    >
      {selectedImage && (
        <DialogContent sx={{ p: 0 }}>
          {/* Full image */}
          <img
            src={selectedImage.src}
            alt={selectedImage.title}
            style={{
              width: "100%",
              maxHeight: "80vh",
              objectFit: "contain",
              display: "block",
            }}
          />

          {/* Info & Actions */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1, px: 1 }}>
            {/* Image title */}
            <Box>
              <Typography variant="h6" color="white">
                {selectedImage.title}
              </Typography>
              {/* Display creator name */}
              <Typography variant="body2" color="grey.400">
                Creator: <span style={{ color: isAnonymous ? '#ff4081' : 'white', fontWeight: 'bold' }}>{displayedCreator}</span>
              </Typography>
            </Box>

            {/* Actions */}
            <Box>
              <IconButton
                onClick={() => toggleLike(selectedImage.id)}
                sx={{ color: likes[selectedImage.id] ? "red" : "white" }}
              >
                {likes[selectedImage.id] ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              <IconButton
                onClick={() => {
                  deleteImage(selectedImage.id);
                  setSelectedImage(null); // Close Dialog after delete
                }}
                sx={{ color: "white" }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default ImageDialog;