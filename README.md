# react-aws-chatbot-app

Chatbot application developed using React, and the AWS Serverless services Lambda, API Gateway, Lex, S3, DynamoDB, 
and other services for didactic purposes.

In this bot application, the user can send text or audio messages (using speech recognition) to communicate with the bot to ask about the weather in
some USA cities. to check which cities are available please check the [cities.csv](aws/dynamodb/cities.csv) file. 
The Dynamo database has been seeded by this file.

--                   |  --
:-------------------------:|:-------------------------:
![](docs/images/tombot-1.png)| ![](docs/images/tombot-2.png)
![](docs/images/tombot-3.png)| ![](docs/images/tombot-4.png)


### AWS Services

Some AWS services are used on this project, most of them to test a fully serverless application running on AWS.

To run the following commands, the AWS CLI need to be installed, to learn how to install and use the CLI please check
the official AWS documentation: [AWS CLI User Guide](https://docs.aws.amazon.com/cli/index.html)

![](docs/images/architecture.png)<br/>
<sub>**Simple architecture diagram**</sub>

#### s3
The service where the build static website has been hosted, to know more how host a static website on s3, please check:
[Hosting a static website on Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)

To create an s3 bucket using the AWS CLI, use the following command:

    aws s3api create-bucket --bucket BUCKET_NAME --region us-east-1

    
#### CloudFront 

The CDN service used to serve the build site, to understand how to use CloudFront to serve a static 
website hosted on Amazon S3, please check: 
[How do I use CloudFront to serve a static website hosted on Amazon S3](https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-serve-static-website/)

The distribution file used on this project is available in [aws/cloudfront/distribution.json](aws/cloudfront/distribution.json)

To create a distribution using the AWS CLI, use the following command: (Remember to edit this distribution file and change
the S3_BUCKET to the name of your s3 bucket)

     aws cloudfront create-distribution --distribution-config file://distribution.json
     
After creating the CloudFront distribution we can make the CloudFront service able to connect to the bucket,
the policy used on the s3 bucket is available in [aws/s3/policy.json](aws/s3/policy.json). (Remember to edit this 
policy file, and change the CLOUDFRONT_ID to the name of your Cloudfront distribution)


    aws s3api put-bucket-policy --bucket BUCKET_NAME --policy file://policy.json
     
#### API Gateway
 
The service used to create the REST API to integrate the application with the Lambda Functions, Lex service, and the
DynamoDB database. To understand how to build an API Gateway REST API with Lambda integration check: 
[Build an API Gateway REST API with Lambda integration](https://docs.aws.amazon.com/apigateway/latest/developerguide/getting-started-with-lambda-integration.html)

The Open api setting is available on [aws/api-gateway/CatWeather-prod-oas30-apigateway.yaml](aws/api-gateway/CatWeather-prod-oas30-apigateway.yaml)

To import the OpenApi template and create an API, run:

    aws apigateway import-rest-api --body 'file://CatWeather-prod-oas30-apigateway.yaml'


#### DynamoDB

The NoSQL database service used on this project. To know more about DynamoDb, please check the following page:
[Getting Started with Amazon DynamoDB](https://aws.amazon.com/dynamodb/getting-started/)

A simple table has been used on this project with the attributes:

- **sc** - A string attribute to store the city name
- **n** - A number attribute to store the temperature
  
To create the schema used on this project use the following command:

     aws dynamodb create-table \
         --table-name weather \
         --attribute-definitions AttributeName=sc,AttributeType=S AttributeName=t,AttributeType=N \
         --key-schema AttributeName=sc,KeyType=HASH AttributeName=t,KeyType=RANGE \
         --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 

The [cities.csv](aws/dynamodb/cities.csv) file will be used to seed this database.


#### Lambda 
 
The functions service which is used on this project.

To get started with AWS Lambda check: [Getting started with AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/getting-started.html)

The following functions are used on this project: 

- [getWeather](aws/lambdas/getWeather.js): The function used to validate and fulfil the Lex bot
- [LexProxy](aws/lambdas/LexProxy.js): The function used to work as a proxy between the API gateway and the Lex Bot
- [seedDynamo](aws/lambdas/seedDynamo.js): The function used to seed the DynamoDb database, this function will run only once.


#### Lex

The bot interface service used on this project, this is the main service for the project, and it is very easy to use one.

The bot definitions file is available in [WeatherCatBot.zip](aws/lex/WeatherCatBot_1_c59a9583-cc13-41fa-8c2e-954e9050ea88_Bot_LEX_V.zip) 
and the json payload can be saw in [WeatherCatBot_Export.json](aws/lex/WeatherCatBot_Export.json).

To import this bot use:

    aws lex-runtime  start-import --payload WeatherCatBot.zip --resource-type BOT --merge-strategy OVERWRITE_LATEST

### How to use

Download and install the Node.Js and NPM using the [NVM](https://github.com/creationix/nvm).

Clone the repository and install the node modules.

`npm install`

After this, you can run the application.

***

#### Running the application

You can use the Npm to serve this application.

To do this on the root of the project, use the `npm start` command.

Then navigate your browser to http://localhost:3000 to see the app running in your browser.


#### Building application

This application uses the [create-react-app](https://create-react-app.dev/docs/getting-started/) to do build the project 
build.


To run the build, on the root of the project use:

    npm run build




