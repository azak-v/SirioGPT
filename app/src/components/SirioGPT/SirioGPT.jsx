import { useState } from "react";
import "./SirioGPT.css";
import SirioHomePageFull from "../../assets/SirioHomePageFull.jpeg";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const API_KEY = "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";

function SirioGPT() {
  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      message:
        "Oi! Eu sou o Dr. Sirio, psicólogo virtual do Alma Sirio-Libânes! Como você está se sentindo hoje?",
      sender: "ChatGPT",
    },
  ]); //Array de mensagens

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage]; //Todas as mensagens + a nova mensagem (spreading).

    //Atualiza o estado da mensagem
    setMessages(newMessages);
    //Sirio esta digitando...
    setTyping(true);

    //Processar a mensagem para o ChatGPT (mandar e ver a resposta)
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // <-- Recebe um array como parametro

    //chatMessages {sender: "user" or "ChatGPT", message: "conteudo da mensagem aqui" } <-- Objeto das mensagens no chat
    //apiMessage { role: "user" or "assistant", content: "conteudo da mensagem aqui" } <-- Objeto da mensagem na Api

    let apiMessages = chatMessages.map((messageObject) => {
      // <-- Traduz o objeto do chat para os moldes da API
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message }; // <-- Retorna este objeto para a variavel apiMessages
    });

    //role: "user" -> Mensagens do usuario, assistant - > Resposta do chat

    //"system" -> uma mensagem inicial para como o chatgpt deve falar
    const systemMessage = {
      role: "system",
      content:
        "Aja como um psicologo virtual chamado Sirio, ajudando um paciente do hospital sirio libanes, caso a pergunta do paciente seja fora do escopo de psicologia, peça desculpas e diga que pode ajuda-lo apenas no quesito de saude mental",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.choices[0].message.content);
        setMessages([
          ...chatMessages,
          { message: data.choices[0].message.content, sender: "ChatGPT" },
        ]);
        console.log(messages);
        console.log();
        setTyping(false);
      });
  }

  return (
    <div id="MainContainer">
      <div
        id="MainSirioContainer"
        // style={{ position: "relative", height: "900px", width: "1000px" }}
      >
        <MainContainer>
          <ChatContainer id="SirioContainer">
            <MessageList
              id="MessagesContainer"
              scrollBehavior="smooth"
              typingIndicator={
                typing ? (
                  <TypingIndicator content="Sirio está digitando" />
                ) : null
              }
            >
              {messages.map((message, i) => {
                if (messages[i].sender === "ChatGPT") {
                  return (
                    <div id="SirioMessage">
                      <img src={SirioHomePageFull} alt="" />
                      <Message
                        className="MessagesContainers"
                        key={i}
                        model={message}
                      />
                    </div>
                  );
                } else {
                  return (
                    <Message
                      className="MessagesContainers"
                      key={i}
                      model={message}
                    />
                  );
                }
              })}
            </MessageList>
            <MessageInput
              placeholder="Escreva sua mensagem aqui..."
              onSend={handleSend}
            ></MessageInput>
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default SirioGPT;
