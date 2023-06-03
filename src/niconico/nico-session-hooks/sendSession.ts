import { SessionResponse } from "./types/session";

export default async function sendSession(session: SessionResponse) {
  await fetch(
    `https://api.dmc.nico/api/sessions/${session.data.session.id}?_format=json&_method=PUT`,
    {
      method: "POST",
      body: JSON.stringify({ session: session.data.session }),
    }
  );
}
