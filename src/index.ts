import { Env } from "../worker-configuration";
import { sendContactEmail } from "./mailing/contact/indext";
import { corsResponse, handleCORS } from "./utils/handleCors";

	
export default {
	async fetch(request: Request, env: Env, ctx): Promise<Response> {

		if (request.method === 'OPTIONS') {
			return handleCORS(request, env);
		}

		if (request.method !== 'POST') {
			return new Response('Method Not Allowed', { status: 405 });
		}

		const path = new URL(request.url).pathname
		const notFoundResponse = new Response('Not found', {
			status: 404
		})

		switch (path) {
			case '/contact':
				const emailResponse = await sendContactEmail(request, env)
				return corsResponse(JSON.stringify(emailResponse), env, !emailResponse.error ? 200 : 500)
			default:
				return notFoundResponse
		}
	},
} satisfies ExportedHandler<Env>;
