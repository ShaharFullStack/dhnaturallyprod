const mysql = require('mysql2/promise');
const slugify = require('slugify');
const yargs = require('yargs/yargs');

async function run() {
    const argv = yargs(process.argv.slice(2)).argv;
    const host = argv.host || process.env.MYSQL_HOST || 'localhost';
    const user = argv.user || process.env.MYSQL_USER || 'root';
    const password = argv.password || process.env.MYSQL_PASSWORD || '';
    const database = argv.database || process.env.MYSQL_DATABASE || 'dhnaturally_db';
    const preview = argv.preview || false; // if true, don't write

    console.log('Connecting to DB:', { host, user, database });

    const conn = await mysql.createConnection({ host, user, password, database });

    try {
        // Read existing slugs and titles
        const [rows] = await conn.execute('SELECT id, title, slug FROM articles');
        console.log(`Found ${rows.length} articles`);

        // Build map of slug->count for deduplication
        const slugCounts = {};
        rows.forEach(r => {
            if (r.slug) {
                slugCounts[r.slug] = (slugCounts[r.slug] || 0) + 1;
            }
        });

        const updates = [];

        for (const r of rows) {
            if (!r.title) continue;
            const base = slugify(r.title, { lower: true, strict: true });
            let candidate = base || 'article';

            // If slug already present and matches candidate, skip
            if (r.slug && r.slug === candidate) continue;

            // If candidate in use by other article or empty, dedupe
            let suffix = 0;
            let final = candidate;
            while (slugCounts[final]) {
                suffix += 1;
                final = `${candidate}-${suffix}`;
            }

            // Reserve final
            slugCounts[final] = 1;

            updates.push({ id: r.id, slug: final, old: r.slug });
        }

        console.log(`Prepared ${updates.length} slug updates`);
        if (preview) {
            console.table(updates.slice(0, 50));
            console.log('Preview mode, no DB writes performed. Use --preview=false to apply.');
            return;
        }

        // Apply updates in transaction
        await conn.beginTransaction();
        try {
            for (const u of updates) {
                await conn.execute('UPDATE articles SET slug = ? WHERE id = ?', [u.slug, u.id]);
            }
            await conn.commit();
            console.log('Slug migration applied successfully');
        } catch (err) {
            await conn.rollback();
            throw err;
        }
    } finally {
        await conn.end();
    }
}

run().catch(err => {
    console.error('Migration failed:', err.message || err);
    process.exit(1);
});
