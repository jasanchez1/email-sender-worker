import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";
import { EmailBody } from './models'
import { Env } from '../../../worker-configuration'
import { EmailResponse } from '../models'


export async function sendContactEmail(
  request: Request,
  env: Env
): Promise<EmailResponse> {
  const formData = await request.formData()

  if (!formData) {
    throw new Error('No form data received')
  }

  const body: Partial<EmailBody> = {}

  for (const part of formData) {
    body[part[0] as keyof EmailBody] = part[0].toString()
  }

  const email = env.EMAIL

  if (
    !email
  ) {
    throw Error('Missing the email information.')
  }

  const msg = createMimeMessage();
  msg.setSender({ name: email, addr: email });
  msg.setRecipient(email);
  msg.setSubject("An email generated in a worker")
  msg.addMessage({
    contentType: 'text/plain',
    data: [
      `Name: ${body.name}`,
      `Surname: ${body.surname}`,
      `Phone: ${body.phone}`,
      `Email: ${body.email}`,
      `Message: ${body.message ?? ''}`,
    ].join('\n')
  });

  var message = new EmailMessage(
    email, // from
    email, // to
    msg.asRaw()
  );

  try {
    const info = await env.FORM_BINDING.send(message);
    return {
      success: 'success',
    }
  }

  catch (error) {
    console.error(error)
    return {
      success: 'error',
      error: (error as Error).message,
    }
  }
}