import { io, Socket } from "socket.io-client";

class SocketService {
  private socket: Socket | null = null;
  private isConnected = false;

  connect(token: string): void {
    if (this.socket) {
      this.disconnect();
    }

    this.socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000", {
      auth: { token },
      transports: ["websocket", "polling"],
    });

    this.socket.on("connect", () => {
      this.isConnected = true;
      console.log("Socket connected");
    });

    this.socket.on("disconnect", () => {
      this.isConnected = false;
      console.log("Socket disconnected");
    });

    this.socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  emit(event: string, data?: any): void {
    if (this.socket && this.isConnected) {
      this.socket.emit(event, data);
    }
  }

  on(event: string, callback: (data: any) => void): () => void {
    if (this.socket) {
      this.socket.on(event, callback);

      return () => {
        if (this.socket) {
          this.socket.off(event, callback);
        }
      };
    }

    return () => {};
  }

  off(event: string, callback?: (data: any) => void): void {
    if (this.socket) {
      if (callback) {
        this.socket.off(event, callback);
      } else {
        this.socket.off(event);
      }
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }
}

export default new SocketService();
