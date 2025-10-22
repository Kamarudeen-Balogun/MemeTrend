'use client';
import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export function useFarcaster() {
  const [isFarcaster, setIsFarcaster] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeFarcaster = async () => {
      try {
        // Check if we're in a Farcaster environment
        if (typeof window !== 'undefined' && window.self !== window.top) {
          setIsFarcaster(true);
          
          // Initialize the SDK
          await sdk.actions.ready();
          console.log('Farcaster SDK ready');
          setIsReady(true);
        } else {
          // Not in Farcaster, mark as ready anyway
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