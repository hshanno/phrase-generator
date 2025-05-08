// src/dynamo.js
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import dotenv from "dotenv";

dotenv.config();

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
});

const docClient = DynamoDBDocumentClient.from(client);

export const getPhrases = async () => {
  const params = {
    TableName: "Phrases",
  };

  try {
    const data = await docClient.send(new ScanCommand(params));
    return data.Items;
  } catch (err) {
    console.error("Error fetching phrases:", err);
    throw new Error("Could not fetch phrases");
  }
};