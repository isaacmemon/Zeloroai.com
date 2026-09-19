exports.handler = async function(event) {
  try {
    const body = event.body;
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: body
    });
    const data = await r.text();
    return { statusCode: 200, headers: {'Content-Type':'application/json'}, body: data };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: e.message } }) };
  }
};
