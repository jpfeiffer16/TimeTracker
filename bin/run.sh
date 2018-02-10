#!/bin/bash

cd ..
./node_modules/.bin/electron client/app.js &
node server/hub.js &

exit