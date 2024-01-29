import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


// Custom hook for tracking page loading progress
const useProgress = () => {
  // Accessing the current location using the useLocation hook
  const location = useLocation();
  
  // State variable to manage the progress value
  const [progressValue, setProgressValue] = useState(0);

  // Effect to update the progress value during page transitions
  useEffect(() => {
    // Function to update the progress over a specified loading time
    const updateProgress = () => {
      const loadingTime = 1000; // Duration of loading in milliseconds
      const interval = 10; // Interval for updating progress

      let progress = 0;
      const increment = (100 / loadingTime) * interval;

      // Timer to increment the progress at regular intervals
      const timer = setInterval(() => {
        progress += increment;
        if (progress >= 100) {
          clearInterval(timer);
          progress = 100;
        }
        setProgressValue(progress);
      }, interval);
    };

    // Initiating the progress update function
    updateProgress();
    
    // Cleanup function to reset progress value on component unmount or route change
    return () => {
      setProgressValue(0);
    };
  }, [location.pathname]);

  // Returning the current progress value
  return progressValue;
};

export default useProgress;