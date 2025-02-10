import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../providers/SocketProvider";
import avatar from '../images/user/user-01.png'
import Chatbar from "../components/chatcomponent/Chatbar";
import { addChatter } from "../redux/chatSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


const Chatting = () => {

  const { socket, context, setContext } = useContext(SocketContext);
  const [message, setMessage] = useState();

  const [receiverId, setReceiverId] = useState('')
  const userList = useSelector(state => state.chat.chatters);

  const sendMessage = (e) => {
    e.preventDefault();
    setContext(bbbb => [...bbbb, { writer: 'sender', content: message }])
    socket.emit('sendMessage', { receiverId, message });
    setMessage('')
  }

  return (
    <div className="flex h-[800px]">
      <div className="w-60 bg-green-500">
        {userList.map((item, index) => {
          return (
            <div key={index} className={receiverId === item.id ? "flex flex-col items-center justify-center hover:opacity-80 bg-gray-500" : "flex flex-col items-center justify-center hover:opacity-80"} onClick={() => { setReceiverId(item.id) }}>
              <div className="w-10 h-10"><img src={avatar}></img></div>
              <div>{item.email}</div>
            </div>
          )
        })}
      </div>
      <div className="flex-1">
        <form className="flex">
          <input type="text" className="border-1" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button className="w-[100px] mx-2  rounded-full hover:bg-gray-600" onClick={sendMessage}>send</button>
        </form>
        <div className="w-full overflow-auto">
          {context.map((item, index) => {
            return <Chatbar key={index} writer={item.writer} content={item.content} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Chatting;