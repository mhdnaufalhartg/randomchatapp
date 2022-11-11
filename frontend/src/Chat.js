import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "./App.css";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="chat-window bg-light">
            <div className="chat-header bg-success py-2">
              <h5 className="text-light mx-2 my-2">Wa Kw 12</h5>
            </div>
            <div className="chat-body mt-3">
              <ScrollToBottom className="message-container">
                {messageList.map((messageContent) => {
                  return (
                    <div
                      className="message"
                      id={username === messageContent.author ? "you" : "other"}
                    >
                      <div>
                        <b id="author">{messageContent.author}</b>

                        <div className="d-flex justify-content-between">
                          <div className="message-content ">
                            <p>{messageContent.message}</p>
                          </div>
                          <div className="message-meta">
                            <p id="time" className="time">
                              {messageContent.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </ScrollToBottom>
            </div>
            <div className="chat-footer">
              <input
                type="text"
                value={currentMessage}
                placeholder="Write Your Message..."
                onChange={(event) => {
                  setCurrentMessage(event.target.value);
                }}
                onKeyPress={(event) => {
                  event.key === "Enter" && sendMessage();
                }}
              />
              <button onClick={sendMessage} className="text-dark">
                &#9658;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
