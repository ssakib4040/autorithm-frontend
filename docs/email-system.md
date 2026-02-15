# Email System Setup & Configuration Guide

This document explains how to configure and use the email system in Autorithm.

## Overview

The email system uses **Nodemailer** with SMTP, supporting any email service provider:
- Gmail (free with app password)
- Outlook
- SendGrid
- Custom SMTP servers
- Any other SMTP-compatible service

## ✅ What's Already Set Up

### Email Templates
Located in `/email-templates/`:
- `welcome.ts` - Registration welcome email with verification link
- `email-verification.ts` - Email verification reminder
- `password-reset.ts` - Password reset instructions
- `purchase-confirmation.ts` - Purchase receipt and download link
- `index.ts` - Centralized exports

### Mail Service
- `/lib/mail.ts` - Core email sending utility with error handling

### API Routes
- `/api/auth/register` - Sends welcome email on registration
- `/api/auth/send-reset-email` - Password reset email
- `/api/auth/resend-verification-email` - Verification email resend
- `/api/purchases/send-confirmation` - Purchase confirmation email

## 🚀 Configuration Steps

### Step 1: Set SMTP Credentials

Choose your email provider and add credentials to `.env`:

#### **Option A: Gmail (FREE)**

1. Enable 2-Factor Authentication on your Google Account
2. Generate an App Password:
   - Visit: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer" (or your device)
   - Copy the 16-character password

3. Add to `.env`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-16-char-app-password
SMTP_FROM_EMAIL=your-email@gmail.com
```

#### **Option B: Outlook (FREE)**

```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASSWORD=your-password
SMTP_FROM_EMAIL=your-email@outlook.com
```

#### **Option C: SendGrid (FREE tier available)**

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=SG.your-sendgrid-api-key
SMTP_FROM_EMAIL=noreply@yourapp.com
```

#### **Option D: Custom SMTP Server**

```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-username
SMTP_PASSWORD=your-password
SMTP_FROM_EMAIL=noreply@yourapp.com
```

### Step 2: Update Environment Variables

Add all required SMTP variables to your `.env` file (already documented in `.env.example`).

**Required fields:**
- `SMTP_HOST` - SMTP server address
- `SMTP_PORT` - Port number (usually 587 or 465)
- `SMTP_SECURE` - Set to `true` for port 465, `false` for 587
- `SMTP_USER` - Email or username
- `SMTP_PASSWORD` - Password or API key
- `SMTP_FROM_EMAIL` - Sender email address (optional, uses SMTP_USER if not set)

## 📧 Using Email Templates

### Send Welcome Email (Registration)

Already integrated in `/api/auth/register`. When a user signs up:
1. User account is created
2. Verification token is generated
3. Welcome email is sent automatically

### Send Verification Email

**Endpoint:** `POST /api/auth/resend-verification-email`

```javascript
const response = await fetch('/api/auth/resend-verification-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com' })
});
```

### Send Password Reset Email

**Endpoint:** `POST /api/auth/send-reset-email`

```javascript
const response = await fetch('/api/auth/send-reset-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@example.com' })
});
```

### Send Purchase Confirmation Email

**Endpoint:** `POST /api/purchases/send-confirmation`

```javascript
const response = await fetch('/api/purchases/send-confirmation', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    userName: 'John Doe',
    productName: 'Email Sequence Automator',
    price: 29.99,
    category: 'Email Marketing',
    downloadLink: 'https://autorithm.com/download/product-id',
    orderId: 'ORD-12345'
  })
});
```

## 🛠️ Creating Custom Email Templates

Add new templates to `/email-templates/`:

```typescript
// email-templates/custom.ts
export const customEmailTemplate = (userName: string, customData: string) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; }
  </style>
</head>
<body>
  <div class="container">
    <p>Hi ${userName},</p>
    <p>${customData}</p>
  </div>
</body>
</html>
`;
```

Then export it in `/email-templates/index.ts`:
```typescript
export { customEmailTemplate } from "./custom";
```

Use it in your API routes:
```typescript
import { customEmailTemplate } from "@/email-templates";
import { sendEmail } from "@/lib/mail";

await sendEmail({
  to: 'user@example.com',
  subject: 'Your Subject',
  html: customEmailTemplate('John', 'Your custom content')
});
```

## 🧪 Testing Email Configuration

### Option 1: Test with Console Logs

When SMTP is misconfigured, check server logs for error messages:
```bash
yarn dev
# Watch terminal for email sending errors
```

### Option 2: Send Test Email

Create a simple test route:

```typescript
// app/api/test-email/route.ts
import { sendEmail } from "@/lib/mail";

export async function GET() {
  const sent = await sendEmail({
    to: 'your-email@example.com',
    subject: 'Test Email',
    html: '<h1>If you see this, email is working!</h1>'
  });
  return Response.json({ success: sent });
}
```

Visit `http://localhost:3000/api/test-email` in your browser.

## ⚠️ Troubleshooting

### "SMTP configuration missing" error
- Ensure `.env` has all required SMTP variables
- Restart dev server after adding variables: `yarn dev`

### "Authentication failed" error
- Gmail: Verify app password is correct (not your regular password)
- Other services: Check username/password spelling
- Try using the full email address for SMTP_USER

### "Connection refused"
- Check SMTP_HOST and SMTP_PORT are correct for your provider
- Gmail uses smtp.gmail.com:587 (not 465)
- Some servers require `SMTP_SECURE=true` for port 465

### "Email not received"
- Check spam/junk folder
- Verify SMTP_FROM_EMAIL is a valid sending address
- Check email provider's sending limits (Gmail: 500/day for free accounts)
- Review error logs in terminal

## 📋 Email API Reference

### sendEmail(options)

```typescript
interface SendEmailOptions {
  to: string;           // Recipient email
  subject: string;      // Email subject
  html: string;         // HTML content
  from?: string;        // Sender email (optional)
}

// Returns: boolean (true if sent, false if failed)
```

### verifySMTPConnection()

Test SMTP configuration before sending emails:

```typescript
import { verifySMTPConnection } from "@/lib/mail";

const isConnected = await verifySMTPConnection();
```

## 🔐 Security Best Practices

1. **Never commit `.env`** - Keep SMTP credentials private
2. **Use App Passwords** - Don't use your main account password
3. **Verify Sender** - Set SMTP_FROM_EMAIL to prevent spoofing
4. **Rate Limiting** - Consider adding rate limits to email endpoints
5. **Security Headers** - Email links should go to verified domains only
6. **Token Expiration** - Verification/reset tokens expire after 24 hours

## 📚 Next Steps

1. Configure SMTP credentials in `.env`
2. Test with a verification email
3. Monitor email sending in production
4. Add rate limiting to prevent abuse
5. Consider email logging for audit trails

## 📞 Support

For email issues:
- Check `.env` configuration
- Review error logs in terminal
- Verify SMTP credentials with your email provider
- Test with a simpler email service first (Gmail recommended)
