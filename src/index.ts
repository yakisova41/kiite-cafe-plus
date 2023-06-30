import niconicoClient from "./niconico/main";
import { KiiteClientApp } from "./KiiteClient/KiiteClientApp";

export default function main(): void {
  if (location.href === "https://cafe.kiite.jp/") {
    const kiite = new KiiteClientApp("mobile");
    kiite.start();
    kiite.attachDebugCommands();
  }

  if (location.href === "https://cafe.kiite.jp/pc") {
    const kiite = new KiiteClientApp("pc");
    kiite.start();
    kiite.attachDebugCommands();
  }

  if (location.href === "https://embed.nicovideo.jp/kiite-embed-client") {
    niconicoClient();
  }
}

declare global {
  interface Window {
    _kcp: {
      setVideo: (id: string) => void;
      setTime: (time: number) => void;
      reSync: () => void;
    };
  }
}
