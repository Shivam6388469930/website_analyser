const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const {
  analyzeWebsite,
  getAnalyses,
  getAllAnalyses,
  getAnalysisById,
  deleteAnalysis,
  summarizeAnalyses,
  exportAnalysesCSV
} = require('../controllers/websiteController');

router.post('/analyze', protect, analyzeWebsite);
router.get('/', protect, getAnalyses);
router.get('/all', protect, admin, getAllAnalyses);
router.get('/summary', protect, admin, summarizeAnalyses);
router.get('/export', protect, admin, exportAnalysesCSV);
router.get('/:id', protect, getAnalysisById);
router.delete('/:id', protect, deleteAnalysis);

module.exports = router;
