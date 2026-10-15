export default {
  async fetch(request, env) {
    // التعامل مع طلبات CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), { 
        status: 405,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } 
      });
    }

    try {
      const body = await request.json();
      
      // استخراج الرسائل أو أخذ آخر رسالة من المستخدم
      let userMessage = "";
      if (body.messages && Array.isArray(body.messages)) {
        userMessage = body.messages[body.messages.length - 1].content;
      } else if (body.message) {
        userMessage = body.message;
      } else {
        userMessage = "hello";
      }

      const apiKey = env.GEMINI_API_KEY;
      // استخدام النموذج المستقر والرسمي gemini-1.5-flash
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

      const geminiResponse = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: userMessage }]
            }
          ],
          systemInstruction: {
            parts: [{ text: "أنت مساعد ذكي خاص ببورتفوليو حمزة رجاوي. تجيب الزوار باللغة التي يكتبون بها (عربية، إنجليزية، ألمانية) وتعرف بمهاراته في تصميم الهويات وتطوير الويب باحترافية وبشكل مختصر." }]
          }
        })
      });

      if (!geminiResponse.ok) {
        const errorText = await geminiResponse.text();
        return new Response(JSON.stringify({ error: "ai failed", detail: `gemini ${geminiResponse.status}`, raw: errorText }), {
          status: 502,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
      }

      const data = await geminiResponse.json();
      const aiReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "عذراً، لم أستطع فهم الطلب.";

      // إرجاع الرد بنفس الشكل اللي كيتسنوه الـ Frontend ديالك
      return new Response(JSON.stringify({ reply: aiReply }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: "server error", detail: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }
  }
};