@echo off
:: Launch Chrome with file:// access allowed (fixes WebGL panorama texture loading)
:: This flag is SAFE for local development only - do NOT use for browsing the web.

set "PAGE=%~dp0index.html"

:: Try Chrome first
set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" set "CHROME=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" set "CHROME=%LocalAppData%\Google\Chrome\Application\chrome.exe"

:: Try Edge as fallback
set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not exist "%EDGE%" set "EDGE=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"

if exist "%CHROME%" (
    echo Launching Chrome with local file access enabled...
    start "" "%CHROME%" --allow-file-access-from-files --user-data-dir="%TEMP%\archviz-dev-profile" "%PAGE%"
    goto :done
)

if exist "%EDGE%" (
    echo Launching Edge with local file access enabled...
    start "" "%EDGE%" --allow-file-access-from-files --user-data-dir="%TEMP%\archviz-dev-profile" "%PAGE%"
    goto :done
)

echo Could not find Chrome or Edge. Opening with default browser...
start "" "%PAGE%"

:done
