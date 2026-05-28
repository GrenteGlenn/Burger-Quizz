import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

// const dev = process.env.NODE_ENV !== "production";

// const hostname = "localhost";
// const port = 3000;

// const app = next({
//   dev,
//   hostname,
//   port,
// });

const dev = process.env.NODE_ENV !== "production";

const hostname = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";
const port = Number(process.env.PORT) || 3000;

const app = next({
  dev,
  hostname,
  port,
});

const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    socket.on("game:start", () => {
      io.emit("game:start");
    });
    socket.on("players:joined", (players) => {
      io.emit("players:joined", players);
    });
    socket.on("question:started", (question) => {
      io.emit("question:started", question);
    });

    socket.on("question:closed", (question) => {
      io.emit("question:closed", question);
    });

    socket.on("question:revealed", (data) => {
      io.emit("question:revealed", data);
    });

    socket.on("leaderboard:update", (players) => {
      io.emit("leaderboard:update", players);
    });

    socket.on("disconnect", () => {});
  });
  // httpServer.listen(port, () => {
  //   console.log(`> Ready on http://${hostname}:${port}`);
  // });

  httpServer.listen(port, hostname, () => {
  console.log(`> Ready on http://${hostname}:${port}`);
});
});
