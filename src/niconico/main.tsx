import ReactDOM from "react-dom/client";
import App from "./App";
import MessageEventWrapperProvider from "./post-message-hooks";

/**
 * ニコニコ動画の埋め込みのoriginを使ってHLSを取得しvideojsを用いて再生します。
 */
export default function niconicoClient(): void {
  document.body.innerHTML = "";
  const rootEl = document.createElement("div");
  rootEl.id = "root";
  document.body.appendChild(rootEl);

  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <MessageEventWrapperProvider origin="https://cafe.kiite.jp">
      <App />
    </MessageEventWrapperProvider>
  );
}
