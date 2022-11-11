import React from "react";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      <div className="container  d-flex justify-content-center  mt-5">
        <div className="row">
          <div className="col-md-12">
            {!showChat ? (
              <div>
                <h3 className="text-success">Join A Chat</h3>
                <div>
                  <input
                    className="rounded mt-2 btn outline-sm bg-light"
                    type="text"
                    placeholder="name..."
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                  />
                </div>
                <div>
                  <input
                    className="rounded mt-3 btn outline-sm bg-light"
                    type="password"
                    placeholder="Room ID..."
                    onChange={(event) => {
                      setRoom(event.target.value);
                    }}
                  />
                </div>
                <div>
                  <button
                    className="rounded btn outline-sm  bg-light mt-3 text-success"
                    onClick={joinRoom}
                  >
                    Join A Room
                  </button>
                </div>
              </div>
            ) : (
              <Chat socket={socket} username={username} room={room} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
