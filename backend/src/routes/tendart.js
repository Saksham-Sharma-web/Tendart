const express = require('express');
const supabase = require('../config/supabase');

const router = express.Router();

// ---------------------- TENDERS ----------------------

router.get('/tenders', async (req, res) => {
  try {
    const { data, error } = await supabase.from('tenders').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json({ tenders: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/tenders/:id', async (req, res) => {
  try {
    const { data, error } = await supabase.from('tenders').select('*').eq('tender_id', req.params.id).single();
    if (error && error.code !== 'PGRST116') throw error;
    if (!data) return res.status(404).json({ error: 'Not found' });
    res.json({ tender: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.post('/tenders', async (req, res) => {
  try {
    const tender = {
      ...req.body,
      tender_id: `TND-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    const { data, error } = await supabase.from('tenders').insert([tender]).select().single();
    if (error) throw error;
    res.json({ tender: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------------- BIDS ----------------------

router.get('/tenders/:id/bids', async (req, res) => {
  try {
    const { data, error } = await supabase.from('bids').select('*').eq('tender_id', req.params.id).order('submitted_at', { ascending: false });
    if (error) throw error;
    res.json({ bids: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/bids/:id', async (req, res) => {
  try {
    const { data: bid, error: bidError } = await supabase.from('bids').select('*').eq('bid_id', req.params.id).single();
    if (bidError && bidError.code !== 'PGRST116') throw bidError;
    if (!bid) return res.status(404).json({ error: 'Not found' });

    const { data: tender, error: tError } = await supabase.from('tenders').select('*').eq('tender_id', bid.tender_id).single();
    
    // Fetch evidence for this bid
    const { data: evidence, error: eError } = await supabase.from('evidence').select('*').eq('bid_id', bid.bid_id);
    
    res.json({ 
      bid, 
      tender: tender || null, 
      compliance_score: { 
        total_score: bid.compliance_score || 0,
        risk_level: bid.risk_level || 'UNKNOWN',
        status: bid.compliance_status || 'UNKNOWN'
      }, 
      evidence: evidence || [] 
    });
  } catch (err) {
    console.error(err);
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
    const { data, error } = await supabase.from('bids').insert([bid]).select().single();
    if (error) throw error;
    res.json({ bid: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------------- RANKINGS ----------------------

router.get('/tenders/:id/rankings', async (req, res) => {
  try {
    let query = supabase.from('rankings').select('*').eq('tender_id', req.params.id).order('rank', { ascending: true });
    
    if (req.query.status_filter) query = query.eq('status', req.query.status_filter);
    if (req.query.risk_filter) query = query.eq('risk_level', req.query.risk_filter);

    const { data, error } = await query;
    if (error) throw error;
    res.json({ rankings: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ---------------------- AUDIT TRAIL ----------------------

router.get('/tenders/:id/audit-trail', async (req, res) => {
  try {
    const { data, error } = await supabase.from('audit_trail').select('*').eq('tender_id', req.params.id).order('timestamp', { ascending: false });
    if (error) throw error;
    res.json({ audit_trail: data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Demo Loader Endpoint
router.post('/demo/load', async (req, res) => {
  // In a real scenario, this would seed the DB with initial data
  res.json({ success: true, message: 'Demo endpoint hit. Please use SQL script to load demo data.' });
});

module.exports = router;
