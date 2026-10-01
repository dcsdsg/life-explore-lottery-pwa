# 请使用PowerShell 7运行；本脚本只启动此目录的静态预览。
$questNode = Get-Command node -ErrorAction SilentlyContinue
if (-not $questNode) { throw '请安装Node.js，或把页面部署到GitHub Pages后直接使用。' }
Write-Host '城市探索任务表：打开 http://127.0.0.1:8877/，按 Ctrl+C 停止。'
& $questNode.Source (Join-Path $PSScriptRoot 'preview-server.cjs')
