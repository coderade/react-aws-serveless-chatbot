const AWS = require("aws-sdk");
const fs = require("fs");
const DynamoDB = new AWS.DynamoDB();

AWS.config.update({
    region: "us-east-1"
});

exports.handler = (event, context, callback) => {

    const params = {};


    fs.readFileSync("cities.csv", "utf8").split('\n').map((item_str) => {
        params.ReturnConsumedCapacity = "TOTAL";
        params.TableName = "weather";

        params.Item = {
            "sc": {
                "S": item_str.split(",")[0]
            },
            "t": {
                "N": String(item_str.split(",")[1])
            }
        };

        DynamoDB.putItem(params, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                //ignore output
            }
        });
    });

    setTimeout(() => {
        callback(null, "ok");
    }, 1000 * 10);
}