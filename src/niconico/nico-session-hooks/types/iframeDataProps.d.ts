export interface IframeDataProps {
  videoWatchId: string;
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  firstRetrieve: number;
  lengthInSeconds: number;
  viewCounter: number;
  mylistCounter: number;
  defaultThread: string;
  hasOwnerThread: boolean;
  backCommentMode: number;
  hasLargeThumbnail: boolean;
  isCommunityOnly: boolean;
  isSecureHLS: boolean;
  showAds: boolean;
  playOption: Record<string, boolean>;
  tags: string[];
  thread: Thread;
  actionTrackId: string;
  videoUploaderId: number;
  frontendId: number;
  frontendVersion: string;
  nicovideoServerUrl: string;
  nicovideoSpwebServerUrl: string;
  channelServerUrl: string;
  thumbWatchServerUrl: string;
  flapiServerUrl: string;
  nvapiServerUrl: string;
  extplayervUrl: string;
  nicobusUrl: string;
  astralUrl: string;
  adsResUrl: string;
  qaUrl: string;
  isProduction: boolean;
  hasUserSession: boolean;
  isSp: boolean;
  os: Browser;
  browser: Browser;
  isIPad: boolean;
  androidStandardBrowser: boolean;
  nicosid: string;
  jsApiEnable: boolean;
  fromMs: number;
  parentUrl: string;
  isHttps: boolean;
  izumoSite: string;
  noIncrementViewCountAtFirst: boolean;
}

export interface Browser {
  type: number;
  version: string;
}

export interface Thread {
  id: string;
  commentCounter: number;
  groupType: number;
}
