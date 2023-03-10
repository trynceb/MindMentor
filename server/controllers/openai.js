import axios from "axios";
import dotenv from "dotenv";
import { openai } from "../index.js";

dotenv.config();

export const text = async (req, res) => {
  try {
    const { text, activeChatId } = req.body;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: text },
      ],
    });

    await sendMessage(response.data.choices[0].message.content, activeChatId);

    res.status(200).json({ text: response.data.choices[0].message.content });
  } catch (error) {
    console.error("error", error.response.data.error);
    res.status(500).json({ error: error.message });
  }
};

export const code = async (req, res) => {
  try {
    const { text, activeChatId } = req.body;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant coder who responds with only code and no explanations.",
        },
        { role: "user", content: text },
      ],
    });

    await sendMessage(response.data.choices[0].message.content, activeChatId);

    res.status(200).json({ text: response.data.choices[0].message.content });
  } catch (error) {
    console.error("error", error.response.data.error);
    res.status(500).json({ error: error.message });
  }
};

export const assist = async (req, res) => {
  try {
    const { text } = req.body;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that serves to only complete user's thoughts or sentences.",
        },
        { role: "user", content: `Finish my thought: ${text}` },
      ],
    });

    res.status(200).json({ text: response.data.choices[0].message.content });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: error.message });
  }
};

const sendMessage = async (message, chatId) => {
  await axios.post(
    `https://api.chatengine.io/chats/${chatId}/messages/`,
    { text: message },
    {
      headers: {
        "Project-ID": process.env.PROJECT_ID,
        "User-Name": process.env.BOT_USER_NAME,
        "User-Secret": process.env.BOT_USER_SECRET,
      },
    }
  );
};
