@echo off
setlocal enabledelayedexpansion

REM Set the scheduled time (24-hour format HH:MM:SS)
set SCHEDULED_TIME=5:47:00

REM Get current time
for /f "tokens=1-3 delims=: " %%a in ('echo %time%') do (
    set HOUR=%%a
    set MIN=%%b
    set SEC=%%c    allure-2.38.1\bin\allure.bat open allure-results
)

REM Convert to seconds for comparison
set /a CURRENT_SECONDS=!HOUR!*3600+!MIN!*60+!SEC!
for /f "tokens=1,2 delims=:" %%a in ('echo %SCHEDULED_TIME%') do (
    set /a SCHED_SECONDS=%%a*3600+%%b*60
)

cd /d G:\VS CODE\Playwright

:WAIT_FOR_TIME
REM Check if current time matches scheduled time
for /f "tokens=1-3 delims=: " %%a in ('echo %time%') do (
    set HOUR=%%a
    set MIN=%%b
    set SEC=%%c
)
set /a CURRENT_SECONDS=!HOUR!*3600+!MIN!*60+!SEC!

if !CURRENT_SECONDS! lss !SCHED_SECONDS! (
    REM Wait 5 seconds before checking again
    timeout /t 5 /nobreak
    goto WAIT_FOR_TIME
)

echo Running updateProfile tests at %date% %time%
npx playwright test tests\Naukari\updateProfile.spec.ts

pause
