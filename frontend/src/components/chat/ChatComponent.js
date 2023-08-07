import React, {useState} from 'react';
import './ChatComponent.css';
import { useEffect } from "react";

const ChatComponent = (props) => { 
    // const chatState = {
    //     messageList : [],
    //     message:""
    // }
    const [messageList, setMessageList] = useState([])
    const [chatMessage, setChatMessage] = useState("")
    // user를 받기
    const userName = props.userName;
    const streamManager = props.streamManager;
    const connectionId = props.connectionId;
    console.log(connectionId, "connectionId")
   
    const chatScroll = React.createRef();

    useEffect(() => {
        streamManager.stream.session.on('signal:chat', (event) => {
            const data = JSON.parse(event.data);
            let tmpMessageList = [...messageList, { connectionId: event.from.connectionId, nickname: data.nickname, message: data.message } ];
            setTimeout(() => {
                // 사용자 그림 
            }, 50);
            setMessageList([...tmpMessageList])
            scrollToBottom();
        });
        return () => {
            console.log('render 종료')
         };
    }, [messageList]);

    function handlePressKey(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    }

    function sendMessage() {
        console.log("send : ",chatMessage);
        if (userName && chatMessage) {
            let message = chatMessage.replace(/ +(?= )/g, '');
            if (message !== '' && message !== ' ') {
                const data = { message: message, nickname: userName, streamId: streamManager.stream.streamId };
                streamManager.stream.session.signal({
                    data: JSON.stringify(data),
                    type: 'chat',
                });
            }
        }
        setChatMessage('');
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
                    {messageList.map((data, i) => (
                        <div
                            key={i}
                            id="remoteUsers"
                            className={
                                'message' + (data.connectionId !== connectionId ? ' left' : ' right')
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
                        value={chatMessage}
                        onChange={(e)=>setChatMessage(e.currentTarget.value)}
                        onKeyDown={handlePressKey}
                    />
                    {/* 버튼 으로 대체  */}
                    <button id="sendButton" onClick={sendMessage}>전송</button>
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
