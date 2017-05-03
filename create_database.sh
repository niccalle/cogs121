#!/bin/bash

npm install
npm install -g
node node_modules/db-migrate/bin/db-migrate db:create route_preview --config ./config/before_create_database.json
