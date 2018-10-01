export enum WebsocketType {
  API = '/api',
  EVENT = '/event'
}
export enum WebsocketState {
  DISABLED = -1,
  INIT = 0,
  CONNECTING = 1,
  CONNECTED = 2,
  CLOSING = 3,
  CLOSED = 4
}
export interface CQRequestOptions {
  timeout: number
}
export interface CQWebSocketOption {
  access_token: string
  enableAPI: boolean
  enableEvent: boolean
  host: string
  port: number
  baseUrl: string
  qq: number | string
  reconnection: boolean
  reconnectionAttempts: number
  reconnectionDelay: number
  fragmentOutgoingMessages: boolean
  fragmentationThreshold: number
  tlsOptions: any
  requestOptions: CQRequestOptions
}

type BaseEvents = 'message'
                    | 'notice'
                    | 'request'
                    | 'error'
                    | 'ready'
type MessageAtEvents = 'message.discuss.@' | 'message.group.@'
type MessageEvents = 'message.private'
                    | 'message.discuss'
                    | 'message.discuss.@'
                    | 'message.discuss.@.me'
                    | 'message.group'
                    | 'message.group.@'
                    | 'message.group.@.me'

type NoticeEvents = 'notice.group_upload'
                    | 'notice.group_admin.set'
                    | 'notice.group_admin.unset'
                    | 'notice.group_decrease.leave'
                    | 'notice.group_decrease.kick'
                    | 'notice.group_decrease.kick_me'
                    | 'notice.group_increase.approve'
                    | 'notice.group_increase.invite'
                    | 'notice.friend_add'
                    // node
                    | 'notice.group_admin'
                    | 'notice.group_decrease'
                    | 'notice.group_increase'

type RequestEvents = 'request.friend'
                    | 'request.group.add'
                    | 'request.group.invite'
                    // node
                    | 'request.group'

type SocketEvents = 'socket.connecting'
                    | 'socket.connect'
                    | 'socket.failed'
                    | 'socket.reconnecting'
                    | 'socket.reconnect'
                    | 'socket.reconnect_failed'
                    | 'socket.max_reconnect'
                    | 'socket.closing'
                    | 'socket.close'
                    | 'socket.error'

type APIEvents = 'api.send.pre' | 'api.send.post' | 'api.response'

type Events = BaseEvents | MessageEvents | NoticeEvents | RequestEvents | SocketEvents | APIEvents

type Promisable<T> = Promise<T> | T
type ListenerReturn = Promisable<string | void | undefined>
type MessageEventListener = (event: CQEvent, context: Record<string, any>) => ListenerReturn
type MessageAtEventListener = (event: CQEvent, context: Record<string, any>, tags: CQAtTag[]) => ListenerReturn
type ContextEventListener = (context: Record<string, any>) => ListenerReturn
type SocketEventListener = (type: WebsocketType, attempts: number) => ListenerReturn
type SocketExcludeType = 'socket.connect' | 'socket.closing' | 'socket.close' | 'socket.error'

export interface ApiTimeoutError extends Error {

}

export class CQEvent {
  stopPropagation (): void
  getMessage (): string
  setMessage (msg: string): void
  appendMessage (msg: string): void
  hasMessage (): boolean
  onResponse (handler: (res: object) => void, options: number | CQRequestOptions): void
  onError (handler: (err: ApiTimeoutError) => void): void
}

export interface CQTag {
  constructor (type: string, meta: Record<string, any>): CQTag
  equals (equals: string | CQTag): boolean
  toString (): string
}

export interface CQAtTag extends CQTag {
  constructor (qq: number | string): CQAtTag
  getQQ (): number
}
export interface APIRequest {
  action: string,
  params?: any
}
export interface APIResponse {
  status: string,
  retcode: number,
  data: any
}

export class CQWebSocket {
  constructor (opt?: Partial<CQWebSocketOption>)

  connect (wsType?: WebsocketType): CQWebSocket
  disconnect (wsType?: WebsocketType): CQWebSocket
  reconnect (delay: number, wsType?: WebsocketType): CQWebSocket
  isSockConnected (wsType: WebsocketType): CQWebSocket
  isReady (): boolean

  on (event_type: Exclude<MessageEvents, MessageAtEvents> | 'message', listener: MessageEventListener): CQWebSocket
  on (event_type: MessageAtEvents, listener: MessageAtEventListener): CQWebSocket
  on (event_type: NoticeEvents | RequestEvents | 'notice' | 'request', listener: ContextEventListener): CQWebSocket
  on (event_type: Exclude<SocketEvents, SocketExcludeType>, listener: SocketEventListener): CQWebSocket
  on (event_type: 'socket.connect', listener: (type: WebsocketType, socket: any, attempts: number) => void): CQWebSocket
  on (event_type: 'socket.closing', listener: (type: WebsocketType) => void): CQWebSocket
  on (event_type: 'socket.close', listener: (type: WebsocketType, code: number, desc: string) => void): CQWebSocket
  on (event_type: 'socket.error', listener: (type: WebsocketType, err: Error) => void): CQWebSocket
  on (event_type: 'api.send.pre', listener: (apiRequest: APIRequest) => void): CQWebSocket
  on (event_type: 'api.send.post', listener: () => void): CQWebSocket
  on (event_type: 'api.response', listener: (result: APIResponse) => void): CQWebSocket
  on (event_type: 'error', listener: (err: Error) => void): CQWebSocket
  on (event_type: 'ready', listener: () => void): CQWebSocket

  once (event_type: Exclude<MessageEvents, MessageAtEvents> | 'message', listener: MessageEventListener): CQWebSocket
  once (event_type: MessageAtEvents, listener: MessageAtEventListener): CQWebSocket
  once (event_type: NoticeEvents | RequestEvents | 'notice' | 'request', listener: ContextEventListener): CQWebSocket
  once (event_type: Exclude<SocketEvents, SocketExcludeType>, listener: SocketEventListener): CQWebSocket
  once (event_type: 'socket.connect', listener: (type: WebsocketType, socket: any, attempts: number) => void): CQWebSocket
  once (event_type: 'socket.closing', listener: (type: WebsocketType) => void): CQWebSocket
  once (event_type: 'socket.close', listener: (type: WebsocketType, code: number, desc: string) => void): CQWebSocket
  once (event_type: 'socket.error', listener: (type: WebsocketType, err: Error) => void): CQWebSocket
  once (event_type: 'api.send.pre', listener: (apiRequest: APIRequest) => void): CQWebSocket
  once (event_type: 'api.send.post', listener: () => void): CQWebSocket
  once (event_type: 'api.response', listener: (result: APIResponse) => void): CQWebSocket
  once (event_type: 'error', listener: (err: Error) => void): CQWebSocket
  once (event_type: 'ready', listener: () => void): CQWebSocket

  off (event_type: Events, listener: Function): CQWebSocket
}
export interface CQWebSocket {
  <T>(method: string, params?: Record<string, any>, options?: number | CQRequestOptions): Promise<T>
}

export default CQWebSocket
