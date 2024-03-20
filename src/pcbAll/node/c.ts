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
      "port": 61414
    },
    "server": {
      "ws": {
        "": "",
        "port": 61415
      }
    }
  },
  "admins": {
    "web": {
      "port": 61416
    },
    "server": {
      "ws": {
        "port": 61417
      }
    }
  },
  "visitor": {
    "web": {
      "host": "localhost",
      "port": 61416
    },
    "server": {
      "ws": {
        "host": "localhost",
        "port": 61418
      }
    }
  }
} as const