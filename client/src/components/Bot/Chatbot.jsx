import React, {useState} from "react";
import Chatbot from 'react-chatbot-kit';
import MessageParser from "./Message";
import config from "./Config";
import ActionProvider from "./Provider";
import 'react-chatbot-kit/build/main.css'
export default function Bot() {
 const [mostrarBot, setMostrarBot] = useState(false)
  return (
    <div>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
}
