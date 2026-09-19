exports.handler = async function(event) {
  try {
    const parsed = JSON.parse(event.body);
    const model = parsed.model || 'gemini-2.5-flash';
    delete parsed.model;
    const r = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + process.env.GEMINI_API_KEY,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed)
      }
    );
    const data = await r.text();
    return { statusCode: 200, headers: {'Content-Type':'application/json'}, body: data };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: e.message } }) };
  }
};
