#!/bin/bash
# pm2 start ./api/src/index.ts --interpreter="bun" -n api-docs
# Meant to be ran at the server

git pull origin staging

pm2 stop api-auth

# Build api
cd api
bun install
# npm run build

export NODE_ENV=production && pm2 start api-auth

systemctl restart nginx