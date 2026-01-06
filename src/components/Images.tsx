import { Typography, Box } from "@mui/material";
import React, { useRef, useEffect } from "react";

interface ImageProps {
  src: string;
  alt: string;
  title: string;
  width?: string | number;
  height?: string | number;
  fallbackSrc?: string;
  //blurred?: boolean;
}

const ImageComponent: React.FC<ImageProps> = ({ src, alt, title, width, height, fallbackSrc }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
      document.body.style.overflow = 'hidden';
    }
  };

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      document.body.style.overflow = 'unset';
    }
  };

  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    // Close dialog when clicking on backdrop (dialog element itself)
    if (e.target === dialogRef.current || (e.target as HTMLElement).tagName === 'DIALOG') {
      closeDialog();
    }
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = fallbackSrc || "";
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: { xs: 1.5, sm: 2 },
        py: { xs: 1.5, sm: 2.5 },
        fontFamily: 'Bebas Neue',
        width: '100%',
        maxWidth: "100%",
        boxSizing: 'border-box',
      }}
    >
      {title && (
        <Typography variant="h6" sx={{ marginBottom: "1rem", fontWeight: 600, fontFamily: 'Bebas Neue', color: "#28378B" }}>
          {title}
        </Typography>
      )}

      <Box 
        sx={{ 
          position: 'relative', 
          width: width || "100%",
          cursor: 'pointer',
        }}
        onClick={openDialog}
      >
        <img
          src={src}
          alt={alt}
          onError={handleError}
          style={{
            width: "100%",
            height: height || "auto",
            objectFit: "cover",
            borderRadius: "8px",
            display: 'block',
          }}
        />
      </Box>

      {/* Dialog showing enlarged image */}
      <dialog 
        ref={dialogRef} 
        onClick={handleDialogClick}
        style={{
          border: "none",
          background: "transparent",
          padding: 0,
          maxWidth: "100vw",
          maxHeight: "100vh",
          width: "100vw",
          height: "100vh",
          margin: 0,
          borderRadius: "0",
          overflow: "visible",
        }}
      >
        {/* Content Container */}
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 2, sm: 2, md: 3 },
            width: '100%',
            height: '100%',
            minHeight: '100vh',
            cursor: 'pointer',
          }}
          onClick={closeDialog}
        >
          {/* Image Container */}
          <Box
            sx={{
              position: 'relative',
              maxWidth: { xs: "98vw", sm: "95vw", md: "92vw" },
              maxHeight: { xs: "95vh", sm: "96vh", md: "97vh" },
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              animation: 'fadeInScale 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              cursor: 'default',
              '@keyframes fadeInScale': {
                '0%': {
                  opacity: 0,
                  transform: 'scale(0.85) translateY(20px)',
                },
                '100%': {
                  opacity: 1,
                  transform: 'scale(1) translateY(0)',
                },
              },
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: { xs: 1, sm: 2, md: 2 },
                boxSizing: 'border-box',
              }}
            >
              <img
                src={src}
                alt={alt}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  display: 'block',
                  borderRadius: "12px",
                  margin: "0 auto",
                }}
              />
            </Box>
          </Box>
        </Box>
      </dialog>
    </Box>
  );
};

export default ImageComponent;