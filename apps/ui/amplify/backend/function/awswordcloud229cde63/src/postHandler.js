import AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const sns = new AWS.SNS();

const TABLE_NAME = "WordCloudMessages"
const CLOUD_TOPIC_ARN = "arn:aws:sns:us-west-2:279204523534:WordCloudTopic"

const postHandler = async (event, headers) => {
    const requestBody = JSON.parse(event.body);
    const { message } = requestBody;

    const snsResponse = await sns.publish({
        Message: message,
        TopicArn: CLOUD_TOPIC_ARN
    }).promise();

    await dynamoDB.put({
        TableName: TABLE_NAME,
        Item: {
            messageId: snsResponse.MessageId,
            messageText: message,
            timestamp: Date.now(),
        }
    }).promise();

    const response = {
        statusCode: 204,
        headers: headers,
        body: JSON.stringify("Message published successfully and written to DynamoDB!"),
    };

    return response;
};

export default postHandler;