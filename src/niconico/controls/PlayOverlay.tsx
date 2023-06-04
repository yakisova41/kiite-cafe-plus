import React, { useEffect, useState } from "react";
import { MdPlayArrow } from "react-icons/md";
import { useVideoJS } from "../react-videojs-player-core";

const PlayOverlay: React.FunctionComponent = () => {
  const player = useVideoJS();
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    player?.one("canplay", () => {
      setIsShow(true);
    });
  }, []);

  const clickHandler = (): void => {
    void player?.play();
    setIsShow(false);
  };

  return isShow ? (
    <div className="overlay initial-play-click-overlay">
      <button className="playButton" onClick={clickHandler}>
        <MdPlayArrow />
      </button>
    </div>
  ) : (
    <></>
  );
};

export default PlayOverlay;
