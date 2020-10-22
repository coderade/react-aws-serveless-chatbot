const AWS = require("aws-sdk");
const DynamoDB = new AWS.DynamoDB({
    apiVersion: "2012-08-10",
    region: "us-east-1"
});

const handler = (event, ctx, cb) => {
    const response = {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        isBase64Encoded: false
    };

    if (!event.currentIntent.slots.city_str) {
        //we need to ask for (elicit) a city
        response.statusCode = 200;
        response.body = {
            "dialogAction": {
                "type": "ElicitSlot",
                "message": {
                    "contentType": "PlainText",
                    "content": "Name the city your cat lives in, thanks"
                },
                "intentName": "CatWeather",
                "slots": {
                    "city_str": null
                },
                "slotToElicit": "city_str"
            }
        };
        return cb(null, response.body);
    }

    const city = event.currentIntent.slots.city_str,

        lookupName = city.toUpperCase(),
        params = {
            TableName: "weather",
            KeyConditionExpression: "sc = :v1",
            ExpressionAttributeValues: {
                ":v1": {
                    "S": lookupName
                }
            },
            ProjectionExpression: "t"
        };

    console.log(params);
    DynamoDB.query(params, (err, data) => {
        if (err) {
            throw err;
        }

        if (data.Items && data.Items[0] && data.Items[0].t) {
            console.log("city weather found");
            console.log(data.Items[0]);
            response.statusCode = 200;
            response.body = {
                "sessionAttributes": {
                    "temp_str": data.Items[0].t.N,
                    "city_str": event.currentIntent.slots.city_str
                },
                "dialogAction": {
                    "type": "Close",
                    "fulfillmentState": "Fulfilled",
                    "message": {
                        "contentType": "PlainText",
                        "content": data.Items[0].t.N
                    }
                }
            };
        } else {
            console.log("city weather not found for " + lookupName);
            response.statusCode = 200;
            response.body = {
                "dialogAction": {
                    "type": "ElicitSlot",
                    "message": {
                        "contentType": "PlainText",
                        "content": "Please try another city, we couldn't find the weather for that city"
                    },
                    "intentName": "CatWeather",
                    "slots": {
                        "city_str": null
                    },
                    "slotToElicit": "city_str"
                }
            }
        }
        return cb(null, response.body);
    });
};

exports.handler = handler;