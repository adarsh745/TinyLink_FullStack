// const express = require('express');
// const {
//   createLinkHandler,
//   listLinksHandler,
//   getLinkStatsHandler,
//   deleteLinkHandler,
// } = require('../controllers/linkController');

// const router = express.Router();

// // POST /api/links
// router.post('/', createLinkHandler);

// // GET /api/links
// router.get('/', listLinksHandler);

// // GET /api/links/:code
// router.get('/:code', getLinkStatsHandler);

// // DELETE /api/links/:code
// router.delete('/:code', deleteLinkHandler);

// module.exports = router;


const express = require('express');
const {
  createLinkHandler,
  listLinksHandler,
  getLinkStatsHandler,
  deleteLinkHandler,
} = require('../controllers/linkController');

const router = express.Router();

router.post('/', createLinkHandler);
router.get('/', listLinksHandler);
router.get('/:code', getLinkStatsHandler);
router.delete('/:code', deleteLinkHandler);

module.exports = router;
