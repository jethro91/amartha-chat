import React from 'react';

function SelfChat({}) {
  return (
    <div className="self-chat-row">
      <div className="self-chat-box">
        <span className="self-tail-container" />
        <div className="self-chat-box-content">
          <div>
            <div className="self-chat-box-content-1">
              <span className="self-chat-box-content-chat">
                Chat Content Chat Content Chat Content Chat Content Chat Content Chat Content Chat
                Content :)
              </span>
            </div>
          </div>
          <div className="self-chat-box-time">
            <span className="self-chat-box-time-1">14:00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelfChat;
