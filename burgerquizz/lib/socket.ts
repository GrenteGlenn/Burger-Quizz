// import { io } from "socket.io-client";

// export const socket = io("http://localhost:3000", {
//   transports: ["websocket"],
// });

import { io } from "socket.io-client";

export const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
  transports: ["websocket"],
  reconnection: true,
});