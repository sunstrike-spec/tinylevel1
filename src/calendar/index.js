import { useEffect, useState } from "react";
import "../bootstrap/css/bootstrap.min.css";
import "../styles/cal.css";
import "../styles/font-awesome/css/font-awesome.min.css";
import Clock from "./clock";

const DisplayCalendar = () => {
  // Month
  const sMonth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // Day
  const sDay = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const currentTime = new Date();

  const cYear = currentTime.getFullYear();
  const cMonth = currentTime.getMonth();
  const cDate = currentTime.getDate();
  const cDay = currentTime.getDay();
  // const [cH, setCh] = useState(currentTime.getHours());
  // const [cM, setCm] = useState(currentTime.getMinutes());
  // const [cS, setCs] = useState(currentTime.getSeconds());

  // useEffect(() => {
  //   setTimeout(() => {
  //     setCs((cS) => (cS + 1) % 60);
  //   }, 1000);
  // }, [cS]);

  const [year, setYear] = useState(currentTime.getFullYear());
  const [month, setMonth] = useState(currentTime.getMonth());
  const [day, setDay] = useState(currentTime.getDay());

  const [input, setInput] = useState(`${year}-0${month + 1}-0${cDate}`);
  const inp = input.split("-");

  useEffect(() => {
    goDate();
  }, [input]);
  // console.log(input);

  const yy = parseInt(inp[0]);
  const mm = parseInt(inp[1]);
  const dd = parseInt(inp[2]);

  // Date
  const [yun, setYun] = useState(28);

  const goDate = () => {
    if (!!yy && !!mm && !!dd) {
      setYear(yy);
      setMonth(mm - 1);
      if (yy % 4 === 0) {
        if (yy % 400 !== 0 && yy % 100 === 0) {
          setYun(28);
        } else {
          setYun(29);
        }
      } else {
        setYun(28);
      }
    } else {
    }
  };

  const YunDay = () => {
    if (year % 4 === 0) {
      if (year % 400 !== 0 && year % 100 === 0) {
        setYun(28);
      } else {
        setYun(29);
      }
    } else {
      setYun(28);
    }
  };

  const sDate = [31, yun, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const firstDay = new Date(`${year}-${month + 1}-01`).getDay();
  const lastDay = new Date(`${year}-${month + 1}-${sDate[month]}`).getDay();

  const addFlag = firstDay + 6 - lastDay > 7;
  let addDay;
  if (addFlag) {
    addDay = 0;
  } else {
    if (firstDay + 6 - lastDay === 0) {
      addDay = 14;
    } else {
      addDay = 7;
    }
  }

  const IncreaseMonth = () => {
    setMonth((month) => (month + 1) % 12);
    if (month === 11) {
      setYear((year) => year + 1);
    }

    if (month > 7) {
      if (month > 10) {
        setInput(`${year}-01-0${cDate}`);
      } else {
        setInput(`${year}-${month + 2}-0${cDate}`);
      }
    } else {
      setInput(`${year}-0${month + 2}-0${cDate}`);
    }
  };

  const DecreaseMonth = () => {
    setMonth((month) => (month - 1 + 12) % 12);
    if (month === 0) {
      setYear((year) => year - 1);
    }

    // if (month > 7) {
    //   if (month > 10) {
    //     setInput(`${year}-01-0${cDate}`);
    //   } else {
    //     setInput(`${year}-${month + 2}-0${cDate}`);
    //   }
    // } else {
    //   setInput(`${year}-0${month + 2}-0${cDate}`);
    // }
  };

  const Today = () => {
    setMonth(currentTime.getMonth());
    setYear(currentTime.getFullYear());
  };

  return (
    <div className="cal-container">
      <div className="p-3 bg-primary text-white text-center">
        <h1>Calendar</h1>
      </div>

      <div className="container mt-5">
        <div>
          <div>{/* {cH}:{cM}:{cS < 10 ? "0" + cS : cS} */}</div>
          <div className="bg-success d-flex justify-content-left ps-3 text-white">
            {<Clock />}
          </div>
          <div
            className="bg-success pb-1 ps-3 text-white"
            style={{ fontSize: "24px" }}
          >
            {sDay[cDay]},{sMonth[cMonth]}
            {cDate},{cYear}
          </div>
        </div>
        <div className="image">
          <img className="back" src="map.png" alt="calendar" />
        </div>
        <div className="d-flex justify-content-between align-items-center bg-secondary">
          <div className="d-flex bg-primary text-white m-2">
            <div className="p-2">
              <span className="bg-danger p-1 rounded ">{year}</span>
            </div>
            <div className="p-2">
              <span className="p-1 ">
                {month < 9 ? "0" + (month + 1) : month + 1}
              </span>
            </div>
          </div>
          <div>
            <input
              className="search"
              type="date"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              title="Go today!"
              className="btn btn-primary m-1 today"
              onClick={Today}
            >
              Today
            </button>

            <button
              title="Next month"
              className="btn btn-primary m-1"
              onClick={() => {
                IncreaseMonth();
                YunDay();
              }}
            >
              &#x2B9D;
            </button>

            <button
              title="Previous month"
              className="btn btn-primary m-1"
              onClick={() => {
                DecreaseMonth();
                YunDay();
              }}
            >
              &#x2B9F;
            </button>
          </div>
        </div>

        <div className="grid-container">
          <div className="grid-title">
            <b style={{ color: "red" }}>Sun</b>
          </div>
          <div className="grid-title">
            <b>Mon</b>
          </div>
          <div className="grid-title">
            <b>Tue</b>
          </div>
          <div className="grid-title">
            <b>Wed</b>
          </div>
          <div className="grid-title">
            <b>Thu</b>
          </div>
          <div className="grid-title">
            <b>Fri</b>
          </div>
          <div className="grid-title">
            <b>Sat</b>
          </div>
          {Array.from({ length: firstDay }).map((item, index) => {
            return (
              <div className="grid-item" key={index} style={{ opacity: "0.5" }}>
                {sDate[(month - 1 + 12) % 12] - (firstDay - index - 1)}
              </div>
            );
          })}

          {Array.from({ length: sDate[month] }).map((item, index) => {
            let em;
            (firstDay + index) % 7 === 0 ? (em = "red") : (em = "black");

            return (
              <div className="grid-item" key={index} style={{ color: `${em}` }}>
                {index + 1}
              </div>
            );
          })}

          {Array.from({ length: 6 - lastDay + addDay }).map((item, index) => {
            return (
              <div className="grid-item" key={index} style={{ opacity: "0.5" }}>
                {index + 1}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 p-3 bg-dark text-white text-center">
        <p>&copy;2024-02-03</p>
      </div>
    </div>
  );
};

export default DisplayCalendar;
