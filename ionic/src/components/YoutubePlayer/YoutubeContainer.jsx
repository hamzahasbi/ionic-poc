/*
* Ionic React Capacitor Full App (https://store.enappd.com/product/ionic-react-full-app-capacitor/)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/
import React, { Component } from 'react';
import YoutubeView from './YoutubeView';
import { YoutubePlayerWeb } from 'capacitor-youtube-player'; // Web version
import { Plugins, Capacitor } from "@capacitor/core";
class YoutubeContainer extends Component {
    currentYear = new Date().getFullYear();
    state;
    constructor(props) {
        super(props);
        this.state = {
            youtubeData: null,
            youtubeDataReceived: false,
            videoId: this.props.video
        };

    }
    componentDidMount() {
        if (Capacitor.platform === 'web') {
            this.initializeYoutubePlayerPluginWeb();
        } else { // Native
            this.getYoutubeData();
        }
    }

    async initializeYoutubePlayerPluginWeb() {
        const { videoId } = this.state
        console.log('HomePage::initializeYoutubePlayerPluginWeb() | method called');
        const options = { playerId: 'youtube-player', playerSize: { width: 640, height: 360 }, videoId: videoId };
        const result = await YoutubePlayerWeb.initialize(options);
        console.log('playerReady', result);
    }

    async destroyYoutubePlayerPluginWeb() {
        console.log('HomePage::destroyYoutubePlayerPluginWeb() | method called');
        const result = await YoutubePlayerWeb.destroy('youtube-player');
        console.log('destroyYoutubePlayer', result);
    }

    async initializeYoutubePlayerPluginNative() {
        const { videoId } = this.state;
        const { YoutubePlayer } = Plugins;
        const options = { width: 640, height: 360, videoId: videoId };
        await YoutubePlayer.initialize(options);
    }

    getYoutubeData = async () => {
        const youtubeData = await fetch
        (`https://www.googleapis.com/youtube/v3/search/?key=AIzaSyAlWBnAJGYy_XZdT6hkPKgiBd5Tbk_HKWE&channelId=UCQzdMyuz0Lf4zo4uGcEujFw&part=snippet,id&order=date&maxResults=30`);
        const result = youtubeData.json();
        result.then((data) => {
            console.log('then data', data.items);
            this.setState({
                youtubeData: data.items,
                youtubeDataReceived: true
            })

        })
    }
    playThisVideo = (id) => {
        console.log('id', id);
        this.destroyYoutubePlayerPluginWeb()
        this.setState({
            videoId: this.props.video
        }, () => {
            this.initializeYoutubePlayerPluginWeb()
        });

    }
    render() {
        console.log(this.state, this.props);
        const { youtubeData, youtubeDataReceived } = this.state
        return (
            <YoutubeView
                getYoutubeData={this.getYoutubeData}
                youtubeData={youtubeData}
                youtubeDataReceived={youtubeDataReceived}
                playThisVideo={(data) => this.playThisVideo(data)}
                videoId={this.props.videoId}
            />
        );
    }
}

export default YoutubeContainer;