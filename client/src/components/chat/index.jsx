import React from "react";
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";
import Header from "@/components/customHeader";
import StandardMessageForm from "@/components/customMessageForms/StandardMessageForm";
import AiCareer from "@/components/customMessageForms/AiCareer";
import AiMotivate from "@/components/customMessageForms/AiMotivate";
import AiNutrition from "@/components/customMessageForms/AiNutrition";

const Chat = ({ user, secret }) => {
  const chatProps = useMultiChatLogic(
    import.meta.env.VITE_PROJECT_ID,
    user,
    secret
  );

  return (
    <div style={{ flexBasis: "100%" }}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        style={{ height: "100vh" }}
        renderChatHeader={(chat) => <Header chat={chat} />}
        renderMessageForm={(props) => {
          if (chatProps.chat?.title.startsWith("Career-AI")) {
            return <AiCareer props={props} activeChat={chatProps.chat} />;
          }
          if (chatProps.chat?.title.startsWith("Motivate-AI")) {
            return <AiMotivate props={props} activeChat={chatProps.chat} />;
          }
          if (chatProps.chat?.title.startsWith("Nutrition-AI")) {
            return <AiNutrition props={props} activeChat={chatProps.chat} />;
          }

          return (
            <StandardMessageForm props={props} activeChat={chatProps.chat} />
          );
        }}
      />
    </div>
  );
};

export default Chat;