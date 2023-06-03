/* eslint-disable @typescript-eslint/restrict-plus-operands */
import dayjs from "dayjs";

export function debugLog(msg: string): void {
  const date = new Date();
  const time = dayjs(date).format();

  console.log("\u001b[31m[KIITE CAFE PlUS]\u001b[32m " + time, msg);
}

export function debugError(msg: string): void {
  const date = new Date();
  const time = dayjs(date).format();

  console.error("\u001b[31m[KIITE CAFE PlUS]\u001b[32m " + time, msg);
}

export default debugLog;
