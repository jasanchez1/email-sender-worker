import { EmailBody } from './models'
import { Env } from '../../../worker-configuration'
import { EmailResponse, EmailRequest } from '../sendgrid/models'
import { sendEmail } from "../sendgrid/client";


export async function sendContactEmail(
  request: Request,
  env: Env
): Promise<EmailResponse> {
  const formData = await request.formData()

  if (!formData) {
    throw new Error('No form data received')
  }

  const email = env.SENDGRID_VERIFIED_SENDER

  if (
    !email
  ) {
    throw Error('Missing the sendgrid sender email information.')
  }

  const name = formData.get('name')
  const surname = formData.get('surname')
  const phone = formData.get('phone')
  const senderEmail = formData.get('email')
  const message = formData.get('message')

  const url = env.SENDGRID_URL
  const apiKey = env.SENDGRID_API_KEY
  const from = email
  const to = email
  const subject = `Contact - ${name} ${surname}`

  const content = [
    `Name: ${name}`,
    `Surname: ${surname}`,
    `Phone: ${phone}`,
    `Email: ${senderEmail}`,
    `Message: ${message ?? ''}`,
  ].join('\n')

  try {
    await sendEmail(
      url,
      apiKey,
      from,
      to,
      content,
      subject
    )
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