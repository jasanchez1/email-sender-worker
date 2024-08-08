import { Env } from "../../worker-configuration";

// Helper function to handle CORS preflight requests
export function handleCORS(request: Request, env: Env) {
    const headers = request.headers;
    if (
        headers.get("Origin") !== null &&
        headers.get("Access-Control-Request-Method") !== null &&
        headers.get("Access-Control-Request-Headers") !== null
    ) {

        return new Response(null, {
            headers: {
                "Access-Control-Allow-Origin": env.ALLOWED_ORIGINS.join(','),
                "Access-Control-Allow-Methods": "HEAD,POST,OPTIONS",
                "Access-Control-Max-Age": "86400",
                "Access-Control-Allow-Headers": "Content-Type"
            },
        });
    } else {
        // Handle standard OPTIONS request
        return new Response(null, {
            headers: {
                Allow: "GET, HEAD, POST, OPTIONS",
            },
        });
    }
}

// Helper function to add CORS headers to a response
export function corsResponse(body: string, env: Env, status = 200) {
    return new Response(body, {
        status,
        headers: {
            "Access-Control-Allow-Origin": env.ALLOWED_ORIGINS.join(','),
            "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
            "Access-Control-Max-Age": "86400",
            "Access-Control-Allow-Headers": "Content-Type",
            "Content-Type": "application/json"
        }
    });
}

