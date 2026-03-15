# HanYu 汉语学习

Mobile-first приложение для изучения китайского языка.

## Стек

- **Frontend**: React 18, RTK Query, React Router, SASS
- **Backend**: Express, MongoDB, Redis, JWT
- **Deploy**: Nginx, PM2, VPN-сервер

## Запуск (dev)

```bash
# Терминал 1: сервер
cd server && npm run dev

# Терминал 2: клиент
cd client && npm run dev
```

Требуется: MongoDB на localhost:27017, Redis на localhost:6379.

## Seed данных

```bash
cd server && npm run seed
```

## Деплой

```bash
./deploy.sh <SERVER_IP> <SSH_KEY_PATH>
```

## Структура

- `client/` - React SPA (Vite)
- `server/` - Express API
- `nginx.conf` - конфигурация Nginx
- `ecosystem.config.js` - конфигурация PM2
- `deploy.sh` - скрипт деплоя
