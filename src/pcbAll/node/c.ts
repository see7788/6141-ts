export default {
  "mysql": {
    "host": "localhost",
    "port": 3306,
    "user": "username",
    "password": "password",
    "database": "database"
  },
  "dz002s": {
    "web": {
      "name": "设备dz002s网页",
      "port": 61414
    },
    "wsServer": {
      "name": "设备dz002s服务websocket",
      "host": "localhost",
      "port": 61415
    }
  },
  "admins": {
    "web": {
      "name": "总管理员网页",
      "host": "localhost",
      "port": 61416
    },
    "wsServer": {
      "name": "总管理员服务websocket",
      "host": "localhost",
      "port": 61417
    }
  },
  "visitor": {
    "web": {
      "name": "访客网页",
      "host": "localhost",
      "port": 61418
    },
    "wsServer": {
      "name": "访客服务websocket",
      "host": "localhost",
      "port": 61419
    }
  }
} as const