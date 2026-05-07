@echo off
title Archviz Local Server
echo.
echo  Starting local server on http://localhost:8080
echo  (Close this window to stop the server)
echo.

:: Allow PowerShell to run the script without policy block
powershell.exe -ExecutionPolicy Bypass -File "%~dp0server.ps1"

pause
