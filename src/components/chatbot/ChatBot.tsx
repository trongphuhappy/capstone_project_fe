"use client";
import React, { useState, useRef, useEffect } from "react";
import { TbMessageCircle } from "react-icons/tb";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

interface Message {
  from: "bot" | "user";
  text: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hello world!" },
  ]);
  const [sessionId, setSessionId] = useState<string>("");
  const [botTyping, setBotTyping] = useState<boolean>(false);
  const [isChatVisible, setIsChatVisible] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSessionId(uuidv4());
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInput = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter" && inputRef.current) {
      const userInput = inputRef.current.value.trim().toLowerCase();
      if (userInput) {
        addChat(userInput);
        inputRef.current.value = ""; // clear input after sending
      }
    }
  };

  const addChat = (input: string): void => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { from: "user", text: input },
    ]);

    setBotTyping(true);
    setTimeout(async () => {
      const response = await getBotResponse(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        { from: "bot", text: response },
      ]);
      setBotTyping(false);
    }, 1000);
  };

  const getBotResponse = async (input: string) => {
    if (!input.trim()) return "";
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER}/v2/Message/create_message_chatbot`,
      {
        sessionId: sessionId,
        content: input,
      }
    );
    return response.data?.value?.data?.content ?? "";
  };

  return (
    <div className="relative">
      <div className="w-36">
        <button
          className="fixed bottom-4 right-20 p-3 bg-[#00939f] text-white rounded-full shadow-lg hover:bg-gray-800 transition duration-300 z-50"
          onClick={() => setIsChatVisible(!isChatVisible)}
        >
          <TbMessageCircle className="text-4xl" />
        </button>
      </div>

      {isChatVisible && (
        <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-[80vh] bg-white w-1/3 fixed bottom-0 right-0 shadow-lg z-50 mb-24 rounded-lg mr-20">
          <div className="flex items-center space-x-2 p-3 border-b-2 border-gray-200 justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center">
                <span className="text-white text-xl">FU</span>
              </div>
              <div className="ml-2">
                <h2 className="font-bold">FOO</h2>
                <p className="text-sm text-gray-500">E-Neighbor Chatbot</p>
              </div>
            </div>
            <button
              className="ml-auto text-gray-500 hover:text-black"
              onClick={() => setIsChatVisible(false)}
            >
              <IoCloseOutline className="text-2xl" />
            </button>
          </div>

          <div
            id="messages"
            className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-end ${
                  message.from === "bot" ? "" : "justify-end"
                }`}
              >
                <div
                  className={`flex flex-col space-y-2 text-md leading-tight max-w-lg mx-2 ${
                    message.from === "bot"
                      ? "order-2 items-start"
                      : "order-1 items-end"
                  }`}
                >
                  <div>
                    <span
                      className={`px-4 py-3 rounded-xl inline-block ${
                        message.from === "bot"
                          ? "rounded-bl-none bg-gray-100 text-gray-600"
                          : "rounded-br-none bg-blue-500 text-white"
                      }`}
                      dangerouslySetInnerHTML={{ __html: message.text }}
                    ></span>
                  </div>
                </div>
                <img
                  src={
                    message.from === "bot"
                      ? "https://cdn.icon-icons.com/icons2/1371/PNG/512/robot02_90810.png"
                      : "https://i.pravatar.cc/100?img=7"
                  }
                  alt=""
                  className="w-6 h-6 rounded-full"
                />
              </div>
            ))}
            <div ref={messagesEndRef}></div>
            {botTyping && (
              <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-md leading-tight mx-2 order-2 items-start">
                  <div>
                    <img
                      src="https://support.signal.org/hc/article_attachments/360016877511/typing-animation-3x.gif"
                      alt="..."
                      className="w-16 ml-6"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
            <div className="relative flex">
              <input
                type="text"
                placeholder="Say something..."
                autoComplete="off"
                autoFocus
                ref={inputRef}
                className="text-md w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 pr-16 bg-gray-100 border-2 border-gray-200 focus:border-blue-500 rounded-full py-2"
                onKeyDown={handleInput}
              />
              <div className="absolute right-2 items-center inset-y-0 flex">
                <button
                  onClick={() => {
                    if (inputRef.current) {
                      addChat(inputRef.current.value);
                      inputRef.current.value = "";
                    }
                  }}
                  className="focus:outline-none"
                >
                  <BsArrowRightCircleFill className="text-3xl text-[#00939f]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
