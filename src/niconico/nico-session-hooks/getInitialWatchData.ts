import type { InitialWatchDataType } from "./types/intialWatchData";
import type { IframeDataProps } from "./types/iframeDataProps";

export default async function getInitialWatchData(
  videoId: string
): Promise<InitialWatchDataType | null> {
  const iframeRes = await fetch(
    `https://embed.nicovideo.jp/watch/${videoId}?jsapi=1&playerId=2&noRelatedVideo=0&autoplay=1&mute=0&defaultNoComment=1&noLinkToNiconico=0&noController=0&noHeader=0&noTags=0&noShare=1&noVideoDetail=0&allowProgrammaticFullScreen=1&noIncrementViewCount=0&persistence=1&disableAdCheck=0`
  );
  const iframeRoot = document.createElement("div");
  iframeRoot.innerHTML = await iframeRes.text();
  const player = iframeRoot.querySelector("#ext-player");
  const iframeDataPropsText = player?.getAttribute("data-props");
  if (iframeDataPropsText !== null && iframeDataPropsText !== undefined) {
    const iframeDataProps: IframeDataProps = JSON.parse(iframeDataPropsText);
    const res = await fetch(
      `https://www.nicovideo.jp/api/watch/v3_guest/${videoId}?_frontendId=70&_frontendVersion=0&actionTrackId=${iframeDataProps.actionTrackId}&skips=harmful&noSideEffect=false&i18nLanguage=ja-jp&t=1685257525946`
    );
    const text = await res.text();
    const initialWatchData: InitialWatchDataType = JSON.parse(text);
    return initialWatchData;
  } else {
    return null;
  }
}
