const { incrementClicks, findByCode } = require('../models/linkModel');

// GET /:code  -> 302 redirect or 404
async function handleRedirect(req, res) {
  try {
    const { code } = req.params;

    // First check if code exists
    const existing = await findByCode(code);
    if (!existing) {
      return res.status(404).send('Not found');
    }

    // Increment clicks + update last_clicked
    await incrementClicks(code);

    return res.redirect(302, existing.target_url);
  } catch (err) {
    console.error('Error in redirect handler:', err);
    return res.status(500).send('Internal server error');
  }
}

module.exports = {
  handleRedirect,
};
