// imports

// build chat component

export default chat = (props) => {
  return (
    <div class="chat">
      <div class="chatSender">{props.chatSender}</div>
      <div class="chatTimestamp">{props.chatTimestamp}</div>
      <div class="chatMessage">{props.chatMessage}</div>
    </div>
  );
};
