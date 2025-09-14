import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./useAuth";

export const useSocket = () => {
  const socketRef = useRef(null);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      socketRef.current = io(
        import.meta.env.VITE_API_URL || "http://localhost:5000",
        {
          auth: {
            token: localStorage.getItem("token"),
          },
        }
      );

      socketRef.current.emit("join-room", user.id);

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
          socketRef.current = null;
        }
      };
    }
  }, [isAuthenticated, user]);

  const emit = (event, data) => {
    if (socketRef.current) {
      socketRef.current.emit(event, data);
    }
  };

  const on = (event, callback) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback);

      return () => {
        if (socketRef.current) {
          socketRef.current.off(event, callback);
        }
      };
    }
  };

  return {
    socket: socketRef.current,
    emit,
    on,
    connected: socketRef.current?.connected || false,
  };
};
