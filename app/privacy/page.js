export default function Privacy() {
  return (
    <div className="app">
      <div className="glass" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
        <h1>Privacy Policy</h1>
        <div style={{ lineHeight: '1.6' }}>
          <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
          
          <h2>1. Information We Collect</h2>
          <p>MemeTrend is designed with privacy in mind. We do not collect or store personal identification information.</p>
          
          <h2>2. Data Storage</h2>
          <p>We store minimal data in your browser's local storage for user preferences (theme settings). This data never leaves your device.</p>
          
          <h2>3. Third-Party Services</h2>
          <p>We use GeckoTerminal API to fetch cryptocurrency data. Your IP address may be visible to these services when making API requests.</p>
          
          <h2>4. Farcaster Integration</h2>
          <p>When using MemeTrend through Farcaster, we may receive basic profile information to enhance your experience. This data is not stored on our servers.</p>
          
          <h2>5. Cookies and Tracking</h2>
          <p>We do not use cookies or tracking technologies for advertising or analytics.</p>
          
          <h2>6. Data Security</h2>
          <p>We implement security measures to protect any data processed by our service.</p>
          
          <h2>7. Children's Privacy</h2>
          <p>Our service is not directed to individuals under 18 years of age.</p>
          
          <h2>8. Changes to Privacy Policy</h2>
          <p>We may update this privacy policy. Continued use of the service constitutes acceptance of the updated policy.</p>
          
          <h2>9. Contact</h2>
          <p>For privacy-related questions, please contact us through the Farcaster platform.</p>
        </div>
      </div>
    </div>
  );
}