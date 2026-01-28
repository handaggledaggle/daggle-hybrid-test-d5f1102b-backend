import express from "express";
import { WebSocketServer } from "ws";
import { createServer } from "http";

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.send("Welcome to realtime chat!");
  
  ws.on("message", (data) => {
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(data.toString());
      }
    });
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
