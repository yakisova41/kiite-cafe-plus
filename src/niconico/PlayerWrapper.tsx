import { useEffect } from "react";
import { useVideoJS } from "./react-videojs-player-core";
import { usePostMessage } from "./post-message-hooks";

/**
 * videojsのイベントを親windowのpostMessageに渡したり、
 * 受け取ったプレーヤー操作messageを処理する
 */
const PlayerWrapper: React.FunctionComponent = () => {
  const vjsplayer = useVideoJS();
  const postMessage = usePostMessage();

  useEffect(() => {
    if (postMessage !== null && vjsplayer !== null) {
      postMessage.sendParent("videojsAttached", null);

      postMessage.addMessageListener("setTime", ({ value }) => {
        vjsplayer.currentTime(value);
      });

      postMessage.addMessageListener("pause", () => {
        void vjsplayer.pause();
      });

      postMessage.addMessageListener("play", () => {
        void vjsplayer.play();
      });

      postMessage.addMessageListener("setVolume", ({ value }) => {
        console.log(value);
        void vjsplayer.volume(value);
      });

      const timeUpdateHandler = (): void => {
        const duration = vjsplayer.duration();
        const currentTime = vjsplayer.currentTime();
        const diff = duration - currentTime;

        if (diff < 30) {
          postMessage.sendParent("nextPlayingGetStartReqest", null);
          vjsplayer.off("timeupdate", timeUpdateHandler);
        }
      };

      vjsplayer.on("loadeddata", () => {
        postMessage.sendParent("loadeddata", null);

        vjsplayer.one("playing", () => {
          postMessage.sendParent("firstPlaying", null);

          vjsplayer.on("timeupdate", timeUpdateHandler);
        });
      });

      vjsplayer.on("ended", () => {
        postMessage.sendParent("ended", null);
      });
    }
  }, []);

  return <></>;
};

export default PlayerWrapper;
