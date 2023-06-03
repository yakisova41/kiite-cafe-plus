import React, {
  type ReactNode,
  createContext,
  useContext,
  useRef,
} from "react";
import { PostMessageEventUtil } from "../../lib/PostMessageEventUtil";

const MessageEventWrapperProvider: React.FunctionComponent<{
  children: ReactNode;
  origin: string;
}> = ({ children, origin }) => {
  const wrapperRef = useRef<PostMessageEventUtil | null>(null);

  wrapperRef.current = new PostMessageEventUtil(origin);
  return (
    <MessageEventWrapperCtx.Provider value={wrapperRef.current}>
      {wrapperRef.current !== null && children}
    </MessageEventWrapperCtx.Provider>
  );
};

export default MessageEventWrapperProvider;

export const MessageEventWrapperCtx =
  createContext<PostMessageEventUtil | null>(null);

export const usePostMessage: () => PostMessageEventUtil | null = () =>
  useContext(MessageEventWrapperCtx);
