$ErrorActionPreference = "Stop"
$OUT = "jsg-ironworks-sync.txt"
if (Test-Path $OUT) { Remove-Item $OUT }

"=== ENV ==="            | Out-File $OUT -Encoding utf8
("node " + (node -v))    | Out-File $OUT -Append
("npm  " + (npm -v))     | Out-File $OUT -Append
("pwd  " + (Get-Location)) | Out-File $OUT -Append
"`n" | Out-File $OUT -Append

# Gather files excluding heavy dirs
$files = Get-ChildItem -Recurse -File |
  Where-Object { $_.FullName -notmatch '\\node_modules\\|\\\.next\\|\\.git\\|\\.vscode\\|\\coverage\\|\\dist\\|\\build\\|\\\.turbo\\' } |
  Sort-Object FullName

"=== FILE TREE (filtered) ===" | Out-File $OUT -Append
$files | ForEach-Object {
  $_.FullName.Substring((Get-Location).Path.Length + 1) | Out-File $OUT -Append
}

"`n=== FILE CONTENTS ===" | Out-File $OUT -Append
$exts = @(".ts",".tsx",".js",".jsx",".json",".css",".md",".mdx",".mjs",".cjs",".svg")

foreach ($f in $files) {
  if ($exts -contains $f.Extension.ToLower()) {
    "`n--- FILE: $(Resolve-Path -Relative $f.FullName) ---" | Out-File $OUT -Append
    $text = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    $text | Out-File $OUT -Append
  }
}

"Done -> $OUT" | Out-File $OUT -Append