import "../Style/About.css";
import MenuBar from "./MenuBar";
import { Link } from "react-router-dom";
import homePageImage from "../Images/HomePage.jpeg";
import about from "../Images/aboutImage.jpeg";
import crown from "../Images/crown-svgrepo-com.svg";
import quality from "../Images/quality-medal-svgrepo-com.svg";
import circleWave from "../Images/circle-waveform-lines.svg";
import contactGif from "../Images/contact_us.gif";
import Footer from "./Footer";
const About = () => {
  return (
    <div className="aboutPage">
        <MenuBar />
      <div className="heroSection">
        <div className="heroSection insideHeroSection">
          <div className="heroSectionLeft">
            <div className="heroBigText">
              We Help Turn Your &nbsp;
              <div className="flexDirection">
                <p className="redText">House &nbsp;</p>
                Into A &nbsp;
                <p className="redText">Home</p>
              </div>
            </div>
            <p className="heroSmallText">
              Our foremost concern is ensuring your comfort to meet customer
              satisfaction. We offer a comprehensive selection of furniture
              designed for easy and prompt accessibility.
            </p>
            <Link to="/">
              <button className="shopNowBtn">Shop Now </button>
            </Link>
            <div className="numbersSection">
              <div className="numberDiv">
                <p className="numberInNumberDiv"> 200+</p>
                <p className="textInNumberDiv"> Unique Style</p>
              </div>

              <div className="numberDiv">
                <p className="numberInNumberDiv"> 300+</p>
                <p className="textInNumberDiv"> Home Furnished</p>
              </div>
              <div className="numberDiv">
                <p className="numberInNumberDiv"> 600+</p>
                <p className="textInNumberDiv"> Happy Customers</p>
              </div>
            </div>
          </div>
          <div className="heroSectionRight">
            <img
              src={homePageImage}
              alt="Home Page"
              className="homePageImage"
            />
          </div>
        </div>
      </div>
      <div className="aboutSection">
        <div className="aboutSection aboutSectionInner">
          <div className="aboutSectionLeft">
            <p className="aboutSectionTitle">About Chair-ismatic</p>
            <p className="aboutSectionText">
              Chair-ismatic is a curated collection where quality craftsmanship
              meets a unique aesthetic. Our website isn't just a
              marketplace—it's a celebration of style and functionality. Each
              piece is carefully selected to meet the highest standards,
              offering a diverse range of furniture that transforms spaces.
              Explore and discover furniture that goes beyond the ordinary,
              reflecting our passion for timeless design.
            </p>
            <p className="aboutSectionText">
              Our website is a gateway to a world where furniture transcends
              mere utility and becomes a statement of individuality. We curate
              an eclectic range of furnishings, each chosen with a discerning
              eye for detail and a commitment to offering diversity that
              inspires transformation within spaces.
            </p>
          </div>
          <div className="aboutSectionRight">
            <img src={about} alt="about image " className="aboutImage" />
            <div className="backDivOfImage"></div>
          </div>
        </div>
      </div>
      <div className="aboutSection">
        <div className="aboutSection aboutSectionInner">
          <div className="aboutSectionLeft">
            <p className="whyUsText">Why You Should Choose Our Products?</p>
          </div>
          <div className="aboutSectionRight showDiv">
            <div className="reasonDiv">
              <div className="aboutSvg addmargin">
              <img src={crown} alt="quality" className="whyUsSvg" />
              </div>
              <div className="insideReasonDiv">
                <p className="whyUsTitle">Quality is unquestionable</p>
                <p className="whyUsDesc">
                  We always prioritize customer satisfaction over everything
                </p>
              </div>
            </div>
            <div className="reasonDiv">
            <div className="aboutSvg">
              <img src={quality} alt="quality" className="whyUsSvg" />
              </div>
              <div className="insideReasonDiv">
                <p className="whyUsTitle">International standard</p>
                <p className="whyUsDesc">
                  We already have international standards, and we often import
                  abroad
                </p>
              </div>
            </div>

            <div className="reasonDiv">
              <div className="aboutSvg">
                <img src={circleWave} alt="quality" className="whyUsSvg" />
              </div>
              <div className="insideReasonDiv">
                <p className="whyUsTitle">Long warranty</p>
                <p className="whyUsDesc">
                  All the products we provide havve a long warranty, up to 5
                  years
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contactSection">
        <div className="aboutSection aboutSectionInner">
          <img src={contactGif} alt=" contact us" className="contactGif" />

          <div className="aboutSectionRight showDiv">
            <p className="aboutSectionTitle noMargin">Contact Us</p>
            <div className="contactInputDiv">
              <p className="undertext">Have any questions? Message us!</p>
              <input
                type="text"
                className="signUp-content width-plus"
                placeholder="Enter Your Full Name"
              />
              <input
                type="text"
                className="signUp-content width-plus"
                placeholder="Enter Your Email"
              />
              <textarea
                className="signUp-content width-plus messageTextArea "
                placeholder="Enter Your Message"
              />
              <button className="signUpBtn"> Send Message </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
