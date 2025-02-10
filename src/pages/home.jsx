import Avatar from "../components/Avatar";
import logo from "../images/logo/brand.jpg";
import loginImg from '../images/logo/user.jpg'
import backImg from "../images/cards/background.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const goLogin = () => {
    navigate("/login");
  };
  return (
    <div className=" mx-auto">
      <div className="flex-grow">
        <div className="flex header w-max">
          <div className="logo rounded-full">
            <Avatar
              size="large"
              src={<img className="rounded-full" src={logo} alt="logo" />}
            />
          </div>
          <div className="menu">
            <div className="user-menu">
              <Avatar
                size="large"
                onClick={goLogin}
                src={<img className="rounded-full" src={loginImg} alt="logo" />}
              />
            </div>
          </div>
        </div>
        <div className="home-img h-[800px]">
          <img src={backImg} alt="backimage" />
        </div>
      </div>
    </div>
  );
};
export default Home;
