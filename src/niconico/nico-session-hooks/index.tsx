/**
 * ニコニコ動画のセッション処理、セッションの維持
 */

import getInitialWatchData from "./getInitialWatchData";
import getSession from "./getSession";
import { type InitialWatchDataType } from "./types/intialWatchData";
import React, {
  useRef,
  useState,
  createContext,
  type ReactNode,
  useEffect,
  useContext,
} from "react";
import { type SessionResponse } from "./types/session";
import sendSession from "./sendSession";

const NicoProvider: React.FunctionComponent<NicoProviderProps> = ({
  children,
  videoId,
}: NicoProviderProps) => {
  const [ready, setReady] = useState(false);
  const initialWatchData = useRef<InitialWatchDataType>();
  const session = useRef<SessionResponse>();
  const heatBeat = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    setReady(false);

    if (heatBeat.current !== null) {
      clearInterval(heatBeat.current);
    }

    getInitialWatchData(videoId)
      .then((iData) => {
        if (iData !== null) {
          getSession(iData)
            .then((sessionRes) => {
              initialWatchData.current = iData;
              session.current = sessionRes;
              setReady(true);

              heatBeat.current = setInterval(() => {
                void sendSession(sessionRes);
              }, 40000);
            })
            .catch((e) => {
              console.error(e);
            });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }, [videoId]);

  return (
    <NicoDataContext.Provider
      value={{
        ready,
        initialWatchData: initialWatchData.current,
        session: session.current,
      }}
    >
      {children}
    </NicoDataContext.Provider>
  );
};
export default NicoProvider;

interface NicoProviderProps {
  children: ReactNode;
  videoId: string;
}

export const NicoDataContext = createContext<NicoData>({ ready: false });
export const useNico: () => NicoData = () => useContext(NicoDataContext);
export interface NicoData {
  ready: boolean;
  session?: SessionResponse;
  initialWatchData?: InitialWatchDataType;
}
