#! /bin/bash

if [ ! -d "build" ]; then
  mkdir build
fi

rm build/* -r

./node_modules/.bin/electron-packager ./ --platform linux --arch x64 --icon images/icon.png --out build/
./node_modules/.bin/electron-packager ./ --platform darwin --arch x64 --icon images/icon.png --out build/

cd build

tar -cvzf timetracker-linux-x64.tar.gz timetracker-linux-x64
zip -r timetracker-linux-x64.zip timetracker-linux-x64/*
zip -r timetracker-darwin-x64.zip timetracker-darwin-x64/*