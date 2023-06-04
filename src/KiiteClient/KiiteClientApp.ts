/* eslint-disable @typescript-eslint/naming-convention */
import { PostMessageEventUtil } from "src/lib/PostMessageEventUtil";
import debugLog from "src/lib/debugLog";
import "./style.scss";

export class KiiteClientApp {
  private readonly iframe: HTMLIFrameElement;
  private readonly postMessage: PostMessageEventUtil;
  private readonly origin: string;
  private nowPlayData!: PlayData;
  private nextPlayData!: PlayData;
  private readonly mode: "pc" | "mobile";

  public constructor(mode: "mobile" | "pc" = "mobile") {
    this.origin = "https://embed.nicovideo.jp";
    this.mode = mode;

    if (mode === "mobile") {
      this.iframe = this.overridePlayer();
    } else {
      this.iframe = this.overridePlayerPC();
    }
    this.postMessage = new PostMessageEventUtil(this.origin);
  }

  public async start(): Promise<void> {
    this.postMessage.addMessageListener("videojsAttached", () => {
      if (this.mode === "pc") {
        this.volumeChangeHandler();
      }
    });

    this.postMessage.addMessageListener("playerRendered", async () => {
      debugLog("Player rendered");

      void this.getNowPlaying().then((now) => {
        this.sendMessage("setVideoId", now.video_id);
        this.nowPlayData = now;
      });
    });

    this.postMessage.addMessageListener("firstPlaying", () => {
      debugLog("Playing");

      this.sendMessage(
        "setTime",
        this.getNowCurrentTime(this.nowPlayData.start_time)
      );
    });

    this.postMessage.addMessageListener("nextPlayingGetStartReqest", () => {
      debugLog("Get nextsong");

      void this.getNextSong().then((next) => {
        debugLog(`Nextsong: ${next.video_id}`);
        this.nextPlayData = next;
      });
    });

    this.postMessage.addMessageListener("ended", () => {
      debugLog("Ended");

      this.nowPlayData = this.nextPlayData;
      this.sendMessage("setVideoId", this.nowPlayData.video_id);
    });
  }

  private overridePlayer(): HTMLIFrameElement {
    const iframe = document.createElement("iframe");
    iframe.src = "https://embed.nicovideo.jp/kiite-embed-client";
    iframe.id = "niconico-client";

    const videos = document.querySelector("#videos");
    if (videos !== null) {
      videos.innerHTML = "";
      videos.appendChild(iframe);
    }

    return iframe;
  }

  private overridePlayerPC(): HTMLIFrameElement {
    const iframe = document.createElement("iframe");
    iframe.src = "https://embed.nicovideo.jp/kiite-embed-client";
    iframe.id = "niconico-client";

    const front = document.querySelector("#cafe_player > .front");
    front?.remove();

    const videos = document.querySelector("#cafe_player > .videos");
    if (videos !== null) {
      videos.innerHTML = "";
      videos.appendChild(iframe);
    }

    return iframe;
  }

  private volumeChangeHandler(): void {
    const volumeValEl = document.querySelector(".volume > .button > .value");

    const getVolSend = () => {
      const volume = Number(volumeValEl?.innerHTML) / 100;
      this.sendMessage("setVolume", volume);

      debugLog("setvol");
    };

    const ob = new MutationObserver(() => {
      getVolSend();
    });

    if (volumeValEl !== null) {
      ob.observe(volumeValEl, {
        childList: true,
        attributes: true,
        characterData: true,
      });

      getVolSend();
    }
  }

  private getNowCurrentTime(startTime: Date): number {
    const startDate = new Date(startTime);
    const nowDate = new Date();
    const diffMs = nowDate.getTime() - startDate.getTime();
    const currentTime = Math.floor(diffMs / 1000);

    return currentTime;
  }

  private sendMessage(type: string, value: any): void {
    this.iframe.contentWindow?.window?.postMessage(
      {
        type,
        value,
      },
      this.origin
    );
  }

  private async getNowPlaying(): Promise<PlayData> {
    const nowPlayRes = await fetch(
      "https://cafeapi.kiite.jp/api/cafe/now_playing"
    );
    return JSON.parse(await nowPlayRes.text());
  }

  private async getNextSong(): Promise<PlayData> {
    const nowPlayRes = await fetch(
      "https://cafeapi.kiite.jp/api/cafe/next_song"
    );
    return JSON.parse(await nowPlayRes.text());
  }
}

export interface PlayData {
  id: number;
  video_id: string;
  title: string;
  artist_id: number;
  artist_name: string;
  start_time: Date;
  msec_duration: number;
  published_at: Date;
  request_user_ids: number[];
  created_at: Date;
  updated_at: Date;
  reasons: Reason[];
  thumbnail: string;
  new_fav_user_ids: number[];
  baseinfo: Baseinfo;
  colors: string[];
  presenter_user_ids: null;
  belt_message: null;
  now_message: null;
  rotate_action: null;
  bpm: number;
  display_playlist_link: boolean;
}

export interface Baseinfo {
  video_id: string;
  title: string;
  first_retrieve: Date;
  description: string;
  genre: string;
  length: string;
  tags: string[];
  thumbnail_url: string;
  view_counter: string;
  comment_num: string;
  mylist_counter: string;
  embeddable: string;
  no_live_play: string;
  user_id: string;
  user_icon_url: string;
  user_nickname: string;
}

export interface Reason {
  type: string;
  user_id: number;
  list_title?: string;
  list_id?: string;
}
