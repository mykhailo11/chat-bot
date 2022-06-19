import { React, Fragment, useEffect, useState, useRef } from "react";
import styles from "./App.module.css";
import Cloud from "./chat/Cloud";

const messages = [];

const App = () => {
  const [message, setMessage] = useState(null);
  const input = useRef(null);
  const container = useRef(null);
  useEffect(() => {
    if (message !== null) {
      messages.push({
        content: message,
        sent: true,
      });
      container.current.scrollTop = container.current.scrollHeight;
      fetch("http://192.168.0.101:8080", {
        method: "post",
        body: message,
      })
        .then((response) => response.text())
        .then((data) => {
          messages.push({
            content: data,
            sent: false,
          });
          container.current.scrollTop = container.current.scrollHeight;
          setMessage(null);
        });
    }
  }, [message]);
  const onSendMessage = (message) => setMessage(message);
  const messageBlocks = messages.map((message, index) => (
    <Cloud
      className={`${message.sent ? styles["message-sent"] : ""}`}
      text={message.content}
      key={index}
      textColor="black"
      color={message.sent ? "#C6ECAE" : "#94C9A9"}
    />
  ));
  return (
    <div className={styles["app-body"]}>
      <h1>Chatty</h1>
      <div className={styles["inner-app-body"]}>
        <div className={styles["messages"]}>
          <div className={styles["messages-container"]} ref={container}>
            {messageBlocks.length === 0 ? "Type to start chatting" : messageBlocks}
          </div>
        </div>
        <div className={styles["message-editor-container"]}>
          <form
            className={styles["message-editor"]}
            onSubmit={(event) => {
              event.preventDefault();
              onSendMessage(input.current.value);
            }}
          >
            <input type="text" name="message" id={styles["message"]} ref={input} />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
