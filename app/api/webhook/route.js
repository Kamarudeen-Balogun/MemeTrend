export async function POST(request) {
  try {
    const body = await request.json();
    
    // Handle different webhook events
    switch (body.type) {
      case 'notification.click':
        // Handle notification clicks
        console.log('Notification clicked:', body);
        break;
        
      case 'user.association':
        // Handle user association
        console.log('User associated:', body);
        break;
        
      default:
        console.log('Unknown webhook type:', body.type);
    }
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ error: 'Webhook processing failed' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}