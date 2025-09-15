import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { useAuth } from "./useAuth";
import { updateUser } from "../store/slices/authSlice";

export const useSocket = () => {
  const socketRef = useRef(null);
  const { isAuthenticated, user } = useAuth();
  const dispatch = useDispatch();

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

      socketRef.current.on("progress-updated", (data) => {
        if (data.userStats) {
          dispatch(updateUser({ statistics: data.userStats }));
        }
      });

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
          socketRef.current = null;
        }
      };
    }
  }, [isAuthenticated, user, dispatch]);

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

    return () => {};
  };

  return {
    socket: socketRef.current,
    emit,
    on,
    connected: socketRef.current?.connected || false,
  };
};
