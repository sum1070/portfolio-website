:: ============== Quick Git Push (ITAI) ==============
:: This script cannot be named `git.bat` as it will conflict with the real git command.
:: Up-to-date version located at ckcksum/Hello repository.
:: Last updated: 17/08/2025 : Add quit and tags help

@echo off
setlocal EnableDelayedExpansion

:: Allow printing Unicode characters
chcp 65001 >nul

:: clear terminal
cls

:: Starting message
set "batStartMsg=Master, Master~ welcome back meow ! ᓚ₍⑅..₎♡"
powershell -Command "Write-Host '!batStartMsg!' -ForegroundColor Blue"
echo.

:: Pull changes
set "pullMsg=--- ♡ Master, pulling changes meow... ---"
powershell -Command "Write-Host '!pullMsg!' -ForegroundColor Cyan"
echo.
git pull

:: Display Git Status
git status
echo.

:: Check status
:Main
set "GIT_STATUS="
for /f "delims=" %%i in ('git status --porcelain') do (
    set "GIT_STATUS=%%i"
    goto :HasChanges
)

:: ================== Functions ==================

:: No changes found
set "noChanges=Master, you have nothing to commit meow. (´｡• ω •｡`)"
powershell -Command "Write-Host '!noChanges!' -ForegroundColor Cyan"
goto :EndScript

:: Exit Script
:EndScript
echo.
set "leavingMsg=Otsukare, Master ♡ ᓚ₍⑅..₎zzz"
powershell -Command "Write-Host '!leavingMsg!' -ForegroundColor Blue"
timeout /t 30
exit

:: Commit/Push Failed
:Failed
set "failedMsg=[ERROR] ???Master!!! something went wrong meow... (´;ω;`)"
powershell -Command "Write-Host '!failedMsg!' -ForegroundColor Red"
goto :EndScript

:: (Commit cancelled) Ask if unstaged or not
:Unstaged
set "unstagedMsg=Master, do you want to unstage the changes meow? ([Y] to unstage meow!)"
powershell -Command "Write-Host '!unstagedMsg!' -ForegroundColor Cyan"
echo.
powershell -Command ^
    "$key = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown');" ^
    "if ($key.VirtualKeyCode -eq 89) { exit 0 } else { exit 1 }"
if errorlevel 1 (
    set "notUnstageMsg=Understood, staged changes remained meow!"
    powershell -Command "Write-Host '!notUnstageMsg!' -ForegroundColor Cyan"
    echo.
    goto :EndScript
)
git reset
echo.
set "unstagedMsg=♡ Master, changes unstaged meow!"
powershell -Command "Write-Host '!unstagedMsg!' -ForegroundColor Cyan"
echo.
goto :EndScript

:: ====== Main Script ======
:HasChanges
echo.
set "proceedConfirmation=Master, continue meow? (Y/N)"
powershell -Command "Write-Host '!proceedConfirmation!' -ForegroundColor Cyan"
powershell -Command ^
    "$key = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown');" ^
    "if ($key.VirtualKeyCode -eq 89 -or $key.VirtualKeyCode -eq 13) { exit 0 } else { exit 1 }"
if errorlevel 1 (
    goto :EndScript
)

:: Stage all files
echo.
git add .
set "stagedMsg=♡ Master, changes staged meow."
powershell -Command "Write-Host '!stagedMsg!' -ForegroundColor Cyan"

:: Ask for commit type
set "defaultMsg=Back up works with small non-breaking changes"

:: ====== Tag Selection ======
:SelectTag
echo.
powershell -Command "Write-Host 'Master~ Select a commit tag meow:' -ForegroundColor Cyan"
powershell -Command "Write-Host '[0] Show help' -ForegroundColor Yellow"
powershell -Command "Write-Host '[1] [GIT]   [2] [FEAT]   [3] [FIX]   [4] [DOC]   [5] [STYLE]   [6] [CHORES] [9] [QuickGit]' -ForegroundColor Green"
powershell -Command "Write-Host 'Time to press the number key meow~ (or q to quit)' -ForegroundColor Cyan"

set "commitTag="
powershell -Command ^
    "$key = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown');" ^
    "if ($key.Character -match '^[0-69qQ]$') { Write-Output $key.Character } else { Write-Output '' }" > tag_choice.tmp
set /p commitTag=<tag_choice.tmp
if exist tag_choice.tmp del tag_choice.tmp

:: Handle quit
if /i "%commitTag%"=="q" (
    set "notCommitMsg=Cancelling commit meow..."
    powershell -Command "Write-Host '!notCommitMsg!' -ForegroundColor Cyan"
    echo.
    goto :Unstaged
)

:: if 9 is selected (quick git script updates)
if "%commitTag%"=="9" (
    set "prefix=[QuickGit] "
    set "commitMsg=Update the quick git script"
    echo.
    goto :DoCommit
)


:: Handle help
if "%commitTag%"=="0" (
    echo.
    powershell -Command "Write-Host '♡ Tag meanings meow:' -ForegroundColor Cyan"
    powershell -Command "Write-Host '[GIT]   gitignore, config, setup' -ForegroundColor Green"
    powershell -Command "Write-Host '[FEAT]  new feature or enhancement' -ForegroundColor Green"
    powershell -Command "Write-Host '[FIX]   bug fix' -ForegroundColor Green"
    powershell -Command "Write-Host '[DOC]   documentation changes' -ForegroundColor Green"
    powershell -Command "Write-Host '[STYLE] formatting, indentation, style' -ForegroundColor Green"
    powershell -Command "Write-Host '[CHORES] cleanup, refactor, misc' -ForegroundColor Green"
    powershell -Command "Write-Host '[QuickGit] Updates to quick git script' -ForegroundColor Green"
    echo.
    goto :SelectTag
)

:: Map numeric choice to tag
set "tag1=[GIT] "
set "tag2=[FEAT] "
set "tag3=[FIX] "
set "tag4=[DOC] "
set "tag5=[STYLE] "
set "tag6=[CHORES] "

set "prefix=!tag%commitTag%!"
powershell -Command "Write-Host \"Master's selected tag: !prefix!\" -ForegroundColor Green"

:: Ask for commit message
:AskCommit
echo.
powershell -Command "Write-Host \"Master's commit message: !prefix! (type 'q' to quit, '0' for help)'\" -ForegroundColor Green"
set /p "commitMsg="

:: Handle quit
if /i "%commitMsg%"=="q" (
    set "notCommitMsg=Cancelling commit meow..."
    powershell -Command "Write-Host '!notCommitMsg!' -ForegroundColor Cyan"
    echo.
    goto :Unstaged
)

:: Handle tag help
if "%commitMsg%"=="0" (
    echo.
    powershell -Command "Write-Host '♡ Tag meanings meow:' -ForegroundColor Cyan"
    powershell -Command "Write-Host '[GIT]   gitignore, config, setup' -ForegroundColor Green"
    powershell -Command "Write-Host '[FEAT]  new feature or enhancement' -ForegroundColor Green"
    powershell -Command "Write-Host '[FIX]   bug fix' -ForegroundColor Green"
    powershell -Command "Write-Host '[DOC]   documentation changes' -ForegroundColor Green"
    powershell -Command "Write-Host '[STYLE] formatting, indentation, style' -ForegroundColor Green"
    powershell -Command "Write-Host '[CHORES] cleanup, refactor, misc' -ForegroundColor Green"
    echo.
    goto :AskCommit
)

:: Handle empty → fallback to default
if "%commitMsg%"=="" (
    set "commitMsg=%defaultMsg%"
)

:: Final commit string
:DoCommit
git commit -m "!prefix!!commitMsg!"

if errorlevel 1 (
    goto :Failed
)
echo.
set "committed=♡ Changes committed meow! ✧"
powershell -Command "Write-Host '!committed!' -ForegroundColor Cyan"
echo.

:: Push changes
git push
if errorlevel 1 (
    goto :Failed
)
echo.
set "pushSuccess=hehe~ Job done meow! ฅ(◕ヮ◕)ฅ"
powershell -Command "Write-Host '!pushSuccess!' -ForegroundColor Cyan"
echo.

goto :EndScript

:: ============================== End of the quick-git.bat ==============================