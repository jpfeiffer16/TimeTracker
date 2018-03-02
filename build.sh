#! /bin/bash

if [ ! -d "build" ]; then
  mkdir build
fi

rm build/* -r

cd client

./node_modules/.bin/electron-packager ./ --platform linux --arch x64 --icon images/icon.png --out ../build/
./node_modules/.bin/electron-packager ./ --platform win32 --arch x64 --icon images/icon.png --out ../build/

cp ./.env-prod ../build/timetracker-linux-x64/resources/app/.env

cp ../server_native/target/debug/server_native ../build/timetracker-linux-x64/resources/app/

cd ../build

tar -cvzf timetracker-linux-x64.tar.gz timetracker-linux-x64
zip -r timetracker-win32-x64.zip timetracker-win32-x64/*