export default function Terms() {
  return (
    <div className="app">
      <div className="glass" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
        <h1>Terms of Service</h1>
        <div style={{ lineHeight: '1.6' }}>
          <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>By using MemeTrend, you agree to these Terms of Service and our Privacy Policy.</p>
          
          <h2>2. Description of Service</h2>
          <p>MemeTrend provides real-time cryptocurrency token data and market information for informational purposes only. We display data from various blockchain networks including Solana, Ethereum, Base, and others.</p>
          
          <h2>3. No Financial Advice</h2>
          <p>MemeTrend does not provide financial advice. All information displayed is for informational purposes only. Cryptocurrency investments carry significant risk.</p>
          
          <h2>4. Data Accuracy</h2>
          <p>While we strive to provide accurate data, we cannot guarantee the completeness or accuracy of all information displayed. Data is sourced from third-party APIs.</p>
          
          <h2>5. User Responsibilities</h2>
          <p>You are responsible for your own investment decisions and should conduct your own research before making any financial decisions.</p>
          
          <h2>6. Limitation of Liability</h2>
          <p>MemeTrend shall not be liable for any losses or damages resulting from the use of our service.</p>
          
          <h2>7. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of modified terms.</p>
        </div>
      </div>
    </div>
  );
}