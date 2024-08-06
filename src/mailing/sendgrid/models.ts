type Success = 'success' | 'error'

export interface EmailResponse {
    success: Success
    error?: string
}

type AttachmentFileName = string
type AttachmentType = 'applicationapplication/pdf'
type AttachmentValue = string
type ContentType = 'text/html'
type ContentValue = string
type Email = string // Might want to validate
type Subject = string


interface Recipient {
    email: Email
    name?: string
}

type EmailTo = Recipient[]
type EmailFrom = Recipient

interface Personalization {
    to: EmailTo
}

interface Content {
    type: ContentType
    value: ContentValue
}

interface Attachment {
    type: AttachmentType
    filename: AttachmentFileName
    content: AttachmentValue
}

export interface EmailRequest {
    personalizations: Personalization[]
    from: EmailFrom
    subject?: Subject
    content: Content[]
    attachments?: Attachment[]
}