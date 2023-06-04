import { useVideoJS } from "../react-videojs-player-core";
import React, { useRef, useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import durationplugin from "dayjs/plugin/duration";

const VideoTime: React.FunctionComponent = () => {
  const player = useVideoJS();
  const timeInterval = useRef<NodeJS.Timer | undefined>(undefined);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const timeUpdate = (): void => {
      if (player !== null) {
        timeInterval.current = setInterval(() => {
          setCurrentTime(player.currentTime());
          setDuration(player.duration());
        }, 500);

        const intervalClear = (): void => {
          player.off("pause", intervalClear);
          player.off("ended", intervalClear);
          clearInterval(timeInterval.current);
        };

        player.one("pause", intervalClear);
        player.one("ended", intervalClear);
      }
    };

    player?.on("play", () => {
      if (timeInterval.current !== undefined) {
        clearInterval(timeInterval.current);
      }

      timeUpdate();
    });

    timeUpdate();
  }, []);

  function convertToMmss(seconds: number): string {
    dayjs.extend(utc);
    dayjs.extend(durationplugin);
    const day = dayjs().subtract(Math.round(seconds), "seconds");
    const mili = dayjs.duration(dayjs().diff(day));
    return dayjs.utc(mili.asMilliseconds()).format("mm:ss");
  }

  return (
    <div className="video-time">
      <span>
        {convertToMmss(currentTime)} / {convertToMmss(duration)}
      </span>
    </div>
  );
};

export default VideoTime;
