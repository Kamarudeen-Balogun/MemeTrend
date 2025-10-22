'use client';
import { useEffect, useState } from 'react';

export function useFarcaster() {
  const [isFarcaster, setIsFarcaster] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeFarcaster = async () => {
      try {
        // Check if we're in a Farcaster environment
        const inFarcaster = typeof window !== 'undefined' && 
                           (window.self !== window.top || 
                            navigator.userAgent.includes('Farcaster') ||
                            document.referrer.includes('farcaster'));
        
        if (inFarcaster) {
          setIsFarcaster(true);
          
          // Dynamically import the SDK to avoid SSR issues
          const { sdk } = await import('@farcaster/miniapp-sdk');
          
          // Initialize the SDK
          await sdk.actions.ready();
          console.log('Farcaster SDK ready - splash screen should hide');
          setIsReady(true);
        } else {
          // Not in Farcaster, mark as ready immediately
          console.log('Not in Farcaster environment');
          setIsReady(true);
        }
      } catch (error) {
        console.error('Farcaster SDK error:', error);
        // If SDK fails, still mark as ready to avoid infinite loading
        setIsReady(true);
      }
    };

    initializeFarcaster();
  }, []);

  return { isFarcaster, isReady };
}