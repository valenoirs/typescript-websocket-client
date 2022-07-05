/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      REACT_APP_SOCKET_URI: string
    }
  }