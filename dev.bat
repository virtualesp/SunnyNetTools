@echo off
setlocal EnableExtensions
cd /d "%~dp0"

taskkill /F /IM node.exe
taskkill /F /IM wails3.exe
taskkill /F /IM SunnyNetTools.exe
set GOEXPERIMENT=nodwarf5
set CGO_ENABLED=1
set runDebug=true
rd /s /q frontend\node_modules\.vite
if exist frontend\dist rd /s /q frontend\dist
wails3 dev -config ./build/config.yml -port 9245
endlocal
