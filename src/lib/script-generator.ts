export const generateScript = (profileName: string, stack: string[]): string => {
    const toolsMap: Record<string, string> = {
        'vscode': 'Microsoft.VisualStudioCode',
        'vs-community': 'Microsoft.VisualStudio.2022.Community',
        'git-desktop': 'GitHub.GitHubDesktop',
        'git': 'Git.Git',
        'node': 'OpenJS.NodeJS.LTS',
        'python': 'Python.Python.3.11',
        'java': 'Oracle.JDK.17',
        'sql-server': 'Microsoft.SQLServer.2019.Developer',
        'postgres': 'PostgreSQL.PostgreSQL',
        'mongo': 'MongoDB.Server',
        'docker': 'Docker.DockerDesktop',
        'postman': 'Postman.Postman',
        'notion': 'Notion.Notion',
        // Some tools might not have direct winget IDs or need custom commands, 
        // but for this prototype we assume winget availability.
        'angular': 'npm install -g @angular/cli',
        'react': 'npm install -g create-react-app',
    };

    let script = `# AllSet Setup Script for Profile: ${profileName}\n`;
    script += `# Generated on ${new Date().toLocaleDateString()}\n\n`;
    script += `Write-Host "Starting AllSet Setup..." -ForegroundColor Cyan\n\n`;

    // Check for Winget
    script += `if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {\n`;
    script += `    Write-Error "Winget is not installed. Please install App Installer from the Microsoft Store."\n`;
    script += `    exit 1\n`;
    script += `}\n\n`;

    const npmPackages: string[] = [];

    stack.forEach(toolId => {
        const command = toolsMap[toolId];
        if (command) {
            if (command.startsWith('npm')) {
                npmPackages.push(command);
            } else {
                script += `Write-Host "Installing ${toolId}..." -ForegroundColor Yellow\n`;
                script += `winget install -e --id ${command} --accept-package-agreements --accept-source-agreements\n`;
                script += `if ($LASTEXITCODE -eq 0) { Write-Host "Successfully installed ${toolId}" -ForegroundColor Green } else { Write-Warning "Failed to install ${toolId}" }\n\n`;
            }
        }
    });

    if (npmPackages.length > 0) {
        script += `Write-Host "Installing NPM packages..." -ForegroundColor Yellow\n`;
        // Ensure Node is installed first if it was in the list, but winget order isn't guaranteed synchronous in this simple loop unless we order it.
        // For safety, we check for node.
        script += `if (Get-Command node -ErrorAction SilentlyContinue) {\n`;
        npmPackages.forEach(pkg => {
            script += `    ${pkg}\n`;
        });
        script += `} else {\n`;
        script += `    Write-Warning "Node.js not found. Skipping NPM packages. Please restart your terminal after Node.js installation and run these commands manually:"\n`;
        npmPackages.forEach(pkg => {
            script += `    Write-Warning "${pkg}"\n`;
        });
        script += `}\n\n`;
    }

    script += `Write-Host "Setup Complete! You may need to restart your computer." -ForegroundColor Green\n`;
    script += `Read-Host -Prompt "Press Enter to exit"\n`;

    return script;
};
