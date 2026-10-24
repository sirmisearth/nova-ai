import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
const app=express(), port=process.env.PORT||3000, dir=path.dirname(fileURLToPath(import.meta.url));
app.use(express.json({limit:"32kb"})); app.use(express.static(path.join(dir,"public")));
app.post("/api/chat",async(req,res)=>{
 const message=typeof req.body?.message==="string"?req.body.message.trim():"";
 if(!message)return res.status(400).json({error:"Please enter a message."});
 if(message.length>8000)return res.status(413).json({error:"Message is too long (maximum 8,000 characters)."});
 const key=process.env.GEMINI_API_KEY;
 if(!key)return res.status(503).json({error:"The server owner must configure the GEMINI_API_KEY secret."});
 try{
  const upstream=await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":key},body:JSON.stringify({system_instruction:{parts:[{text:"You are NOVA AI, a helpful, honest, friendly general-purpose assistant. Explain clearly and never claim to have performed actions you have not performed."}]},contents:[{role:"user",parts:[{text:message}]}],generationConfig:{temperature:.7,maxOutputTokens:1200}})});
  const data=await upstream.json();if(!upstream.ok)return res.status(upstream.status===429?429:502).json({error:data?.error?.message||"The AI provider returned an error."});
  const reply=data?.candidates?.[0]?.content?.parts?.map(p=>p.text||"").join("").trim();if(!reply)return res.status(502).json({error:"The AI provider returned an empty response."});res.json({reply});
 }catch{res.status(502).json({error:"Unable to reach the AI provider. Please try again."})}
});
app.get("/health",(_req,res)=>res.json({ok:true}));app.listen(port,()=>console.log(`NOVA AI server listening on ${port}`));
