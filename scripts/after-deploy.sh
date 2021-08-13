#!/bin/bash
REPOSITORY=/home/ubuntu/store-2
cd $REPOSITORY

mv client/dist/* ../client

cd server
yarn install
node dist/app.js
