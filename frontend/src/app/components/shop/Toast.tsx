'use client';

import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      padding: '12px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      color: 'white',
      fontFamily: 'Open Sans, sans-serif',
      fontWeight: 500,
      fontSize: '14px',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '10px',
      minWidth: '250px',
      maxWidth: '350px',
      animation: 'slideIn 0.3s ease-out forwards'
    };

    switch (type) {
      case 'success':
        return { ...baseStyles, backgroundColor: '#16a34a' };
      case 'error':
        return { ...baseStyles, backgroundColor: '#dc2626' };
      case 'info':
        return { ...baseStyles, backgroundColor: '#3b82f6' };
      default:
        return { ...baseStyles, backgroundColor: '#4b5563' };
    }
  };

  return (
    <div style={getToastStyles()}>
      <div>{message}</div>
      <button 
        onClick={onClose} 
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          fontSize: '16px',
          padding: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '20px',
          height: '20px'
        }}
      >
        ×
      </button>
      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Toast; 