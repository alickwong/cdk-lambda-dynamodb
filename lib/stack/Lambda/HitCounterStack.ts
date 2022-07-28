import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import * as path from "path";

export class HitCounterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id);

    let table = new dynamodb.Table(this, 'DynamodbTable', {
      partitionKey: {
        name: 'path',
        type: dynamodb.AttributeType.STRING
      }
    })

    let lambdaHandler = new NodejsFunction(this, 'Lambda', {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'main',
      entry: path.join(__dirname, './HitCounterLambda.ts'),
      environment: {
        DDB_TABLE_NAME: table.tableName
      }
    });

    table.grantReadWriteData(lambdaHandler);

    new apigateway.LambdaRestApi(this, 'APIGateway', {
      handler: lambdaHandler
    });

  }
}