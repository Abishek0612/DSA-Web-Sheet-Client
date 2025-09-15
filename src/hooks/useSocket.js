import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { useAuth } from "./useAuth";
import { updateUser } from "../store/slices/authSlice";
import { addNotification } from "../store/slices/notificationSlice";

export const useSocket = () => {
  const socketRef = useRef(null);
  const { isAuthenticated, user } = useAuth();
  const dispatch = useDispatch();
  const reconnectTimeoutRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("No token available for socket connection");
        return;
      }

      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      console.log("🔌 Connecting to socket...");

      const serverUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

      socketRef.current = io(serverUrl, {
        auth: {
          token,
        },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 10000,
        forceNew: true,
        transports: ["websocket", "polling"],
      });

      socketRef.current.on("connect", () => {
        console.log("✅ Socket connected successfully");
        socketRef.current.emit("join-room", `user-${user.id}`);
      });

      socketRef.current.on("connect_error", (error) => {
        console.error(" Socket connection error:", error.message);

        if (!reconnectTimeoutRef.current) {
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectTimeoutRef.current = null;
            if (socketRef.current && !socketRef.current.connected) {
              console.log("🔄 Retrying socket connection...");
              socketRef.current.connect();
            }
          }, 3000);
        }
      });

      socketRef.current.on("disconnect", (reason) => {
        console.log("🔌 Socket disconnected:", reason);
      });

      socketRef.current.on("notification", (data) => {
        console.log("📱 Notification received:", data);
        dispatch(addNotification(data));
      });

      socketRef.current.on("progress-updated", (data) => {
        console.log("📊 Progress updated:", data);
        if (data.userStats) {
          dispatch(updateUser({ statistics: data.userStats }));
        }
      });

      return () => {
        console.log("🔌 Cleaning up socket connection");

        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = null;
        }

        if (socketRef.current) {
          socketRef.current.disconnect();
          socketRef.current = null;
        }
      };
    }
  }, [isAuthenticated, user, dispatch]);

  const emit = (event, data) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data);
    } else {
      console.warn("⚠️ Socket not connected, cannot emit event:", event);
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

    return () => {};
  };

  return {
    socket: socketRef.current,
    emit,
    on,
    connected: socketRef.current?.connected || false,
  };
};
