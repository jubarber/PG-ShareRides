import { createChatBotMessage } from "react-chatbot-kit";
import BotAvatar from "./BotAvatar/BotAvatar";


const config = {
  
  initialMessages: [
    createChatBotMessage(`Hola! ¿En que puedo ayudarte?
Escribe: 1) Para saber como crear un viaje. 
     2) Para saber como unirse a un viaje.  
     3) Para saber como reportar/denunciar une usuario. 
     4) Para saber como modificar "mi perfil". 
     5) Para saber información de costos $. 
     6) Para saber con quien viajo. 
     7) Para tener información de contacto`),
  ],
  
  botName: "ShareRides Bot",
  customComponents: {
    botAvatar: (props) => <BotAvatar {...props} />,
     },
  customStyles: {
    botMessageBox: {
      backgroundColor: "purple",
    },
    chatButton: {
      backgroundColor: "purple",
    },
   
  },
};

export default config;
