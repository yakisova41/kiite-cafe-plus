export class PostMessageEventUtil {
  private readonly messageHandlers: Array<{
    type: string;
    callback: (data: PostMessage) => any;
  }> = [];

  constructor(origin: string) {
    window.addEventListener("message", (event) => {
      if (event.origin === origin) {
        const data: PostMessage = event.data;

        this.messageHandlers.forEach((handler) => {
          if (handler.type === data.type) {
            handler.callback(data);
          }

          if (handler.type === "*") {
            handler.callback(data);
          }
        });
      }
    });
  }

  public addMessageListener(
    type: string,
    callback: (data: PostMessage) => any
  ): void {
    this.messageHandlers.push({
      type,
      callback,
    });
  }

  public removeMessageListener(
    type: string,
    callback: (data: PostMessage) => any
  ): void {
    this.messageHandlers.forEach((handler, index) => {
      if (handler.type === type && handler.callback === callback) {
        this.messageHandlers.splice(index, 1);
      }
    });
  }

  public one(type: string, callback: (data: PostMessage) => any): void {
    const callbackFnc = (data: PostMessage): any => {
      callback(data);
      this.removeMessageListener(type, callbackFnc);
    };

    this.messageHandlers.push({
      type,
      callback: callbackFnc,
    });
  }

  public dispatch(type: string, value: any): void {
    this.messageHandlers.forEach((handler) => {
      if (handler.type === type) {
        handler.callback({ type, value });
      }
    });
  }

  public sendParent(type: string, value: any, origin: string = "*"): void {
    window.parent.postMessage({ type, value }, origin);
  }
}

export interface PostMessage {
  type: string;
  value: any;
}
