export const purchaseConfirmationEmailTemplate = (
  userName: string,
  productName: string,
  price: number,
  category: string,
  downloadLink: string,
  orderId: string,
) => `
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
    .success-badge {
      display: inline-block;
      background-color: #10b981;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      margin: 10px 0;
      font-weight: 600;
    }
    .order-info {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 6px;
      margin: 20px 0;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
      padding: 8px 0;
      border-bottom: 1px solid #e0e0e0;
    }
    .info-label {
      font-weight: 600;
      color: #666;
    }
    .info-value {
      color: #333;
      font-weight: 500;
    }
    .product-details {
      background-color: #f0f7ff;
      border-left: 4px solid #2563eb;
      padding: 20px;
      margin: 20px 0;
      border-radius: 4px;
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
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Autorithm</div>
      <div class="success-badge">✓ Purchase Confirmed</div>
    </div>

    <div style="margin: 30px 0;">
      <p>Hi ${userName},</p>
      <p>Thank you for your purchase! 🎉 Your order has been confirmed and is ready to use.</p>
    </div>

    <div class="order-info">
      <div style="font-weight: 600; margin-bottom: 15px; font-size: 16px;">Order Details</div>
      <div class="info-row">
        <span class="info-label">Order ID:</span>
        <span class="info-value">#${orderId}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Product:</span>
        <span class="info-value">${productName}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Category:</span>
        <span class="info-value">${category}</span>
      </div>
      <div class="info-row" style="border-bottom: 2px solid #2563eb; font-size: 16px;">
        <span class="info-label">Amount:</span>
        <span class="info-value" style="color: #10b981; font-weight: 700;">$${price.toFixed(2)}</span>
      </div>
    </div>

    <div class="product-details">
      <p style="margin-top: 0;">Your automation template is ready to download and import into your workflow.</p>
      <a href="${downloadLink}" class="cta-button">Download Template</a>
    </div>

    <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px; margin: 20px 0;">
      <p style="margin: 0; color: #92400e;"><strong>Need help?</strong> Check out our <a href="https://autorithm.com/docs" class="link">documentation</a> or <a href="https://autorithm.com/support" class="link">contact support</a>.</p>
    </div>

    <p style="color: #666; margin-top: 30px;">
      You can view your purchase history anytime in your <a href="https://autorithm.com/dashboard/purchases" class="link">dashboard</a>.
    </p>

    <div class="footer">
      <p>© 2026 Autorithm. All rights reserved.</p>
      <p>Receipt for your automation template purchase</p>
    </div>
  </div>
</body>
</html>
`;
