export async function POST(request) {
  try {
    const body = await request.json();
    
    // Handle frame interaction
    const { untrustedData } = body;
    
    if (untrustedData?.buttonIndex === 1) {
      // User clicked "Track Trending Tokens"
      return new Response(JSON.stringify({
        type: 'frame',
        frame: {
          version: 'vNext',
          image: 'https://meme-trend.vercel.app/splash.png',
          buttons: [
            {
              label: 'View Trending',
              action: 'post',
            },
            {
              label: 'Open App',
              action: 'link',
              target: 'https://meme-trend.vercel.app',
            }
          ],
          postUrl: 'https://meme-trend.vercel.app/api/frame',
        }
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    // Default response
    return new Response(JSON.stringify({
      type: 'frame',
      frame: {
        version: 'vNext',
        image: 'https://meme-trend.vercel.app/splash.png',
        buttons: [
          {
            label: 'Track Trending Tokens',
            action: 'post',
          }
        ],
        postUrl: 'https://meme-trend.vercel.app/api/frame',
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
  } catch (error) {
    console.error('Frame API error:', error);
    return new Response(JSON.stringify({ error: 'Frame processing failed' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Also handle GET requests for frame validation
export async function GET() {
  return new Response(JSON.stringify({
    type: 'frame',
    frame: {
      version: 'vNext',
      image: 'https://meme-trend.vercel.app/splash.png',
      buttons: [
        {
          label: 'Track Trending Tokens',
          action: 'post',
        }
      ],
      postUrl: 'https://meme-trend.vercel.app/api/frame',
    }
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}