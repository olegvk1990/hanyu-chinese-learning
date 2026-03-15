#!/bin/bash
set -e

# Configuration - change these
SERVER_IP="${1:-155.212.180.203}"
SSH_KEY="${2:-~/.ssh/id_rsa}"
REMOTE_DIR="/var/www/hanyu"

echo "=== HanYu Deploy to $SERVER_IP ==="

# 1. Build client
echo "Building client..."
cd client
npm run build
cd ..

# 2. Sync files to server
echo "Syncing files to server..."
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude '.env' \
  --exclude 'client/src' \
  --exclude 'client/node_modules' \
  -e "ssh -i $SSH_KEY" \
  . root@$SERVER_IP:$REMOTE_DIR/

# 3. Install server dependencies and restart
echo "Installing deps and restarting..."
ssh -i $SSH_KEY root@$SERVER_IP << 'REMOTE'
cd /var/www/hanyu/server
npm install --production
cd ..
pm2 restart ecosystem.config.js --update-env || pm2 start ecosystem.config.js
pm2 save
REMOTE

echo "=== Deploy complete! ==="
echo "App: http://$SERVER_IP"
