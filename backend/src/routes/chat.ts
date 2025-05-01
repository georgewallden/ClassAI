// backend/src/routes/chat.ts

import { Router, RequestHandler } from 'express';
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { TextDecoder } from 'util'; // Required to decode response body

const router = Router();
const client = new BedrockRuntimeClient({ region: process.env.AWS_REGION });

const chatHandler: RequestHandler = async (req, res, next) => {
  const { message } = req.body as { message?: string };
  if (!message) {
    res.status(400).json({ error: 'No message provided' });
    return;
  }

  try {
    const modelId = process.env.BEDROCK_MODEL_ID ?? 'unknown';
    if (modelId === 'unknown') {
         console.error("BEDROCK_MODEL_ID environment variable is not set!");
         res.status(500).json({ error: "Server configuration error: Model ID not set." });
         return;
    }

    // *** FIX START: Correct the request body format for Titan Text G1 ***
    const requestBody = JSON.stringify({
      inputText: message, // Titan Text G1 models expect inputText
      textGenerationConfig: {
        // Include necessary or desired generation parameters here
        // These are common parameters; adjust if needed for your model
        maxTokenCount: 4096, // Max tokens in the response
        temperature: 0.7,    // Controls randomness (0.0-1.0)
        topP: 0.9            // Controls diversity via nucleus sampling (0.0-1.0)
        // stopSequences: ["\n\n"] // Optional: specify stop sequences
      }
    });

    const cmd = new InvokeModelCommand({
      modelId: modelId,
      contentType: 'application/json',
      accept: 'application/json',
      body: requestBody // Use the new requestBody
    });
    // *** FIX END ***

    const response = await client.send(cmd);

    // Decode the response body
    const decoder = new TextDecoder('utf-8');
    const text = decoder.decode(response.body);

    // *** FIX START: Correct the response parsing for Titan Text G1 ***
    let completion = 'Failed to parse AI response.'; // Default error message
    try {
        const parsedBody = JSON.parse(text);
        // Titan Text G1 returns an array of results, with outputText in the first result
        if (parsedBody.results && parsedBody.results.length > 0 && parsedBody.results[0].outputText !== undefined) {
            completion = parsedBody.results[0].outputText;
        } else {
            console.error("Unexpected Bedrock response structure:", parsedBody);
             // Fallback if structure is weird
            completion = JSON.stringify(parsedBody, null, 2); 
        }
    } catch (parseError) {
        console.error("Failed to parse Bedrock response JSON:", text, parseError);
         // completion remains the default error message
    }
    // *** FIX END ***


    res.json({ reply: completion });
    return;

  } catch (err) {
    console.error("Error calling AWS Bedrock:", err);
    // Check if it's a specific known Bedrock error for better client feedback
    if (err instanceof Error) { // Basic check for standard Error objects
        if (err.name === 'AccessDeniedException') {
             res.status(403).json({ error: "Permission denied to invoke model. Check AWS Bedrock access." });
             return; // End request processing
        }
         if (err.name === 'ValidationException') {
             res.status(400).json({ error: "Invalid request format for the AI model." });
             return; // End request processing
         }
        // Add other specific Bedrock error types if needed
    }
    // For any other error, pass to default Express error handler (usually results in 500)
    next(err);
    return;
  }
};

router.post('/', chatHandler);

export default router;