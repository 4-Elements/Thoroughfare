// ---- imports here ----
import React from "react";
import Chat from './Chat.jsx';
import { useState } from 'react';

// ---- helper functions ----
// retrieve the array of chat objects from the server

// ---- build chat feed here ----

export default function ChatFeed () {
    const [chats, setChats] = useState([  <Chat
      chatMessage={'array.message'}
      chatSender={'array.sender'}
      chatTimestamp={'array.timestamp'}
    />,  <Chat
    chatMessage={'array.message'}
    chatSender={'array.sender'}
    chatTimestamp={'array.timestamp'}
  />]);
    const getMsgs = async () => {
      const response = await fetch('/npm chat');
      const res = await response.json();
      const chatComponentArray = [];
      res.array.forEach((chat) => {
        chatComponentArray.push(
          <Chat
            chatMessage={array.message}
            chatSender={array.sender}
            chatTimestamp={array.timestamp}
          />
        );
      });
      setChats(chatComponentArray);
    };
    // getMsgs();

  return (
    <div>
      <div>
        <p>I am a chat feed</p>
      </div>
      <div>{chats}</div>
    </div>
  );
};
