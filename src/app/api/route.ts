export function GET(request) {
  return new Response(JSON.stringify({ message: "Hello, World!" }), {
    status: 200,
  });
    
}