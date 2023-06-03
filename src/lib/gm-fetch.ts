/**
 * GM_xmlhttpRequestをfetch likeに使用できるラッパー
 */

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type

export function getGmFetch(gmXhr: typeof GM_xmlhttpRequest): GMFetch {
  return async (
    url: string,
    fetchOptions: FetchOptions = { method: "GET" }
  ): Promise<Response> => {
    return await new Promise((resolve) => {
      const { body, ...init } = { url, ...fetchOptions };
      gmXhr({
        ...{ ...init, data: body },
        onload: (res) => {
          resolve(
            new Response(res.response, {
              status: res.status,
              statusText: res.statusText,
            })
          );
        },
      });
    });
  };
}

export interface FetchOptions extends RequestInit {
  method?: "GET" | "POST" | "HEAD";
  headers?: Tampermonkey.RequestHeaders;
  body?: string;
}

export type GMFetch = (
  url: string,
  fetchOptions?: FetchOptions
) => Promise<Response>;
