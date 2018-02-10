New-Item -ItemType Directory -Force -Path .\build

.\node_modules\.bin\electron-packager.cmd .\ --platform win32 --arch x64 --icon images\icon.png --out build


Compress-Archive -Update -Path .\build\timetracker-win32-x64 -DestinationPath .\build\timetracker-win32-x64.zip