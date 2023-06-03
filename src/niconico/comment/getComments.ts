import type { InitialWatchDataType } from "../nico-session-hooks/types/intialWatchData";

export default async function getComments(
  initialWatchData: InitialWatchDataType
): Promise<CommentResponse> {
  const data: CommentResponse = await fetch(
    initialWatchData.data.comment.nvComment.server + "/v1/threads",
    {
      method: "POST",
      body: JSON.stringify({
        additionals: {},
        threadKey: initialWatchData.data.comment.nvComment.threadKey,
        params: initialWatchData.data.comment.nvComment.params,
      }),
      headers: {
        "X-Frontend-Id": "6",
        "X-Frontend-Version": "0",
        "Content-Type": "application/json",
      },
    }
  )
    .then(async (res) => await res.text())
    .then((text) => JSON.parse(text));

  return data;
}

export interface CommentResponse {
  meta: Meta;
  data: Data;
}

export interface Data {
  globalComments: GlobalComment[];
  threads: Thread[];
}

export interface GlobalComment {
  id: string;
  count: number;
}

export interface Thread {
  id: string;
  fork: string;
  commentCount: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  no: number;
  vposMs: number;
  body: string;
  commands: string[];
  userId: string;
  isPremium: boolean;
  score: number;
  postedAt: string;
  nicoruCount: number;
  nicoruId: undefined;
  source: Source;
  isMyPost: boolean;
}

export enum Source {
  Leaf = "leaf",
  Trunk = "trunk",
}

export interface Meta {
  status: number;
}
