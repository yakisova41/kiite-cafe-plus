import {
  MdPinEnd,
  MdPause,
  MdPictureInPicture,
  MdPlayArrow,
  MdOutlineCommentsDisabled,
  MdOutlineComment,
} from "react-icons/md";
import { useVideoJS } from "../react-videojs-player-core";
import { useEffect, useState } from "react";
import VideoTime from "./VideoTime";
import { useComment } from "../comment/Comments";

const ControlBar: React.FunctionComponent<{
  show: boolean;
  isPlay: boolean;
}> = ({ show, isPlay }) => {
  const player = useVideoJS();
  const comment = useComment();

  const [isCommentShow, setCommentShow] = useState(true);
  const [isPip, setIsPip] = useState(false);

  useEffect(() => {
    player?.on("leavepictureinpicture", () => {
      setIsPip(false);
    });

    player?.on("enterpictureinpicture", () => {
      setIsPip(true);
    });
  }, []);

  const togglePlay: React.MouseEventHandler<HTMLButtonElement> = (e): void => {
    e.stopPropagation();

    if (isPlay) {
      player?.pause();
    } else {
      void player?.play();
    }
  };

  const togglePIP: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (!isPip) {
      void player?.requestPictureInPicture();
    } else {
      void player?.exitPictureInPicture();
    }
  };

  const commentToggle = (): void => {
    if (isCommentShow) {
      comment?.disable();
      setCommentShow(false);
    } else {
      comment?.enable();
      setCommentShow(true);
    }
  };

  const handleBarClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={"control-bar" + (show ? "" : " control-bar-hide")}
      onClick={handleBarClick}
    >
      <button className="control-bar-button" onClick={togglePlay}>
        {isPlay ? <MdPause /> : <MdPlayArrow />}
      </button>

      <button className="control-bar-button" onClick={commentToggle}>
        {isCommentShow ? <MdOutlineCommentsDisabled /> : <MdOutlineComment />}
      </button>

      <button className="control-bar-button" onClick={togglePIP}>
        {isPip ? <MdPinEnd /> : <MdPictureInPicture />}
      </button>

      <VideoTime />
    </div>
  );
};

export default ControlBar;
