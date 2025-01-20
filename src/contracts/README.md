# DeChat Smart Contract

This smart contract implements the core messaging functionality for the DeChat application.

## Features

- Send text messages between addresses
- Share images (stored on IPFS) with captions
- Send ETH along with messages
- View message history for any address

## Deployment

1. Deploy using Hardhat or Remix to your chosen network
2. Update the CONTRACT_ADDRESS in config.txt with the deployed address
3. Ensure your frontend is configured with the correct network RPC URL and chain ID

## Contract Functions

### sendTextMessage
Sends a text message to another address

### sendImageMessage
Sends an image message (IPFS hash) with optional caption

### sendETHMessage
Sends ETH along with a message

### getUserMessages
Retrieves all messages for a specific address

## Security

- All functions are public but tracked by sender address
- ETH transfers use the recommended call method
- Messages are stored per user for efficient retrieval