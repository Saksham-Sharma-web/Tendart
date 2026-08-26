const supabase = require('./src/config/supabase');

async function testConnection() {
  console.log('Testing Supabase Connection...');
  console.log('URL:', process.env.SUPABASE_URL);

  const tables = ['tenders', 'bids', 'evidence', 'rankings', 'audit_trail'];
  const results = {};

  for (const table of tables) {
    try {
      const { data, error, status } = await supabase.from(table).select('*').limit(1);
      if (error) {
        results[table] = { status: 'ERROR', code: error.code, message: error.message, httpStatus: status };
      } else {
        results[table] = { status: 'CONNECTED & READY', rowCount: data.length, httpStatus: status };
      }
    } catch (err) {
      results[table] = { status: 'EXCEPTION', message: err.message };
    }
  }

  console.log('\n--- Supabase Table Status ---');
  console.table(results);

  const allReady = Object.values(results).every(r => r.status === 'CONNECTED & READY');
  if (allReady) {
    console.log('✅ Supabase is fully connected and all tables exist!');
  } else {
    console.log('⚠️ Some tables returned errors. Check table list above.');
  }
}

testConnection();
