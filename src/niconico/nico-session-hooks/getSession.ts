/* eslint-disable array-callback-return */
import type { InitialWatchDataType } from "./types/intialWatchData";
import type { SessionResponse } from "./types/session";

export default async function getSession(
  initialWatchData: InitialWatchDataType
): Promise<SessionResponse> {
  const res = await fetch("https://api.dmc.nico/api/sessions?_format=json", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payloadGenerator(initialWatchData)),
  });
  const text = await res.text();
  const sessionRes: SessionResponse = JSON.parse(text);
  return sessionRes;
}

function payloadGenerator(initialWatchData: InitialWatchDataType): any {
  const videoSrcIds = initialWatchData.data.media.delivery.movie.videos
    .filter(({ isAvailable }) => {
      if (isAvailable) {
        return true;
      }
    })
    .map(({ id }) => {
      return id;
    });

  const audioSrcIds = initialWatchData.data.media.delivery.movie.audios
    .filter(({ isAvailable }) => {
      if (isAvailable) {
        return true;
      }
    })
    .map(({ id }) => {
      return id;
    });

  return {
    session: {
      recipe_id: "nicovideo-" + initialWatchData.data.video.id,
      content_id: "out1",
      content_type: "movie",
      content_src_id_sets: [
        {
          content_src_ids: [
            {
              src_id_to_mux: {
                audio_src_ids: audioSrcIds,
                video_src_ids: videoSrcIds,
              },
            },
            {
              src_id_to_mux: {
                audio_src_ids: [audioSrcIds[audioSrcIds.length - 1]],
                video_src_ids: [videoSrcIds[videoSrcIds.length - 1]],
              },
            },
          ],
        },
      ],
      timing_constraint: "unlimited",
      keep_method: { heartbeat: { lifetime: 120000 } },
      protocol: {
        name: "http",
        parameters: {
          http_parameters: {
            parameters: {
              hls_parameters: {
                use_well_known_port: "yes",
                use_ssl: "yes",
                transfer_preset: "",
                segment_duration: 6000,
              },
            },
          },
        },
      },
      content_uri: "",
      session_operation_auth: {
        session_operation_auth_by_signature: {
          token: initialWatchData.data.media.delivery.movie.session.token,
          signature:
            initialWatchData.data.media.delivery.movie.session.signature,
        },
      },
      content_auth: {
        auth_type: "ht2",
        content_key_timeout: 600000,
        service_id: "nicovideo",
        service_user_id:
          initialWatchData.data.media.delivery.movie.session.serviceUserId,
      },
      client_info: {
        player_id: initialWatchData.data.media.delivery.movie.session.playerId,
      },
      priority: initialWatchData.data.media.delivery.movie.session.priority,
    },
  };
}
