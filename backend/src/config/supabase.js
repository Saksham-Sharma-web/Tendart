const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Key in environment variables");
  process.exit(1);
}

// We use the Service Role Key here in the backend to bypass RLS and perform admin operations
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
