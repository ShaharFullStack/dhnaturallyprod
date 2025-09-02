const mysql = require('mysql2/promise');
const http = require('http');

async function run() {
    const argv = require('yargs/yargs')(process.argv.slice(2)).argv;
    const host = argv.host || process.env.MYSQL_HOST || 'localhost';
    const user = argv.user || process.env.MYSQL_USER || 'root';
    const password = argv.password || process.env.MYSQL_PASSWORD || '';
    const database = argv.database || process.env.MYSQL_DATABASE || 'dhnaturally_db';
    const slugToCheck = argv.slug || 'our-story';
    const apiPort = argv.apiPort || process.env.PORT || 3000;

    console.log('DB connect:', { host, user, database });

    let conn;
    try {
        conn = await mysql.createConnection({ host, user, password, database });

        const [cols] = await conn.execute("SHOW COLUMNS FROM articles LIKE 'slug'");
        console.log('\nSHOW COLUMNS result:');
        console.log(cols.length ? cols : 'no column named slug');

        const [countRows] = await conn.execute("SELECT COUNT(*) AS populated FROM articles WHERE slug IS NOT NULL AND slug <> ''");
        console.log('\nPopulated slugs count:', countRows[0].populated);

        const [found] = await conn.execute('SELECT id, title, slug FROM articles WHERE slug = ? LIMIT 10', [slugToCheck]);
        console.log(`\nRows with slug = ${slugToCheck}:`, found.length ? found : 'none');

    } catch (err) {
        console.error('DB error:', err.message || err);
    } finally {
        if (conn) await conn.end();
    }

    // Attempt HTTP GET to API
    const path = `/api/dhnaturally/articles/${encodeURIComponent(slugToCheck)}`;
    const options = { hostname: 'localhost', port: apiPort, path, method: 'GET', timeout: 5000 };
    console.log(`\nHTTP GET http://localhost:${apiPort}${path}`);

    const req = http.request(options, (res) => {
        console.log('HTTP status:', res.statusCode);
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
            console.log('HTTP body:', body.slice(0, 200));
        });
    });
    req.on('error', (e) => console.error('HTTP request error:', e.message));
    req.on('timeout', () => { console.error('HTTP request timed out'); req.destroy(); });
    req.end();
}

run();
