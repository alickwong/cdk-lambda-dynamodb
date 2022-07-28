import {DynamoDBClient, GetItemCommand, UpdateItemCommand} from "@aws-sdk/client-dynamodb";
import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";

export async function main(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  console.log(event);

  let dynamodb = new DynamoDBClient({});
  let updateItemCommand = new UpdateItemCommand({
    Key: {path: {S: event.path}},
    TableName: process.env.DDB_TABLE_NAME,
    UpdateExpression: 'ADD hits :incr',
    ExpressionAttributeValues: {':incr': {N: '1'}}
  });
  let result = await dynamodb.send(updateItemCommand);

  let getCommand = new GetItemCommand({
    Key: {path: {S: event.path}},
   TableName: process.env.DDB_TABLE_NAME
  });
  let getResult = await dynamodb.send(getCommand);


  return {
    statusCode: 200,
    body: JSON.stringify(getResult.Item)
  }
}