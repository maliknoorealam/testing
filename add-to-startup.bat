@echo off
echo ========================================
echo Adding Server to Windows Startup
echo ========================================
echo.

REM Get the current directory
set "CURRENT_DIR=%~dp0"
set "STARTUP_FOLDER=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"

REM Create shortcut in startup folder
echo Creating startup shortcut...
powershell -Command "$WshShell = New-Object -ComObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut('%STARTUP_FOLDER%\Commercial Bank Server.lnk'); $Shortcut.TargetPath = '%CURRENT_DIR%start-server.bat'; $Shortcut.WorkingDirectory = '%CURRENT_DIR%'; $Shortcut.Save()"

echo.
echo ✅ Server will now start automatically when Windows boots!
echo.
echo To remove auto-start, delete the shortcut from:
echo %STARTUP_FOLDER%
echo.
pause
