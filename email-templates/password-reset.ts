export const passwordResetEmailTemplate = (userName: string, resetLink: string) => `
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
    .warning {
      background-color: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 15px;
      border-radius: 4px;
      margin: 20px 0;
      color: #92400e;
    }
    .content {
      margin: 30px 0;
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
    .code-box {
      background-color: #f3f4f6;
      padding: 15px;
      border-radius: 6px;
      font-family: 'Courier New', monospace;
      font-size: 12px;
      word-break: break-all;
      margin: 15px 0;
      color: #374151;
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
    .security-tips {
      background-color: #f0f7ff;
      padding: 15px;
      border-radius: 6px;
      margin: 20px 0;
      font-size: 14px;
    }
    .security-tips li {
      margin: 8px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Autorithm</div>
      <p>Password Reset Request</p>
    </div>

    <div class="warning">
      <strong>⚠️ Security Notice:</strong> If you didn't request a password reset, please ignore this email or <a href="https://autorithm.com/support" class="link">contact support</a> immediately.
    </div>

    <div class="content">
      <p>Hi ${userName},</p>
      
      <p>We received a request to reset your password. Click the button below to create a new password.</p>

      <a href="${resetLink}" class="cta-button">Reset Password</a>

      <p style="color: #999; font-size: 14px;">
        Or copy this link if the button doesn't work:<br>
        <span class="code-box">${resetLink}</span>
      </p>

      <p style="color: #666; margin-top: 30px;">
        <strong>This link expires in 24 hours.</strong> If it expires, you can request a new reset link anytime.
      </p>

      <div class="security-tips">
        <strong>Security tips:</strong>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li>Use a strong password (8+ characters, mix of letters, numbers, symbols)</li>
          <li>Don't share your password with anyone</li>
          <li>Use a unique password for Autorithm</li>
          <li>Enable two-factor authentication for extra security</li>
        </ul>
      </div>
    </div>

    <div class="footer">
      <p>© 2026 Autorithm. All rights reserved.</p>
      <p>This is an automated security email. Please don't reply.</p>
    </div>
  </div>
</body>
</html>
`;
