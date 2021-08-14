#!/bin/bash
REPOSITORY=/home/ubuntu/store-2
cd $REPOSITORY

mv client/dist/* ../client

cd server
yarn install
yarn build
pm2 reload api
