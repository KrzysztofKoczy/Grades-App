export interface Toast {
    id: string
    message: string
    type: ToastType
    duration?: number
  }
  
  export enum ToastType {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    INFO = 'INFO',
  }