export const generateScript = (profileName: string, stack: string[]): string => {
    const toolsMap: Record<string, string> = {
        // IDEs
        'vscode': 'Microsoft.VisualStudioCode',
        'vs-community': 'Microsoft.VisualStudio.2022.Community',
        'intellij': 'JetBrains.IntelliJIDEA.Community',
        'sublime': 'SublimeHQ.SublimeText.4',
        'cursor': 'Anysphere.Cursor',

        // Version Control
        'git-desktop': 'GitHub.GitHubDesktop',
        'git': 'Git.Git',

        // Runtimes & Languages
        'node': 'OpenJS.NodeJS.LTS',
        'python': 'Python.Python.3.11',
        'java': 'Oracle.JDK.17',
        'go': 'GoLang.Go',
        'rust': 'Rustlang.Rustup',
        'dotnet': 'Microsoft.DotNet.SDK.8',

        // Databases
        'sql-server': 'Microsoft.SQLServer.2019.Developer',
        'postgres': 'PostgreSQL.PostgreSQL',
        'mysql': 'Oracle.MySQL',
        'mongo': 'MongoDB.Server',
        'redis': 'Redis.Redis',
        'sqlite': 'SQLite.SQLite',
        'dbeaver': 'dbeaver.dbeaver',

        // DevOps & Cloud
        'docker': 'Docker.DockerDesktop',
        'kubernetes-cli': 'Kubernetes.kubectl',
        'aws-cli': 'Amazon.AWSCLI',
        'azure-cli': 'Microsoft.AzureCLI',

        // Tools
        'postman': 'Postman.Postman',
        'insomnia': 'Insomnia.Insomnia',
        'figma': 'Figma.Figma',
        'slack': 'SlackTechnologies.Slack',
        'discord': 'Discord.Discord',
        'chrome': 'Google.Chrome',
        'notion': 'Notion.Notion',
        'obsidian': 'Obsidian.Obsidian',

        // Frameworks / CLI (NPM)
        'angular': 'npm install -g @angular/cli',
        'react': 'npm install -g create-react-app',
        'vue': 'npm install -g @vue/cli',
        'nextjs': 'npm install -g create-next-app',
        'nest': 'npm install -g @nestjs/cli',
        'express': 'npm install -g express-generator',
        'typescript': 'npm install -g typescript',
    };

    let script = `# AllSet Setup Script for Profile: ${profileName}\n`;
    script += `# Generated on ${new Date().toLocaleDateString()}\n\n`;

    script += `function Write-Log {\n`;
    script += `    param([string]$Message, [string]$Color = "White")\n`;
    script += `    Write-Host "[AllSet] $Message" -ForegroundColor $Color\n`;
    script += `}\n\n`;

    script += `Write-Log "Starting Setup..." "Cyan"\n\n`;

    // Check for Winget
    script += `Write-Log "Checking for user privileges..."\n`;
    script += `if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {\n`;
    script += `    Write-Warning "This script might require administrator privileges for some installations."\n`;
    script += `}\n\n`;

    // Setup Validation
    script += `if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {\n`;
    script += `    Write-Error "Winget is not installed. Please update Windows or install App Installer from the Store."\n`;
    script += `    exit 1\n`;
    script += `}\n\n`;

    const npmPackages: string[] = [];

    // Group installation by type
    const wingetTools: { id: string, name: string }[] = [];

    stack.forEach(toolId => {
        const command = toolsMap[toolId];
        if (command) {
            if (command.startsWith('npm')) {
                npmPackages.push(command);
            } else {
                wingetTools.push({ id: command, name: toolId });
            }
        }
    });

    if (wingetTools.length > 0) {
        script += `Write-Log "Installing System Tools..." "Yellow"\n`;
        wingetTools.forEach(tool => {
            script += `Write-Log "Installing ${tool.name}..."\n`;
            script += `winget install -e --id ${tool.id} --accept-package-agreements --accept-source-agreements --disable-interactivity\n`;
            script += `if ($LASTEXITCODE -eq 0) { Write-Log "${tool.name} Installed" "Green" } else { Write-Warning "Failed to install ${tool.name}" }\n\n`;
        });
    }

    if (npmPackages.length > 0) {
        script += `Write-Log "Checking for Node.js..." "Yellow"\n`;
        script += `if (Get-Command node -ErrorAction SilentlyContinue) {\n`;
        script += `    Write-Log "Installing Global NPM Packages..." "Magenta"\n`;
        npmPackages.forEach(pkg => {
            script += `    ${pkg}\n`;
            script += `    Write-Log "Executed: ${pkg}" "Green"\n`;
        });
        script += `} else {\n`;
        script += `    Write-Warning "Node.js detected but not yet available in path. Please restart terminal and run:"\n`;
        npmPackages.forEach(pkg => {
            script += `    Write-Warning "  ${pkg}"\n`;
        });
        script += `}\n\n`;
    }

    script += `Write-Log "Setup Complete! A reboot is recommended." "Green"\n`;
    script += `Read-Host -Prompt "Press Enter to exit"\n`;

    return script;
};
