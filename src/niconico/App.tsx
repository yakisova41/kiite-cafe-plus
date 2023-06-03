import { useEffect, useState } from "react";
import debugLog from "src/lib/debugLog";
import NicoProvider from "./nico-session-hooks";
import "./style.scss";
import { usePostMessage } from "./post-message-hooks";
import NicoPlayer from "./NicoPlayer";

const App: React.FunctionComponent = () => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const postMessage = usePostMessage();

  useEffect(() => {
    debugLog("Kiite hack niconico client");

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
        <NicoProvider videoId={videoId}>
          <NicoPlayer />
        </NicoProvider>
      )}
    </div>
  );
};

export default App;
