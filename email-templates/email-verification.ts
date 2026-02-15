export const emailVerificationTemplate = (userName: string, verificationLink: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
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
    }
    .cta-button {
      display: inline-block;
      background-color: #10b981;
      color: white;
      padding: 12px 32px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 600;
      margin: 20px 0;
    }
    .cta-button:hover {
      background-color: #059669;
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
    .code-box {
      background-color: #f3f4f6;
      padding: 15px;
      border-radius: 6px;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      word-break: break-all;
      margin: 15px 0;
      color: #374151;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Autorithm</div>
      <p>Verify Your Email Address</p>
    </div>

    <div style="margin: 30px 0;">
      <p>Hi ${userName},</p>
      <p>Please verify your email address to activate your Autorithm account and start exploring our marketplace.</p>

      <a href="${verificationLink}" class="cta-button">Verify Email</a>

      <p style="color: #999; font-size: 14px; margin-top: 20px;">
        Or copy this link:<br>
        <span class="code-box">${verificationLink}</span>
      </p>

      <p style="color: #666; margin-top: 30px;">
        This verification link expires in 24 hours.
      </p>
    </div>

    <div class="footer">
      <p>© 2026 Autorithm. All rights reserved.</p>
      <p>You received this email because you created an account on our platform.</p>
    </div>
  </div>
</body>
</html>
`;
