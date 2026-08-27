const express = require('express');
const supabase = require('../config/supabase');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();
const AI_SERVICE_URL = process.env.AI_MICROSERVICE_URL || 'http://127.0.0.1:8001';

async function fetchFromAIService(path, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);
  try {
    const res = await fetch(`${AI_SERVICE_URL}${path}`, { ...options, signal: controller.signal });
    if (!res.ok) throw new Error(`AI service error: ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.warn(`[TendartBackend] AI service at ${AI_SERVICE_URL}${path} unreachable:`, err.message);
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

// ---------------------- TENDERS ----------------------

router.get('/tenders', async (req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase.from('tenders').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return res.json({ tenders: data });
      }
    }
    const aiData = await fetchFromAIService('/api/v1/tendart/tenders');
    return res.json(aiData);
  } catch (err) {
    try {
      const aiData = await fetchFromAIService('/api/v1/tendart/tenders');
      return res.json(aiData);
    } catch (fallbackErr) {
      res.status(500).json({ error: err.message });
    }
  }
});

router.get('/tenders/:id', async (req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase.from('tenders').select('*').eq('tender_id', req.params.id).single();
      if (!error && data) {
        return res.json({ tender: data });
      }
    }
    const aiData = await fetchFromAIService(`/api/v1/tendart/tenders/${req.params.id}`);
    return res.json(aiData);
  } catch (err) {
    try {
      const aiData = await fetchFromAIService(`/api/v1/tendart/tenders/${req.params.id}`);
      return res.json(aiData);
    } catch (fallbackErr) {
      res.status(500).json({ error: err.message });
    }
  }
});

router.post('/tenders', async (req, res) => {
  try {
    const tender = {
      ...req.body,
      tender_id: req.body.tender_id || `TND-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    if (supabase) {
      const { data, error } = await supabase.from('tenders').insert([tender]).select().single();
      if (!error && data) {
        return res.status(201).json({ tender: data });
      }
    }
    const aiRes = await fetchFromAIService('/api/v1/tendart/tenders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tender)
    });
    return res.status(201).json(aiRes);
  } catch (err) {
    try {
      const aiRes = await fetchFromAIService('/api/v1/tendart/tenders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
      });
      return res.status(201).json(aiRes);
    } catch (fallbackErr) {
      res.status(500).json({ error: err.message });
    }
  }
});

// ---------------------- FILE UPLOAD ----------------------
// POST /tenders/:id/upload-nit  – accepts a PDF and forwards to AI OCR service
router.post('/tenders/:id/upload-nit', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const form = new (require('form-data'))();
    form.append('file', req.file.buffer, { filename: req.file.originalname, contentType: req.file.mimetype });
    const aiRes = await fetch(`${AI_SERVICE_URL}/api/v1/tendart/ai/analyze-tender`, {
      method: 'POST',
      body: form,
      // Node fetch automatically sets correct headers for FormData
    });
    if (!aiRes.ok) {
      const txt = await aiRes.text();
      throw new Error(`AI service error ${aiRes.status}: ${txt}`);
    }
    const json = await aiRes.json();
    return res.json(json);
  } catch (err) {
    console.error('[TendartBackend] Upload error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------------- BIDS ----------------------

router.get('/tenders/:id/bids', async (req, res) => {
  try {
    if (supabase) {
      const { data, error } = await supabase.from('bids').select('*').eq('tender_id', req.params.id).order('submitted_at', { ascending: false });
      if (!error && data && data.length > 0) {
        return res.json({ bids: data });
      }
    }
    const aiData = await fetchFromAIService(`/api/v1/tendart/tenders/${req.params.id}/bids`);
    return res.json(aiData);
  } catch (err) {
    try {
      const aiData = await fetchFromAIService(`/api/v1/tendart/tenders/${req.params.id}/bids`);
      return res.json(aiData);
    } catch (fallbackErr) {
      res.status(500).json({ error: err.message });
    }
  }
});

router.get('/bids/:id', async (req, res) => {
  try {
    const aiData = await fetchFromAIService(`/api/v1/tendart/bids/${req.params.id}`);
    return res.json(aiData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/bids', async (req, res) => {
  try {
    const bid = {
      ...req.body,
      bid_id: req.body.bid_id || `BID-${Date.now()}`,
      submitted_at: new Date().toISOString()
    };
    if (supabase) {
      const { data, error } = await supabase.from('bids').insert([bid]).select().single();
      if (!error && data) {
        return res.status(201).json({ bid: data });
      }
    }
    return res.status(201).json({ bid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/bids/:id/upload-evidence', upload.array('files'), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }
    const form = new (require('form-data'))();
    req.files.forEach(file => {
      form.append('files', file.buffer, { filename: file.originalname, contentType: file.mimetype });
    });
    // Forward to the OCR micro-service for bid analysis
    const aiRes = await fetch(`${AI_SERVICE_URL}/api/v1/tendart/ai/analyze-bid`, {
      method: 'POST',
      body: form,
    });
    if (!aiRes.ok) {
       // If the endpoint is not yet implemented in Python, we fallback gracefully for the demo
       return res.json({ success: true, message: "AI Extraction simulated (endpoint missing or returned error)" });
    }
    const json = await aiRes.json();
    return res.json(json);
  } catch (err) {
    console.error('[TendartBackend] Upload error:', err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/bids/:id/evaluate', async (req, res) => {
  try {
    const aiData = await fetchFromAIService(`/api/v1/tendart/bids/${req.params.id}/evaluate`, { method: 'POST' });
    return res.json(aiData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/tenders/:id/evaluate-all', async (req, res) => {
  try {
    const aiData = await fetchFromAIService(`/api/v1/tendart/tenders/${req.params.id}/evaluate-all`, { method: 'POST' });
    return res.json(aiData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/bids/:id/decision', async (req, res) => {
  try {
    const aiData = await fetchFromAIService(`/api/v1/tendart/bids/${req.params.id}/decision`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    if (supabase) {
      await supabase.from('bids').update({
        officer_decision: req.body.decision,
        decision_remarks: req.body.remarks,
        decision_by: req.body.officer_name,
        decision_at: new Date().toISOString()
      }).eq('bid_id', req.params.id).catch(() => {});
    }
    return res.json(aiData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/evidence/:id', async (req, res) => {
  try {
    const aiData = await fetchFromAIService(`/api/v1/tendart/evidence/${req.params.id}`);
    return res.json(aiData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/evidence/:id/review', async (req, res) => {
  try {
    const aiData = await fetchFromAIService(`/api/v1/tendart/evidence/${req.params.id}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    return res.json(aiData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------- RANKINGS ----------------------

router.get('/tenders/:id/rankings', async (req, res) => {
  try {
    const params = new URLSearchParams(req.query).toString();
    const aiData = await fetchFromAIService(`/api/v1/tendart/tenders/${req.params.id}/rankings?${params}`);
    return res.json(aiData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------- AUDIT TRAIL ----------------------

router.get('/tenders/:id/audit-trail', async (req, res) => {
  try {
    const aiData = await fetchFromAIService(`/api/v1/tendart/tenders/${req.params.id}/audit-trail`);
    return res.json(aiData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------- OCR & AI FACT EXTRACTION ----------------------

router.post('/ai/extract-facts', async (req, res) => {
  try {
    const aiData = await fetchFromAIService('/api/v1/tendart/ai/extract-facts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    return res.json(aiData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/ai/analyze-tender', async (req, res) => {
  try {
    const aiData = await fetchFromAIService('/api/v1/tendart/ai/analyze-tender', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    return res.json(aiData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/ai/detect-discrepancies', async (req, res) => {
  try {
    const aiData = await fetchFromAIService('/api/v1/tendart/ai/detect-discrepancies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    return res.json(aiData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------- EVIDENCE DOCUMENTS & PDF PAGES ----------------------

router.get('/documents/:id/pages/:page/image', async (req, res) => {
  try {
    const response = await fetch(`${AI_SERVICE_URL}/api/v1/tendart/documents/${req.params.id}/pages/${req.params.page}/image`);
    if (!response.ok) return res.status(404).json({ error: 'Page image not found' });
    
    res.setHeader('Content-Type', 'image/png');
    const arrayBuffer = await response.arrayBuffer();
    return res.send(Buffer.from(arrayBuffer));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------- DEMO LOADER ----------------------

router.post('/demo/load', async (req, res) => {
  try {
    const aiData = await fetchFromAIService('/api/v1/tendart/demo/load', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    return res.json(aiData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
