param (
    [int]$Port = 8080
)

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".jpeg" = "image/jpeg"
    ".jpg"  = "image/jpeg"
    ".png"  = "image/png"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".json" = "application/json"
}

try {
    $listener.Start()
    Write-Host "==============================================" -ForegroundColor Cyan
    Write-Host "  OnePlay Server rodando com sucesso!" -ForegroundColor Green
    Write-Host "  Acesse em: $prefix" -ForegroundColor Yellow
    Write-Host "==============================================" -ForegroundColor Cyan

    Start-Process $prefix

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $rawPath = [System.Uri]::UnescapeDataString($request.Url.LocalPath).TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($rawPath)) {
            $rawPath = "index.html"
        }

        $baseDir = Get-Location
        $fullPath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($baseDir, $rawPath))

        # Evita traversal fora do diretório
        if ($fullPath.StartsWith($baseDir.Path) -and (Test-Path $fullPath -PathType Leaf)) {
            $ext = [System.IO.Path]::GetExtension($fullPath).ToLower()
            $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }

            $response.ContentType = $mime
            $response.AddHeader("Cache-Control", "no-cache")

            $bytes = [System.IO.File]::ReadAllBytes($fullPath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 - Arquivo nao encontrado")
            $response.ContentType = "text/plain; charset=utf-8"
            $response.ContentLength64 = $errBytes.Length
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }

        $response.OutputStream.Close()
    }
} catch {
    Write-Error "Erro ao iniciar o servidor na porta $($Port): $_"
} finally {
    if ($listener.IsListening) {
        $listener.Stop()
    }
}
