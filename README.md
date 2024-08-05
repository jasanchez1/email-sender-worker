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

Configuring the allowed origins for CORS (`ALLOWED_ORIGINS`), your binded emails (`send_email`) and your recipient email (`EMAIL`). 

```toml
send_email = [{type = "send_email", name = "FORM_BINDING", destination_address = "some-email@example.com"}]

[vars]
ALLOWED_ORIGINS=['*']
EMAIL="some-email@example.com"
```

4. Run the project locally:

```
pnpm dev
```
