import { EmailRequest, EmailResponse } from "./models";

export async function sendEmail(
    url: string,
    apiKey: string,
    from: string,
    to: string,
    content: string,
    subject?: string,
): Promise<EmailResponse> {

    const emailRequest: EmailRequest = {
        personalizations: [
            {
                to: [{ email: to }]
            }
        ],
        from: { email: from, name: 'Inter-concept Internal'},
        subject,
        content: [{
            type: 'text/html',
            value: content,
        }]
    }

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(emailRequest)
    })

    if (res.status == 202) {
        return {
            success: 'success'
        }
    }
    throw Error(JSON.stringify(await res.text()))

}