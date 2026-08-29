// Local-First Vault Studio Server & GitHub Pages Deployment Engine
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8080;
const ROOT_DIR = __dirname;
const REPO_OWNER_SITE = "https://angsumi.github.io/Portfolio_Maker/";

// MIME Types Map
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Handle API Endpoint: POST /api/publish
    if (req.method === 'POST' && req.url === '/api/publish') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try {
                const payload = JSON.parse(body);
                const { clientSlug, clientName, files, autoGitPush } = payload;

                if (!clientSlug || !files) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, error: 'Missing clientSlug or files payload.' }));
                    return;
                }

                // Sanitize folder name
                const safeSlug = clientSlug.toLowerCase().replace(/[^a-z0-9_-]+/g, '-');
                const clientDir = path.join(ROOT_DIR, 'clients', safeSlug);

                // Create folder if not exists
                if (!fs.existsSync(clientDir)) {
                    fs.mkdirSync(clientDir, { recursive: true });
                }

                // Write all files
                for (const [filename, content] of Object.entries(files)) {
                    const filePath = path.join(clientDir, filename);
                    if (content.startsWith('data:')) {
                        // Base64 file string (e.g. images / PDFs)
                        const base64Data = content.split(',')[1];
                        fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
                    } else {
                        // Text file (HTML, CSS, JS, JSON)
                        fs.writeFileSync(filePath, content, 'utf8');
                    }
                }

                const liveUrl = `${REPO_OWNER_SITE}clients/${safeSlug}/`;
                const localUrl = `http://localhost:${PORT}/clients/${safeSlug}/`;

                if (autoGitPush) {
                    // Execute Git commit & push to origin main from repository root
                    const repoRoot = ROOT_DIR;
                    const gitCmd = `git add clients/${safeSlug} && git commit -m "Publish client site: ${clientName || safeSlug}" && git push origin main`;
                    exec(gitCmd, { cwd: repoRoot }, (error, stdout, stderr) => {
                        let gitSuccess = !error;
                        let gitMessage = gitSuccess ? 'Successfully pushed to GitHub repository!' : stderr || error.message;

                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({
                            success: true,
                            clientSlug: safeSlug,
                            liveUrl: liveUrl,
                            localUrl: localUrl,
                            gitPushed: gitSuccess,
                            message: gitMessage
                        }));
                    });
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        success: true,
                        clientSlug: safeSlug,
                        liveUrl: liveUrl,
                        localUrl: localUrl,
                        gitPushed: false,
                        message: 'Saved files locally to V1/clients folder.'
                    }));
                }

            } catch (err) {
                console.error('Publish API Error:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
        });
        return;
    }

    // Serve Static Files
    let filePath = path.join(ROOT_DIR, req.url === '/' ? 'generator.html' : req.url.split('?')[0]);
    
    // Prevent directory traversal
    if (!filePath.startsWith(ROOT_DIR)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            // Try appending index.html if directory
            if (stats && stats.isDirectory()) {
                filePath = path.join(filePath, 'index.html');
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
                return;
            }
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    });
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`\n==================================================`);
        console.log(` [Notice] Vault Studio Server is ALREADY RUNNING on Port ${PORT}!`);
        console.log(` You can directly open in your browser: http://localhost:${PORT}/generator.html`);
        console.log(`==================================================\n`);
        process.exit(0);
    } else {
        console.error('Server error:', err);
    }
});

server.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(` Vault Studio Server active at: http://localhost:${PORT}/generator.html`);
    console.log(`==================================================\n`);
});
