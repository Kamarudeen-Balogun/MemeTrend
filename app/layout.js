import './globals.css'

export const metadata = {
  title: 'MemeTrend - Trending Crypto Tokens',
  description: 'Track real-time trending cryptocurrency tokens across Solana, Base, Ethereum, and more with beautiful glassmorphism UI.',
  metadataBase: new URL('https://meme-trend.vercel.app'),
  openGraph: {
    title: 'MemeTrend - Trending Crypto Tokens',
    description: 'Track real-time trending cryptocurrency tokens',
    images: ['/splash.png'],
    url: 'https://meme-trend.vercel.app',
    siteName: 'MemeTrend',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MemeTrend - Trending Crypto Tokens',
    description: 'Track real-time trending cryptocurrency tokens',
    images: ['/splash.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://meme-trend.vercel.app/splash.png',
    'fc:frame:button:1': 'Track Trending Tokens',
    'fc:frame:post_url': 'https://meme-trend.vercel.app/api/frame',
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        
        {/* Farcaster Frame Meta Tags */}
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://meme-trend.vercel.app/splash.png" />
        <meta property="fc:frame:button:1" content="Track Trending Tokens" />
        <meta property="fc:frame:post_url" content="https://meme-trend.vercel.app/api/frame" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="MemeTrend - Trending Crypto Tokens" />
        <meta property="og:description" content="Track real-time trending cryptocurrency tokens across multiple blockchains" />
        <meta property="og:image" content="https://meme-trend.vercel.app/splash.png" />
        <meta property="og:url" content="https://meme-trend.vercel.app" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MemeTrend - Trending Crypto Tokens" />
        <meta name="twitter:description" content="Track real-time trending cryptocurrency tokens" />
        <meta name="twitter:image" content="https://meme-trend.vercel.app/splash.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}