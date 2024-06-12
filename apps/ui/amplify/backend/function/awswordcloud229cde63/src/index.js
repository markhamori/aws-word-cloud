import getHandler from "./getHandler.js"
import postHandler from "./postHandler.js"

export const handler = async (event) => {
    const responseHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
    };

    console.log(`EVENT: ${JSON.stringify(event)}`);

    try {
        if (event.httpMethod === 'GET' && event.path === '/words') {
            return getHandler(event, responseHeaders);
        } else if (event.httpMethod === 'POST' && event.path === '/words') {
            return postHandler(event, responseHeaders);
        } else {
            return {
                statusCode: 404,
                headers: responseHeaders,
                body: JSON.stringify({ message: 'Not Found' })
            };
        }


    } catch (error) {
        console.error('Error fetching messages:', error);
         const response = {
            statusCode: 500,
            headers: responseHeaders,
            body: JSON.stringify("Failed to fetch messages!"),
        };

        return response;
    }
};
