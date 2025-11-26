const {
  findByCode,
  createLink,
  getAllLinks,
  deleteByCode,
} = require('../models/linkModel');

const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;

function isValidUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch (err) {
    return false;
  }
}

function generateRandomCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let out = '';
  for (let i = 0; i < length; i += 1) {
    out += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return out;
}

// generate a unique short code by checking DB
async function generateUniqueCode() {
  // start with length 6; if collisions are crazy, you can increase
  while (true) {
    const candidate = generateRandomCode(6);
    const existing = await findByCode(candidate);
    if (!existing) return candidate;
  }
}

// POST /api/links
async function createLinkHandler(req, res) {
  try {
    const { url, code } = req.body || {};

    console.log('Create link request:', req.body);

    if (!url || !isValidUrl(url)) {
      return res.status(400).json({ error: 'Invalid or missing URL' });
    }

    let finalCode = code && code.trim();

    if (finalCode) {
      if (!CODE_REGEX.test(finalCode)) {
        return res.status(400).json({
          error: 'Code must match [A-Za-z0-9]{6,8}',
        });
      }

      const existing = await findByCode(finalCode);
      if (existing) {
        // 409 if code exists (as per spec)
        return res.status(409).json({
          error: 'Code already exists',
        });
      }
    } else {
      finalCode = await generateUniqueCode();
    }

    const newLink = await createLink(finalCode, url);

    return res.status(201).json({
      code: newLink.code,
      target_url: newLink.target_url,
      total_clicks: newLink.total_clicks,
      last_clicked: newLink.last_clicked,
      created_at: newLink.created_at,
    });
  } catch (err) {
    console.error('Error creating link:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// GET /api/links
async function listLinksHandler(req, res) {
  try {
    const links = await getAllLinks();
    return res.json(links);
  } catch (err) {
    console.error('Error listing links:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// GET /api/links/:code
async function getLinkStatsHandler(req, res) {
  try {
    const { code } = req.params;
    const link = await findByCode(code);

    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }

    return res.json(link);
  } catch (err) {
    console.error('Error getting link stats:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// DELETE /api/links/:code
async function deleteLinkHandler(req, res) {
  try {
    const { code } = req.params;
    const deleted = await deleteByCode(code);

    if (!deleted) {
      return res.status(404).json({ error: 'Link not found' });
    }

    return res.status(200).json({ ok: true, message: 'Link deleted' });
  } catch (err) {
    console.error('Error deleting link:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createLinkHandler,
  listLinksHandler,
  getLinkStatsHandler,
  deleteLinkHandler,
};
