import { useState } from "react";

const Clock = () => {
  let [time, setTime] = useState("mm/dd/yyyy");

  setInterval(Timer, 1000);

  function Timer() {
    const d = new Date();
    setTime(d.toLocaleTimeString());
  }
  return <h1 className="pt-1">{time}</h1>;
};

export default Clock;
