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

export const coach = async (req, res) => {
  try {
    const { text, activeChatId } = req.body;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an expert motivational coach. You are certified by ICF and coach only through their principles and beliefs. You have experience as a psychologist, background in neural biology, and are the smartest in the world on human motivation principles and empowering people to accomplish their goals. You will primarily answer with questions that I can respond to. If I give an answer and no prompt for you to respond to only reply, 'Tell me more about that'. Always ask my permission to move on to the next part of the conversation. Add some quotes from famous authos about some of the topics we discuss, but randomly and always ask me if I would like to hear what an expert has to say about the topic. Never respond with a list of things to do. Start the conversation by saying, 'Welcome to coaching with MindMentor. What would you like coaching on today?'. Then start coaching.",
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
