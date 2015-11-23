#initial build
npm run build todo-server -- -uahst
##Start Static server
http-sever demos/client
##Initialize Live Reload https://github.com/napcs/node-livereload
livereload\
  --watch demos/client
#Watch Styles
nodemon\
  --watch demos/style\
  --ext css\
  --verbose\
  --on-change-only\
  --exec "npm run build todo-server -- --no-u --no-a --no-h --no-s"
#Watch Components
nodemon\
  --watch demos/component\
  --ext js\
  --verbose\
  --on-change-only\
  --exec "npm run build todo-server -- --no-u --no-a --no-s --no-t"
#Watch Assets (specify extension)
nodemon\
  --watch demos/assets\
  --ext mp3,mp4,gif,jpg,png,txt,html,wav,svg\
  --verbose\
  --on-change-only\
  --exec "npm run build todo-server -- --no-u --no-h --no-s --no-t"
#Watch Scripts
nodemon\
  --watch demos/script\
  --ext js\
  --verbose\
  --on-change-only\
  --exec "npm run build todo-server -- --no-u --no-a --no-h --no-t"
