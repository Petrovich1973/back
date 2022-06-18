BOFL emulator
============================================
Создать файл .npmrc с содержимым
```
registry=http://sbtnexus.delta.sbrf.ru:8081/nexus/content/groups/npm-all/
email=email
_auth=base64 login:password
always-auth=true
strict-ssl=false
```
Скачать зависимости
```
npm install
```
Запустить
```
npm start
```

реализовано
```
POST /task
GET /task
GET /task/:id
POST /report
POST /report/read
GET /role
GET /reportScheme
GET /reportScheme/:id
```