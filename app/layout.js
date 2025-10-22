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
    'fc:frame': JSON.stringify({
      version: '1',
      name: 'MemeTrend',
      iconUrl: 'https://meme-trend.vercel.app/icon.png',
      splashImageUrl: 'https://meme-trend.vercel.app/splash.png',
      splashBackgroundColor: '#071024',
      homeUrl: 'https://meme-trend.vercel.app/',
    })
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="fc:frame" content={JSON.stringify({
          version: '1',
          name: 'MemeTrend',
          iconUrl: 'https://meme-trend.vercel.app/icon.png',
          splashImageUrl: 'https://meme-trend.vercel.app/splash.png',
          splashBackgroundColor: '#071024',
          homeUrl: 'https://meme-trend.vercel.app/',
        })} />
      </head>
      <body>{children}</body>
    </html>
  )
}