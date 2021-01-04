import React, { useEffect } from 'react';
import {
  YoutubePlayerWeb,
  YoutubePlayerPlugin,
} from 'capacitor-youtube-player';
import { Plugins, Capacitor } from '@capacitor/core';
import './YoutubePlayerStyles.css';

const YoutubePlayer = ({ videoId }) => {
  useEffect(() => {
    async function initializeYoutubePlayerPluginWeb() {
      console.log('App::initializeYoutubePlayerPluginWeb() | method called');
      const options = {
        playerId: 'youtube-player',
        playerSize: { width: 640, height: 360 },
        videoId: videoId,
        debug: true,
      };
      const result = await YoutubePlayerWeb.initialize(options);
      //   console.log('playerReady', result);
      //   (result).player.addEventListener('onPlaybackQualityChange', (event) => {
      //     console.log('playback quality is', event);
      //   });
      //   (result).player.addEventListener('onStateChange', (event) => {
      //     console.log('state is', event);
      //   });
    }

    async function initializeYoutubePlayerPluginNative() {
      const options = {
        width: 640,
        height: 360,
        videoId: videoId,
        playerId: 'youtube-player',
      };
      const result = await YoutubePlayerPlugin.initialize(options);
    }

    if (Capacitor.platform === 'web') {
      initializeYoutubePlayerPluginWeb();
    } else {
      // Native
      initializeYoutubePlayerPluginNative();
    }
  }, []);

  return (
    <div>
      <header>
        <h1>Welcome to Your React.js + TypeScript + Capacitor App</h1>
        {/* The <iframe> (and video player) will replace this <div> tag. */}
        <div id="youtube-player"></div>
      </header>
    </div>
  );
};

export default YoutubePlayer;
