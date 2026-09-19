exports.handler = async function(event) {
  try {
    const body = event.body;
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY
      },
      body: body
    });
    const data = await r.text();
    return { statusCode: 200, headers: {'Content-Type':'application/json'}, body: data };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: { message: e.message } }) };
  }
};
