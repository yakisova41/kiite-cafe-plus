import { useState, useEffect, useRef } from "react";
import { useVideoJS } from "niconico-react-vjs";
import ControlBar from "./ControlBar";
import { usePostMessage } from "../post-message-hooks";

const ControlContainer: React.FunctionComponent = () => {
  const [isShow, setIsShow] = useState(false);
  const [isPlay, setPlay] = useState(false);
  const [barShow, setBarShow] = useState(false);
  const barShowInterval = useRef<NodeJS.Timer>();
  const postMessage = usePostMessage();

  const player = useVideoJS();

  useEffect(() => {
    player?.one("playing", () => {
      setIsShow(true);
    });

    player?.on("play", () => {
      setPlay(true);
      postMessage?.sendParent("timeSyncRequest", null);
    });

    player?.on("pause", () => {
      setPlay(false);
    });
  }, []);

  const clickHandler = (): void => {
    if (isPlay) {
      player?.pause();
    } else {
      void player?.play();
    }
  };

  const mouseMoveOverHandler = (): void => {
    setBarShow(true);
    clearTimeout(barShowInterval.current);

    barShowInterval.current = setTimeout(() => {
      setBarShow(false);
    }, 5000);
  };

  return isShow ? (
    <div
      className="control-container overlay"
      onClick={clickHandler}
      onMouseOver={mouseMoveOverHandler}
      onMouseMove={mouseMoveOverHandler}
      onTouchStartCapture={mouseMoveOverHandler}
    >
      <ControlBar show={barShow} isPlay={isPlay} />
    </div>
  ) : (
    <></>
  );
};

export default ControlContainer;
