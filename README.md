# Discord AI Bot

This is a basic Discord bot built with `discord.js@14`, utilizing OpenRouter's free AI models to generate responses to user queries. The bot supports both global and local command registration, allowing flexibility in deployment across multiple servers or for testing purposes.

## Features
- Uses `discord.js@14` for seamless Discord bot integration.
- Utilizes OpenRouter's AI models for text generation.
- Supports both global and local command registration.
- Includes `/askai` command to interact with AI models.

## Requirements
- Node.js 16+
- A Discord bot token
- An OpenRouter API key

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/discord-ai-bot.git
   cd discord-ai-bot
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file or use `.envexample` and add your credentials:
   ```ini
   DISCORD_TOKEN=your-bot-token
   CLIENT_ID=your-bot-client-id
   GUILD_ID=your-test-server-id
   OPENROUTER_API_KEY=your-api-key
   ```

## Deploying Commands
To register the bot commands, use one of the following:

- **Global Registration** (Available across all servers, may take up to an hour to update):
  ```sh
  node deploy-commands.js global
  ```

- **Local Registration** (Only available on the test server, updates instantly):
  ```sh
  node deploy-commands.js local
  ```

## Running the Bot
Start the bot using:
```sh
node index.js
```

## Usage
Once the bot is running, you can use the `/askai` command to interact with the AI:
```sh
/askai prompt: "Tell me a joke!"
```

## License
This project is licensed under the MIT License. Feel free to modify and distribute it!

