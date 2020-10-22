const AWS = require("aws-sdk");
const BOT_NAME_STR = "WeatherCatBot";
const BOT_ALIAS_STR = "$LATEST";

AWS.config.update({
    region: "us-east-1"
});

console.log('r')

const LexRuntime = new AWS.LexRuntime();

const handler = (event, context, callback) => {
    const sessionAttributes = {};

    const params = {
        botAlias: BOT_ALIAS_STR,
        botName: BOT_NAME_STR,
        inputText: event.message_str,
        userId: event.user_id_str,
        sessionAttributes: sessionAttributes
    };

    LexRuntime.postText(params, (error, data) => {
        const response = {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            isBase64Encoded: false
        };
        if (error) {
            console.log(error, error.stack);
            response.statusCode = 422;
            response.body = JSON.stringify({error: error})
            callback(null, response);
        } else {
            console.log(data);
            response.statusCode = 200;
            response.body = JSON.stringify(data);
            callback(null, response);
        }
    });
}

exports.handler = handler;