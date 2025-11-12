@echo off
echo ========================================
echo Pushing to GitHub
echo ========================================
echo.
echo Repository: maliknoorealam/testing
echo.
echo Make sure you're authenticated!
echo.
pause

git add .
git commit -m "Commercial Bank Verification Portal - Complete project"
git branch -M main
git remote set-url origin https://github.com/maliknoorealam/testing.git
git push -u origin main

echo.
echo ========================================
if %ERRORLEVEL% EQU 0 (
    echo ✅ Successfully pushed to GitHub!
) else (
    echo ❌ Push failed. Check authentication.
    echo.
    echo Options:
    echo 1. Use GitHub Desktop (easiest)
    echo 2. Use Personal Access Token
    echo 3. Check GITHUB_AUTH_FIX.md for help
)
echo ========================================
pause
