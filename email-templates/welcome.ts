export const welcomeEmailTemplate = (
  userName: string,
  verificationLink: string,
) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #fff;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      border-bottom: 2px solid #f0f0f0;
      padding-bottom: 20px;
    }
    .logo {
      font-size: 24px;
      font-weight: bold;
      color: #2563eb;
      margin-bottom: 10px;
    }
    .content {
      margin: 30px 0;
    }
    .greeting {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .description {
      color: #666;
      margin-bottom: 30px;
    }
    .features {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 6px;
      margin: 20px 0;
    }
    .feature-item {
      margin: 10px 0;
      padding-left: 20px;
      position: relative;
    }
    .feature-item:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #10b981;
      font-weight: bold;
    }
    .cta-button {
      display: inline-block;
      background-color: #2563eb;
      color: white;
      padding: 12px 32px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      margin: 20px 0;
    }
    .cta-button:hover {
      background-color: #1d4ed8;
    }
    .footer {
      border-top: 1px solid #e0e0e0;
      padding-top: 20px;
      text-align: center;
      color: #999;
      font-size: 12px;
    }
    .link {
      color: #2563eb;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Autorithm</div>
      <p>Welcome to your automation template marketplace</p>
    </div>

    <div class="content">
      <div class="greeting">Welcome, ${userName}! 👋</div>
      
      <p class="description">
        We're thrilled to have you on board! You're now part of the Autorithm community—a marketplace where you can discover, purchase, and share powerful automation templates for n8n and Make.com.
      </p>

      <p style="color: #666;">To get started, verify your email address by clicking the button below:</p>

      <a href="${verificationLink}" class="cta-button">Verify Email Address</a>

      <p style="color: #999; font-size: 14px;">
        Or copy this link: <a href="${verificationLink}" class="link">${verificationLink}</a>
      </p>

      <div class="features">
        <div style="font-weight: 600; margin-bottom: 15px;">What you can do:</div>
        <div class="feature-item">Browse & purchase proven automation templates</div>
        <div class="feature-item">Save templates to your wishlist</div>
        <div class="feature-item">Leave reviews & ratings</div>
        <div class="feature-item">Earn referral commissions</div>
        <div class="feature-item">Access API for integrations</div>
      </div>

      <p style="color: #666; margin-top: 30px;">
        If you have any questions or need assistance, we're here to help!<br>
        Reply to this email or visit our <a href="https://autorithm.com/support" class="link">support page</a>.
      </p>
    </div>

    <div class="footer">
      <p>© 2026 Autorithm. All rights reserved.</p>
      <p>You received this email because you signed up for an Autorithm account.</p>
    </div>
  </div>
</body>
</html>
`;
