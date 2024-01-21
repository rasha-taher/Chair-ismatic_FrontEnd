import MenuBar from "./MenuBar";
import "../Style/HomeHeroSection.css";
const HomeHeroSection = () => {
  return (
    <div className="homeHeroSection">
      <div className="carousel">
        <div className="list">
          <div className="item slider-div-image ">
            <MenuBar />
            <div className="content">
              <div className="title">We Help Turn Your House Into A Home</div>

              <div className="buttons">
                <button>SEE MORE</button>
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeroSection;
