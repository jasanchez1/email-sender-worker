# Email Sender Cloudflare Worker

This Cloudflare Worker handles form submissions and sends emails with optional file attachments using cloudflare:mail.

## Features

- Receives form data including name, email, message, and file attachment
- Sends emails using a configured SMTP server
- Handles file attachments
- Implements CORS for cross-origin requests

## Prerequisites

- Cloudflare account
- Wrangler CLI installed (`pnpm install -g @cloudflare/wrangler`)
- SMTP server credentials

## Setup

1. Clone this repository:

```
git clone <repository-url>
cd email-sender-worker
```

2. Install dependencies:

```
pnpm install
```

3. Configure your `wrangler.toml`:

Configuring the allowed origins for CORS (`ALLOWED_ORIGINS`), your verified Sendgrid email, which acts as a sender, (`SENDGRID_VERIFIED_SENDER`) and your Sendgrid API key (`SENDGRID_VERIFIED_SENDER`). 

```toml
[vars]
ALLOWED_ORIGINS=['*']
SENDGRID_API_KEY="SOME_SENDGRID_API_KEY"
SENDGRID_URL="https://api.sendgrid.com/v3/mail/send"
SENDGRID_VERIFIED_SENDER="verified-sender@example.com"
```

4. Run the project locally:

```
pnpm dev
```
