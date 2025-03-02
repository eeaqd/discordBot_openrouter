const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('askai')
        .setDescription('Ask artificial intelligence and get an answer.')
        .addStringOption(option =>
            option
                .setName('prompt')
                .setDescription('Enter a query for AI')
                .setRequired(true)
        ),
    async execute(interaction) {
        const prompt = interaction.options.getString('prompt');

        // Delayed message to extend the request processing time
        await interaction.deferReply();

        try {
            // Call to the openrouter API with the specified model (for example, google/gemini-2.0-flash-lite-preview-02-05:free)
            const response = await axios.post(
                'https://openrouter.ai/api/v1/chat/completions',
                {
                    model: 'google/gemini-2.0-flash-lite-preview-02-05:free', // change the model as needed
                    messages: [{ role: 'user', content: prompt }]
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
                    }
                }
            );

            const aiReply = response.data.choices[0].message.content;
            const header = `**Your query:** ${prompt}\n**Ali's answer:**\n`;
            const fullText = header + aiReply;

            // If the message is 2000 characters long, send it as one
            if (fullText.length <= 2000) {
                await interaction.editReply(fullText);
            } else {
                // Calculate how many characters can be used to reply in the first message
                const availableForFirstChunk = 2000 - header.length;
                const firstChunk = aiReply.substring(0, availableForFirstChunk);
                const firstMessage = header + firstChunk;
                await interaction.editReply(firstMessage);

                // The rest of the answer
                let remainingText = aiReply.substring(availableForFirstChunk);

                // Send the following parts as follow-up messages of 2000 characters each
                while (remainingText.length > 0) {
                    const chunk = remainingText.substring(0, 2000);
                    remainingText = remainingText.substring(2000);
                    await interaction.followUp(chunk);
                }
            }
        } catch (error) {
            console.error(error);
            await interaction.editReply('An error occurred while processing your request.');
        }
    }
};
