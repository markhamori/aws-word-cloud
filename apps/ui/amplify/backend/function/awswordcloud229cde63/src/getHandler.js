import AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "WordCloudMessages"

const getHandler = async (event, headers) => {
    const dynamoDBResponse = await dynamoDB.scan({
        TableName: TABLE_NAME
    }).promise();

    const messages = dynamoDBResponse.Items.map(item => ({
        messageId: item.messageId,
        messageText: item.messageText,
        timestamp: item.timestamp
    }));

    console.log(`MESSAGES: ${JSON.stringify(messages)}`);

    const response = {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify(messages),
    };

    return response;
};

export default getHandler;