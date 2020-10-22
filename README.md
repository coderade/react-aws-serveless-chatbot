# react-aws-chatbot-app

Chatbot application developed using React, and the AWS Serverless services Lambda, API Gateway, Lex, S3, DynamoDB, 
and others services for didactic purposes on AWS Serverless training 
course [AWS: Building Serverless Applications](https://www.coursera.org/learn/aws-fundamentals-building-serverless-applications)

In this bot application, the user can send text or audio messages to communicate with the bot to ask about the weather in
some USA cities. to check which cities are available please check the [cities.csv](aws/dynamodb/cities.csv) file. 
The Dynamo database has been seeded by this file.

### AWS Services



![](docs/images/architecture.png)<br/>
<sub>**Simple architecture diagram**</sub>



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

---                   |  ---
:-------------------------:|:-------------------------:
![](docs/images/tombot-1.png)| ![](docs/images/tombot-2.png)
![](docs/images/tombot-3.png)| ![](docs/images/tombot-4.png)





