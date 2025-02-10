import { createContext, useState } from "react";
import io from "socket.io-client";
import { useEffect } from "react";
import { addChatter } from "../redux/chatSlice";
import { useDispatch } from "react-redux";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const socket = io('http://192.168.1.55:8888');
  const [context, setContext] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('response', (data) => {
      setContext(aaaaa => [...aaaaa, { writer: data.writer, content: data.context }])
    })
    socket.on('broadmessage', (data) => {
      dispatch(addChatter(data));
    })
    socket.on('getusers', (data) => {
      dispatch(addChatter(data))
    })
    socket.emit('getusers', "null");


  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, context, setContext }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider;
