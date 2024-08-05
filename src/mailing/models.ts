type Success = 'success' | 'error'

export interface EmailResponse {
    success: Success
    messageId?: string
    error?: string
}