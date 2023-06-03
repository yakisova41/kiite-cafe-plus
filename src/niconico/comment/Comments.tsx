import { useEffect, useRef } from "react";
import { useNico } from "../nico-session-hooks";
import getComments from "./getComments";
import NiconiComments from "@xpadev-net/niconicomments";
import { useVideoJS } from "../react-videojs-player-core";

const Comments: React.FunctionComponent = () => {
  const { initialWatchData } = useNico();
  const niconiComments = useRef<NiconiComments>();
  const commentInterval = useRef<NodeJS.Timer>();
  const vjsPlayer = useVideoJS();

  useEffect(() => {
    const commentLayer =
      document.querySelector<HTMLCanvasElement>("#comment-layer");
    if (commentLayer === null) {
      return;
    }

    if (initialWatchData !== undefined) {
      clearInterval(commentInterval.current);

      void getComments(initialWatchData).then((commentsRes) => {
        niconiComments.current = new NiconiComments(
          commentLayer,
          commentsRes.data.threads,
          {
            format: "v1",
            scale: 1,
            mode: "default",
          }
        );
      });

      commentInterval.current = setInterval(() => {
        const time = vjsPlayer?.currentTime();
        if (time === undefined) {
          clearInterval(commentInterval.current);
          return;
        }

        niconiComments.current?.drawCanvas(Math.floor(time * 100));
      }, 10);
    }
  }, [initialWatchData]);

  return <canvas id="comment-layer" width={1920} height={1080}></canvas>;
};

export default Comments;
