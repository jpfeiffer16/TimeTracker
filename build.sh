#! /bin/bash

if [ ! -d "build" ]; then
  mkdir build
fi

rm build/* -r

#Server
echo "Building server"
cd server_native
cargo build --release
cd ..

#Client
echo "Building client"
cd client
./node_modules/.bin/electron-packager ./ --platform linux --arch x64 --icon images/icon.png --out ../build/
./node_modules/.bin/electron-packager ./ --platform win32 --arch x64 --icon images/icon.png --out ../build/

#Create final package
echo "Creating final package"
cp ./.env-prod ../build/timetracker-app-linux-x64/resources/app/.env
cp ../server_native/target/release/server_native ../build/timetracker-app-linux-x64/resources/app/
cd ../build
tar -cvzf timetracker-app-linux-x64.tar.gz timetracker-app-linux-x64
zip -r timetracker-app-win32-x64.zip timetracker-app-win32-x64/*