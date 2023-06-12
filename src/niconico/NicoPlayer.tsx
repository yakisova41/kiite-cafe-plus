import ReactVideoJSPlayer from "./react-videojs-player-core";
import { useNico } from "./nico-session-hooks";
import PlayerWrapper from "./PlayerWrapper";
import { useEffect } from "react";
import Comments from "./comment/Comments";
import Controls from "./controls";

const NicoPlayer: React.FunctionComponent = () => {
  const { session, initialWatchData } = useNico();

  useEffect(() => {
    if (initialWatchData !== undefined) {
      const nickname =
        initialWatchData?.data.owner?.nickname ??
        initialWatchData?.data.channel.name ??
        "UNKNOWN";

      void trimArtWork(
        String(initialWatchData?.data.video.thumbnail.player)
      ).then((artworkURL) => {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: initialWatchData?.data.video.title,
          artist: nickname,
          artwork: [
            {
              src: artworkURL,
              sizes: "540x540",
              type: "image/png",
            },
          ],
        });
      });
    }
  }, [initialWatchData]);

  return (
    <div className="nico-player-outer">
      <ReactVideoJSPlayer
        src={session?.data.session.content_uri}
        id="nico-player"
        autoPlay
        playsInline
        options={{}}
      >
        <PlayerWrapper />
        <Comments>
          <Controls />
        </Comments>
      </ReactVideoJSPlayer>
    </div>
  );
};

/**
 * サムネイルの正方形化
 */
async function trimArtWork(artWorkSrc: string): Promise<string> {
  return await new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const size = 540;
    const originalWidth = 960;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.onload = () => {
      ctx?.drawImage(img, ((originalWidth - size) / 2) * -1, 0);
      const dataURL = canvas.toDataURL("image/png");
      canvas.remove();
      resolve(dataURL);
    };
    img.crossOrigin = "anonymous";
    img.src = artWorkSrc;
  });
}

export default NicoPlayer;
