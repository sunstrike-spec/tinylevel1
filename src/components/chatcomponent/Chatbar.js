const Chatbar= (props) => {
  return (
    <div className={props.writer=='sender'?'bg-yellow-300':'bg-gray-300'}>
      {props.content}
    </div>
  )
}

export default Chatbar