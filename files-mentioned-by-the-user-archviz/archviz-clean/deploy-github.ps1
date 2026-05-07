# ─── Deploy to GitHub Pages ───────────────────────────────────────────────────
# Run this script once to initialise and push your project to GitHub.
# After that, GitHub Pages will serve it at:
#   https://<your-username>.github.io/<repo-name>/

# 1) Set these two values before running:
$GH_USER = "YOUR_GITHUB_USERNAME"    # e.g.  "avarchviz"
$REPO     = "avarchviz-web"           # e.g.  "avarchviz-web"

Write-Host ""
Write-Host "  Initialising Git…" -ForegroundColor Cyan
git init
git add .
git commit -m "Initial deploy – AV Archviz"

Write-Host ""
Write-Host "  Adding remote and pushing to GitHub…" -ForegroundColor Cyan
git branch -M main
git remote add origin "https://github.com/$GH_USER/$REPO.git"
git push -u origin main

Write-Host ""
Write-Host "  Done! Now go to:" -ForegroundColor Green
Write-Host "  https://github.com/$GH_USER/$REPO/settings/pages" -ForegroundColor Yellow
Write-Host "  Set 'Branch' to: main  /  (root)  then click Save." -ForegroundColor Yellow
Write-Host "  Your site will be live at:" -ForegroundColor Green
Write-Host "  https://$GH_USER.github.io/$REPO/" -ForegroundColor Cyan
Write-Host ""
