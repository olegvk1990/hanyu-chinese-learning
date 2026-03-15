# Deployment Guide

## Server: DMIT Japan Tokyo 3
- IP: 154.31.119.20
- Port 80: HanYu App (Docker nginx)
- Port 443: xRay VPN (untouched)

## GitHub Secrets Required

Set these in GitHub repo Settings -> Secrets -> Actions:

| Secret | Value |
|--------|-------|
| SERVER_HOST | 154.31.119.20 |
| SSH_PRIVATE_KEY | Content of ~/.ssh/dmit/id_rsa.pem |
| JWT_SECRET | A strong random string for JWT signing |

## Manual Deploy

```bash
ssh -i ~/.ssh/dmit/id_rsa.pem root@154.31.119.20
cd /opt/hanyu
docker compose down
docker compose build --no-cache
docker compose up -d
docker compose --profile seed run --rm seed
```

## Seed Data Update

To update words/grammar without restarting:
```bash
docker compose --profile seed run --rm seed
```

## View Logs

```bash
docker compose logs -f server
docker compose logs -f client
docker compose logs -f mongo
```

## Useful Commands

```bash
# Check status
docker compose ps

# Restart specific service
docker compose restart server

# MongoDB shell
docker compose exec mongo mongosh hanyu

# Redis CLI
docker compose exec redis redis-cli
```
