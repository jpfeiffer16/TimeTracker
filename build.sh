#! /bin/bash

if [ ! -d "build" ]; then
  mkdir build
fi

rm build/* -r

./node_modules/.bin/electron-packager ./client --platform linux --arch x64 --icon images/icon.png --out build/
./node_modules/.bin/electron-packager ./client --platform win32 --arch x64 --icon images/icon.png --out build/

cd build

tar -cvzf timetracker-linux-x64.tar.gz timetracker-linux-x64
zip -r timetracker-win32-x64.zip timetracker-win32-x64/*