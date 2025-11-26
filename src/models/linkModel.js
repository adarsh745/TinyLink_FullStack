const db = require('../db');

async function findByCode(code) {
  const result = await db.query(
    'SELECT * FROM links WHERE code = $1',
    [code]
  );
  return result.rows[0] || null;
}

async function createLink(code, targetUrl) {
  const result = await db.query(
    `INSERT INTO links (code, target_url)
     VALUES ($1, $2)
     RETURNING *`,
    [code, targetUrl]
  );
  return result.rows[0];
}

async function getAllLinks() {
  const result = await db.query(
    'SELECT * FROM links ORDER BY created_at DESC'
  );
  return result.rows;
}

async function deleteByCode(code) {
  const result = await db.query(
    'DELETE FROM links WHERE code = $1 RETURNING *',
    [code]
  );
  return result.rows[0] || null;
}

async function incrementClicks(code) {
  const result = await db.query(
    `UPDATE links
     SET total_clicks = total_clicks + 1,
         last_clicked = NOW()
     WHERE code = $1
     RETURNING *`,
    [code]
  );
  return result.rows[0] || null;
}

module.exports = {
  findByCode,
  createLink,
  getAllLinks,
  deleteByCode,
  incrementClicks,
};
