@echo off
echo ========================================
echo Removing Server from Windows Startup
echo ========================================
echo.

set "STARTUP_FOLDER=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "SHORTCUT=%STARTUP_FOLDER%\Commercial Bank Server.lnk"

if exist "%SHORTCUT%" (
    del "%SHORTCUT%"
    echo ✅ Removed from startup!
) else (
    echo ❌ Startup shortcut not found.
)

echo.
pause
