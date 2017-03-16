#! /bin/bash
./node_modules/.bin/electron-packager ./ --platform linux --arch x64 --icon images/icon.png
tar -cvzf timetracker-linux-x64.tar.gz timetracker-linux-x64
zip -r build/timetracker-linux-x64.zip build/timetracker-linux-x64/*
# zip 