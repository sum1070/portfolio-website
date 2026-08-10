@echo off
setlocal EnableDelayedExpansion
:: Enable UTF-8 output
chcp 65001 >nul
cls

echo ============================================
echo.
git pull
echo.

git status
echo.

:: Check for unstaged, staged, and untracked changes.
:: "git diff --quiet" exits with 0 when there are no changes.
git diff --quiet --exit-code
if errorlevel 1 goto :HasChanges

git diff --staged --quiet --exit-code
if errorlevel 1 goto :HasChanges

:: Detect untracked files (not reported by "git diff")
for /f "delims=" %%F in ('git ls-files --others --exclude-standard') do goto :HasChanges

echo Nothing to commit. The working tree is clean.
goto :EndScript

:: ================== Main Script ==================
:HasChanges
echo.
choice /c YN /n /m "Continue with staging and commit? (Y/N): "
if errorlevel 2 goto :EndScript

:: Stage all changes
echo.
git add .
echo All changes staged.

set "defaultMsg=Back up work with small non-breaking changes"

:: ================== Tag Selection ==================
:SelectTag
echo.
echo Select a commit tag ('q' to quit):
echo [1] [WIP]   work in progress / backup pushes
echo [2] [FEAT]  new features
echo [3] [FIX]   bug fixes
echo [4] [REF]   code refactoring (no functional change)
echo [5] [STYLE] formatting, indentation, or style changes (no code change)
echo [6] [DOCS]  documentation or README updates
echo [7] [CHORE] maintenance, minor setup, or utility scripts
echo.

set "commitTag="
set /p "commitTag=Selection: "

if /i "%commitTag%"=="q" (
    echo Cancelling commit...
    goto :Unstage
)

:: Reserved option 9: quick update of this script itself
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

:: Validate the selection (must be 1-7)
echo %commitTag%| findstr /r "^[1-7]$" >nul
if errorlevel 1 (
    echo Invalid selection. Please choose 1-7 or 'q'.
    goto :SelectTag
)

set "prefix=!tag%commitTag%!"
echo Selected tag: !prefix!

:: ================== Commit Message ==================
:AskCommit
echo.
echo Commit message: !prefix! ('q' to quit, leave blank for the default message)
set "commitMsg="
set /p "commitMsg="

if /i "%commitMsg%"=="q" (
    echo Cancelling commit...
    goto :Unstage
)

:: Fall back to the default message if none was given
if "%commitMsg%"=="" (
    set "commitMsg=%defaultMsg%"
)

:: ================== Commit and Push ==================
:DoCommit
git commit -m "!prefix!!commitMsg!"
if errorlevel 1 goto :Failed
echo.
echo Changes committed.
echo.

git push
if errorlevel 1 goto :Failed
echo.
echo Push complete.
goto :EndScript

:: ================== Helper Sections ==================
:: Commit or push failed
:Failed
echo.
echo [ERROR] An error occurred during commit or push. Please review the output above.
goto :EndScript

:: Offer to unstage changes after a cancelled commit
:Unstage
echo.
choice /c YN /n /m "Unstage the staged changes? (Y/N): "
if errorlevel 2 (
    echo Staged changes have been kept.
    goto :EndScript
)
git reset
echo.
echo Changes unstaged.
goto :EndScript

:: ================== Exit ==================
:EndScript
echo.
echo Done. This window will close in 30 seconds.
timeout /t 30
exit