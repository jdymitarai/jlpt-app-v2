export async function onRequest(context) {
  const { env } = context;
  
  try {
    const object = await env.JLPT_BUCKET.get('jlpt_data.json');
    
    if (object === null) {
      return new Response('JLPT data not found in R2', { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    // Allow CORS if needed, though pages functions are same-origin
    headers.set('Access-Control-Allow-Origin', '*');

    return new Response(object.body, {
      headers
    });
  } catch (err) {
    return new Response('Error fetching JLPT data: ' + err.message, { status: 500 });
  }
}
