import { useEffect, useState } from "react";
import debugLog from "src/lib/debugLog";
import "./style.scss";
import { usePostMessage } from "./post-message-hooks";
import NicoPlayer from "./NicoPlayer";
import { Comments, NiconicoReactVjs } from "niconico-react-vjs/dist";
import "niconico-react-vjs/dist/style.css";

const App: React.FunctionComponent = () => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const postMessage = usePostMessage();

  useEffect(() => {
    debugLog("Kiite plus niconico client");

    postMessage?.addMessageListener("setVideoId", ({ value }) => {
      debugLog(`new VideoId: ${String(value)}`);
      setVideoId(value);
    });

    postMessage?.sendParent("playerRendered", null);
  }, []);

  useEffect(() => {}, [videoId]);

  return (
    <div className="embed-wrapper">
      {videoId !== null && (
        <NiconicoReactVjs
          videoid={videoId}
          width={1920}
          height={1080}
          playsInline
          autoPlay
        >
          <Comments>
            <NicoPlayer />
          </Comments>
        </NiconicoReactVjs>
      )}
    </div>
  );
};

export default App;
