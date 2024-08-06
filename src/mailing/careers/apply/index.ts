import { Env } from "../../../../worker-configuration";
import { EmailResponse } from '../../sendgrid/models'
import { sendEmail } from "../../sendgrid/client";
import { Attachment } from "../../sendgrid/models";

async function encodeFileToBase64(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    return btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
}

async function formatAttachments(file: File, filename: string): Promise<Attachment> {
    return {
        filename,
        type: 'applicationapplication/pdf',
        content: await encodeFileToBase64(file)
    }
}


export async function sendApplyEmail(
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
            const location = formData.get('location')
            const positionId = formData.get('positionId')
            const positionName = formData.get('positionName')
            const emailRecipient = formData.get('emailRecipient')
            const resume = formData.get('resume')
            const coverLetter = formData.get('coverLetter')

    if (!resume || typeof resume === 'string') {
        throw Error('Resume should be a valid file.')
    }
    if (typeof coverLetter === 'string') {
        throw Error('Cover letter should be a valid file.')
    }
    if (
        !emailRecipient || typeof emailRecipient !== 'string'
    ) {
        throw Error('The email recipient must be part of the request.')
    }

    var attachments = [await formatAttachments(resume, `resume_${name}_${surname}.pdf`)]

    if (coverLetter !== null){
        attachments.push(await formatAttachments(coverLetter, `cover_letter_${name}_${surname}.pdf`))
    }

    const url = env.SENDGRID_URL
    const apiKey = env.SENDGRID_API_KEY
    const from = email
    const subject = `Job Application (${positionName}) | ${name} ${surname}`
    const content = [
        `Applicaton to: ${positionName} (ID: ${positionId})`,
        `Name: ${name}`,
        `Surname: ${surname}`,
        `Phone: ${phone}`,
        `Email: ${senderEmail}`,
        `Location (City): ${location}`,
    ].join('\n')

    try {
        await sendEmail(
            url,
            apiKey,
            from,
            emailRecipient,
            content,
            subject,
            attachments
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