param([int]$Port = 8080)

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$url  = "http://localhost:$Port/"

$mime = @{
    '.html' = 'text/html; charset=utf-8'
    '.css'  = 'text/css'
    '.js'   = 'application/javascript'
    '.json' = 'application/json'
    '.png'  = 'image/png'
    '.jpg'  = 'image/jpeg'
    '.jpeg' = 'image/jpeg'
    '.webp' = 'image/webp'
    '.svg'  = 'image/svg+xml'
    '.ico'  = 'image/x-icon'
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url)

try {
    $listener.Start()
} catch {
    Write-Host "ERROR: Could not start on port $Port" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "  Archviz Local Server running at: $url" -ForegroundColor Cyan
Write-Host "  The browser will open automatically." -ForegroundColor Cyan
Write-Host "  Press Ctrl+C to stop." -ForegroundColor Cyan
Write-Host ""

Start-Process $url

try {
    while ($listener.IsListening) {
        $ctx = $listener.GetContext()
        $req = $ctx.Request
        $res = $ctx.Response

        $localPath = $req.Url.LocalPath
        if ($localPath -eq '/') { $localPath = '/index.html' }
        $localPath = $localPath.TrimStart('/')
        $filePath  = Join-Path $root $localPath

        if (Test-Path $filePath -PathType Leaf) {
            $ext  = [System.IO.Path]::GetExtension($filePath).ToLower()
            $ct   = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' }
            $data = [System.IO.File]::ReadAllBytes($filePath)
            $res.ContentType     = $ct
            $res.ContentLength64 = $data.LongLength
            $res.StatusCode      = 200
            $res.OutputStream.Write($data, 0, $data.Length)
            Write-Host "  200  $($req.Url.LocalPath)" -ForegroundColor Green
        } else {
            $msg  = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $res.StatusCode      = 404
            $res.ContentType     = 'text/plain'
            $res.ContentLength64 = $msg.LongLength
            $res.OutputStream.Write($msg, 0, $msg.Length)
            Write-Host "  404  $($req.Url.LocalPath)" -ForegroundColor DarkYellow
        }

        $res.OutputStream.Close()
    }
} finally {
    $listener.Stop()
    Write-Host "Server stopped." -ForegroundColor Gray
}
