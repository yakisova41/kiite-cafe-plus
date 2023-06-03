import niconicoClient from "./niconico/main";
import { KiiteClientApp } from "./KiiteClient/KiiteClientApp";

export default function main(): void {
  if (location.href === "https://cafe.kiite.jp/") {
    const kiite = new KiiteClientApp("mobile");
    void kiite.start();
  }

  if (location.href === "https://cafe.kiite.jp/pc") {
    const kiite = new KiiteClientApp("pc");
    void kiite.start();
  }

  if (location.href === "https://embed.nicovideo.jp/kiite-embed-client") {
    niconicoClient();
  }
}
