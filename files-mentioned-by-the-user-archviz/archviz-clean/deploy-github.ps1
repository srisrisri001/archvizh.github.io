# Deploy to GitHub Pages
# Run this script once to initialize and push your project to GitHub.
# After that, GitHub Pages will serve it at:
#   https://<your-username>.github.io/<repo-name>/

function Fail([string]$Message) {
    Write-Host ""
    Write-Host "ERROR: $Message" -ForegroundColor Red
    exit 1
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Fail "Git is not installed or not in PATH. Install Git for Windows first: https://git-scm.com/download/win"
}

$GH_USER = Read-Host "Enter your GitHub username (example: avarchviz)"
$REPO = Read-Host "Enter your repository name (example: avarchviz-web)"

if ([string]::IsNullOrWhiteSpace($GH_USER) -or [string]::IsNullOrWhiteSpace($REPO)) {
    Fail "GitHub username and repository name are required."
}

$remoteUrl = "https://github.com/$GH_USER/$REPO.git"

Write-Host ""
Write-Host "Initializing Git..." -ForegroundColor Cyan
git init
if ($LASTEXITCODE -ne 0) { Fail "git init failed." }

git add .
if ($LASTEXITCODE -ne 0) { Fail "git add failed." }

git commit -m "Initial deploy - AV Archviz" 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "No new commit created (possibly nothing to commit)." -ForegroundColor DarkYellow
}

Write-Host ""
Write-Host "Configuring remote..." -ForegroundColor Cyan
$hasOrigin = git remote | Select-String -Pattern "^origin$" -Quiet
if ($hasOrigin) {
    git remote set-url origin $remoteUrl
} else {
    git remote add origin $remoteUrl
}
if ($LASTEXITCODE -ne 0) { Fail "Setting remote failed." }

git branch -M main
if ($LASTEXITCODE -ne 0) { Fail "Setting main branch failed." }

Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push -u origin main
if ($LASTEXITCODE -ne 0) {
    Fail "Push failed. Ensure the repo exists on GitHub and you have access."
}

Write-Host ""
Write-Host "Done. Next step:" -ForegroundColor Green
Write-Host "Open: https://github.com/$GH_USER/$REPO/settings/pages" -ForegroundColor Yellow
Write-Host "Set Branch = main and Folder = /(root), then Save." -ForegroundColor Yellow
Write-Host "Your website URL will be:" -ForegroundColor Green
Write-Host "https://$GH_USER.github.io/$REPO/" -ForegroundColor Cyan
Write-Host ""
