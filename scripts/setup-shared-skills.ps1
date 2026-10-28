# Restore Claude's local views of the canonical repo-scoped skill/role files.
$ErrorActionPreference = 'Stop'
$workspaceRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$claudeRoot = Join-Path $workspaceRoot '.claude'
New-Item -ItemType Directory -Path $claudeRoot -Force | Out-Null

foreach ($entry in @(@('skills', '.agents/skills'), @('agents', '.agents/roles'))) {
    $target = [IO.Path]::GetFullPath((Join-Path $workspaceRoot $entry[1]))
    $link = Join-Path $claudeRoot $entry[0]
    if (-not (Test-Path -LiteralPath $target -PathType Container)) {
        throw "Missing shared directory: $target"
    }
    $existing = Get-Item -LiteralPath $link -Force -ErrorAction SilentlyContinue
    if ($existing) {
        if ($existing.LinkType -ne 'Junction') {
            throw "Refusing to replace an existing non-junction: $link"
        }
        $existingTarget = [IO.Path]::GetFullPath([string](@($existing.Target)[0]))
        if ($existingTarget -eq $target) { continue }
        # Delete only the junction entry; never recurse into its target.
        [IO.Directory]::Delete($link)
    }
    New-Item -ItemType Junction -Path $link -Target $target | Out-Null
}

$settingsPath = Join-Path $claudeRoot 'settings.local.json'
$settings = if (Test-Path -LiteralPath $settingsPath) {
    Get-Content -LiteralPath $settingsPath -Raw | ConvertFrom-Json
} else { [pscustomobject]@{} }
if (-not $settings.PSObject.Properties['enabledPlugins']) {
    $settings | Add-Member -NotePropertyName enabledPlugins -NotePropertyValue ([pscustomobject]@{})
}
foreach ($pack in @('studio-core', 'studio-app', 'studio-site', 'studio-services')) {
    $settings.enabledPlugins | Add-Member -NotePropertyName "$pack@studio-method" -NotePropertyValue $false -Force
}
$settings | ConvertTo-Json -Depth 32 | Set-Content -LiteralPath $settingsPath -Encoding UTF8
Write-Output 'Shared skills and roles linked; duplicate Studio Method packs disabled for this project.'
