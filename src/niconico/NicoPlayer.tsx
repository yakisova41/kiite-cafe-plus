import ReactVideoJSPlayer from "./react-videojs-player-core";
import { useNico } from "./nico-session-hooks";
import PlayerWrapper from "./PlayerWrapper";
import { useEffect } from "react";
import Comments from "./comment/Comments";

const NicoPlayer: React.FunctionComponent = () => {
  const { session, initialWatchData } = useNico();

  useEffect(() => {
    if (initialWatchData !== undefined) {
      const nickname =
        initialWatchData?.data.owner?.nickname ??
        initialWatchData?.data.channel.name;

      navigator.mediaSession.metadata = new MediaMetadata({
        title: initialWatchData?.data.video.title,
        artist: nickname,
        artwork: [
          {
            src: String(initialWatchData?.data.video.thumbnail.url),
            sizes: "130x100",
            type: "image/jpeg",
          },
        ],
      });
    }
  }, [initialWatchData]);

  return (
    <div className="nico-player-outer">
      <ReactVideoJSPlayer
        src={session?.data.session.content_uri}
        id="nico-player"
        controls
        autoPlay
        playsInline
        options={{}}
      >
        <PlayerWrapper />
        <Comments />
      </ReactVideoJSPlayer>
    </div>
  );
};

export default NicoPlayer;
