import React from 'react';
import './ChatComponent.css';
import { useEffect } from "react";


const ChatComponent = (props) => { 
    const chatState = {
        messageList : [],
        message:""
    }

    // user를 받기
    let user = props.user;
    // messageReceived 메소드 받기
    // function messageReceived(){
    // }
    const messageReceived = ()=>{
        props.messageReceived();
    }
    const chatScroll = React.createRef();

    useEffect(() => {
        user.getStreamManager().stream.session.on('signal:chat', (event) => {
            const data = JSON.parse(event.data);
            let messageList = chatState.messageList;
            messageList.push({ connectionId: event.from.connectionId, nickname: data.nickname, message: data.message });
            const document = window.document;
            setTimeout(() => {
                const userImg = document.getElementById('userImg-' + (chatState.messageList.length - 1));
                const video = document.getElementById('video-' + data.streamId);
                const avatar = userImg.getContext('2d');
                avatar.drawImage(video, 200, 120, 285, 285, 0, 0, 60, 60);
                messageReceived();
            }, 50);
            chatState.messageList = messageList;
            scrollToBottom();
        });
        return () => {
            console.log('render 종료')
         };
    }, []);

    function handleChange(event) {
        chatState.message= event.target.value;
    }

    function handlePressKey(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    function sendMessage() {
        console.log(chatState.message);
        if (user && chatState.message) {
            let message = chatState.message.replace(/ +(?= )/g, '');
            if (message !== '' && message !== ' ') {
                const data = { message: message, nickname: user.getNickname(), streamId: this.props.user.getStreamManager().stream.streamId };
                user.getStreamManager().stream.session.signal({
                    data: JSON.stringify(data),
                    type: 'chat',
                });
            }
        }
        chatState.message='';
    }

    function scrollToBottom() {
        setTimeout(() => {
            try {
                chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
            } catch (err) {
                console.log('scroll error')
            }
        }, 20);
    }

    return (
        <div id="chatContainer">
            <div id="chatComponent">
                <div className="message-wrap" ref={chatScroll}>
                    {chatState.messageList.map((data, i) => (
                        <div
                            key={i}
                            id="remoteUsers"
                            className={
                                'message' + (data.connectionId !== user.getConnectionId() ? ' left' : ' right')
                            }
                        >
                            {/* 유저 이미지 */}
                            {/* <canvas id={'userImg-' + i} width="60" height="60" className="user-img" /> */}
                            <div className="msg-detail">
                                <div className="msg-info">
                                    <p> {data.nickname}</p>
                                </div>
                                <div className="msg-content">
                                    <span className="triangle" />
                                    <p className="text">{data.message}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
             <div id="messageInput">
                    <input
                        placeholder="Send a messge"
                        id="chatInput"
                        value={chatState.message}
                        onChange={handleChange}
                        onKeyPress={handlePressKey}
                    />
                    {/* 버튼 으로 대체  */}
                    {/* <Tooltip title="Send message">
                        <Fab size="small" id="sendButton" onClick={sendMessage}>
                            <Send />
                        </Fab>
                    </Tooltip> */}
                </div>
            </div>
        </div>
    );
}

export default ChatComponent;
