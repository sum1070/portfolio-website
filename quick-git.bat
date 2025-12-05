:: ============== Quick Git Push (Uni notes repos ITAI)) ==============
:: This script cannot be named `git.bat` as it will conflict with the real git command.
:: Up-to-date version located at ckcksum/Hello repository.

@echo off
setlocal EnableDelayedExpansion
:: Allow printing Unicode characters
chcp 65001 >nul
cls

echo Master, Master~ welcome back meow ! ᓚ₍⑅..₎♡
echo.

echo --- ♡ Master, pulling changes meow... ---
echo.
git pull

git status
echo.

git diff --quiet --exit-code
if %errorlevel% equ 0 (
    git diff --staged --quiet --exit-code
    if %errorlevel% equ 0 (
        echo Master, you have nothing to commit meow. ´｡• ω •｡`
        goto :EndScript
    )
)

goto :HasChanges

:: ================== Functions ==================
:: Commit/Push Failed
:Failed
echo [ERROR] ???Master!!! something went wrong meow... (´;ω;`)
goto :EndScript

:: (Commit cancelled) Ask if unstaged or not
:Unstaged
echo.
choice /c YN /n /m "Master, do you want to unstage the changes meow? (Y/N): "
if errorlevel 2 (
    echo Understood, staged changes remained meow!
    echo.
    goto :EndScript
)
git reset
echo.
echo ♡ Master, changes unstaged meow!
echo.
goto :EndScript

:: ====== Main Script ======
:HasChanges
echo.
echo.
choice /c YN /n /m "Master, continue meow? (Y/N)"
if errorlevel 2 (
    goto :EndScript
)

:: Stage all files
echo.
git add .
echo ♡ Master, changes staged meow.

:: Ask for commit type
set "defaultMsg=Back up works with small non-breaking changes"

:: ====== Tag Selection ======
:SelectTag
echo.
echo ♡ Select a commit tag meow~ ('q' to quit)
echo [1] [WIP]   wip/back up pushes
echo [2] [FEAT]  new features
echo [3] [FIX]   bug fixes
echo [4] [REF]   code refactoring (no functional change)
echo [5] [STYLE] formatting, indentation, or style changes (no code change)
echo [6] [DOCS]  documentation or README updates
echo [7] [CHORE] maintenance, minor setup, or utility scripts
echo .

:: get user keypress
set /p "commitTag="
if /i "%commitTag%"=="q" (
    echo Cancelling commit meow...
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
set "tag1=[WIP] "
set "tag2=[FEAT] "
set "tag3=[FIX] "
set "tag4=[REF] "
set "tag5=[STYLE] "
set "tag6=[DOCS] "
set "tag7=[CHORE] "
set "prefix=!tag%commitTag%!"
echo Master's selected tag: !prefix!

:AskCommit
echo.
echo Master's commit message: !prefix! ('q' to quit)
set /p "commitMsg="

if /i "%commitMsg%"=="q" (
    echo Cancelling commit meow...
    echo.
    goto :Unstaged
)

:: default message if empty
if "%commitMsg%"=="" (
    set "commitMsg=%defaultMsg%"
)

:: final commit string
:DoCommit
git commit -m "!prefix!!commitMsg!"

if errorlevel 1 (
    goto :Failed
)
echo.
echo ♡ Changes committed meow! ✧
echo.

git push
if errorlevel 1 (
    goto :Failed
)
echo.
echo hehe~ Job done meow! ฅ(◕ヮ◕)ฅ

goto :EndScript

:: ================== Exit Scripts ==================
:: Exit Script
:EndScript
echo.
echo Otsukare, Master ♡ ᓚ₍⑅..₎zzz
timeout /t 30
exit

:EndErrorScript
echo.
echo Otsukare, Master ♡ ᓚ₍⑅..₎zzz (Check for errors!)