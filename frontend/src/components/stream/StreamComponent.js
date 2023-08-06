import React from 'react';
import './StreamComponent.css';
import OvVideoComponent from './OvVideo';
import { useEffect } from "react";

const StreamComponent =(props)=> {
    const streamState = {
        nickname: null,
        showForm: false,
        mutedSound: false,
        isFormValid: true 
    };

    useEffect(() => {
        streamState.nickname = props.user.getNickname();
        streamState.showForm = false;
        streamState.mutedSound = false;
        streamState.isFormValid = true;
        return () => {
            console.log('render 종료')
        };
    }, []);

    function toggleNicknameForm() {
        if (props.user.isLocal()) {
            streamState.showForm = !streamState.showForm;
        }
    }

    function toggleSound() {
        streamState.mutedSound = !streamState.mutedSound;
    }

        return (
            <div className="OT_widget-container">
                <div className="pointer nickname">
                    {streamState.showForm ? (
                        <div>
                            asd
                        </div>
                        // // div 태그로 대체
                        // <FormControl id="nicknameForm">
                        //     <IconButton color="inherit" id="closeButton" onClick={toggleNicknameForm}>
                        //         <HighlightOff />
                        //     </IconButton>
                        //     <InputLabel htmlFor="name-simple" id="label">
                        //         Nickname
                        //     </InputLabel>
                        //    // input이 아닌 다른 label이라 이름으로 변경
                        //     <Input
                        //         color="inherit"
                        //         id="input"
                        //         value={streamState.nickname}
                        //         onChange={this.handleChange}
                        //         onKeyPress={this.handlePressKey}
                        //         required
                        //     />
                        // </FormControl>
                    ) : (
                        <div onClick={toggleNicknameForm}>
                            <span id="nickname">{props.user.getNickname()}</span>
                        </div>
                    )}
                </div>

                {props.user !== undefined && props.user.getStreamManager() !== undefined ? (
                    <div className="streamComponent">
                        <OvVideoComponent user={props.user} mutedSound={streamState.mutedSound} />
                        <div id="statusIcons">
                            {!props.user.isVideoActive() ? (
                                <div id="camIcon">
                                    {/* 캠 꺼졌을 때  */}
                                    <div>캠 꺼짐</div>
                                </div>
                            ) : null}

                            {!props.user.isAudioActive() ? (
                                <div id="micIcon">
                                    <div>마이크 꺼짐</div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
    export default StreamComponent;