import React, { useState, useEffect } from "react";

const InactivityTimeout = ({ onTimeout }) => {
  const TIMEOUT = 15 * 60 * 1000; 
  let inactiveTimeout = null;

  const resetInactiveTimeout = () => {
    clearTimeout(inactiveTimeout);
    inactiveTimeout = setTimeout(() => {
      onTimeout();
    }, TIMEOUT);
  };

  const handleActivity = () => {
    resetInactiveTimeout();
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "mousedown", "touchstart"];
    const resetTimer = () => {
      resetInactiveTimeout();
    };

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetInactiveTimeout();

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      clearTimeout(inactiveTimeout);
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default InactivityTimeout;
