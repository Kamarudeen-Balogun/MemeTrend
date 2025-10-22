export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const chain = searchParams.get('chain');
  const time = searchParams.get('time');

  try {
    const response = await fetch(
      `https://api.geckoterminal.com/api/v2/networks/${chain}/trending_pools?duration=${time}&include=base_token`
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}