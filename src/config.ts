
const ipv4="192.168.110.112"
export default {
  "mysql": {
    "host": "localhost",
    "port": 3306,
    "user": "username",
    "password": "password",
    "database": "database"
  },
  "pcbDz002": {
    "web": {
      "name": "设备dz002配置管理页",
      "uri": `https://${ipv4}:61414`,
    }
  },
  "pcbDz002s": {
    "server": {
      "name": "设备dz002s服务",
      "wsuri": `ws://${ipv4}:61415`,
    }
  },
  "admins": {
    "web": {
      "name": "管理员网页",
      "uri": `https://${ipv4}:61416`,
    },
    "server": {
      "name": "管理员服务",
      "wsuri": `ws://${ipv4}:61417`,
    }
  },
  "visitor": {
    "web": {
      "name": "访客网页",
      "uri": `https://${ipv4}:61418`,
    },
    "server": {
      "name": "访客服务",
      "wsuri": `ws://${ipv4}:61419`,
    }
  },

} as const