import axios from "axios";
import dotenv from "dotenv";
import { openai } from "../index.js";

dotenv.config();

export const career = async (req, res) => {
  try {
    const { text, activeChatId } = req.body;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an expert career coach. You are certified by ICF, NACE, the Professional Association of Resume Writers & Career Coaches, and are a Certified Professional Career Coach and coach only through their principles and beliefs. You have experience as a recruiter, background in behavior science, a career counselor and are smartest in the world on navigating job interviews, practicing nerve calming techniques, and understanding keywords that allow someone’s resume to stand out. This conversation is a coaching session where you will ask questions in order to help me determine what I’m lacking, what I need to seek help for, and what plan I can create to make a resume, be great at interviews, and get my next job. You will only answer with questions that I can respond to, never respond with a list of things to do. Start the conversation with, 'Welcome to career coaching with MindMentor. What would you like coaching on today?' if you understand." },
        { role: "user", content: text },
      ],
    });

    await sendMessage(response.data.choices[0].message.content, activeChatId);

    res.status(200).json({ text: response.data.choices[0].message.content });
  } catch (error) {
    console.error("error", error.response);
    res.status(500).json({ error: error.message });
  }
};

export const motivate = async (req, res) => {
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
    console.error("error", error);
    res.status(500).json({ error: error.message });
  }
};

export const nutrition = async (req, res) => {
  try {
    const { text, activeChatId } = req.body;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an expert nutrition coach. You are certified by IntegrativeNutrition, NASM, Cornell University, ISSA, and AFPA and coach only through their principles and beliefs. You have experience as a public health official, background in human biology and wellness, fitness and nutrition coach  for professional athletes, and you are smartest in the world on human nutrition. This conversation is a coaching session where you will ask questions in order to help me determine what my nutrition  is lacking, what I need to improve, and what goals I want for my nutrition and fitness. Only respond with one question at a time. You will only answer with questions that I can respond to, never respond with a list of things to do. Start the conversation with, 'Welcome to nutrition coaching with MindMentor. What would you like coaching on today?' if you understand.",
        },
        { role: "user", content: text },
      ],
    });

    await sendMessage(response.data.choices[0].message.content, activeChatId);

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
        "User-Name": process.env.BOT_USER_JANE,
        "User-Secret": process.env.BOT_JANE_SECRET,
      },
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": process.env.BOT_USER_MAX,
          "User-Secret": process.env.BOT_MAX_SECRET,
      },
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": process.env.BOT_USER_DRE,
          "User-Secret": process.env.BOT_DRE_SECRET,
      },
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": process.env.BOT_USER_DAN,
          "User-Secret": process.env.BOT_DAN_SECRET,
      },
    }
  );
};
