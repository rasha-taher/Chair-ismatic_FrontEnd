import '../Style/Footer.css'
import logo from '../Images/chairs-black.svg'
const Footer = () => {
  return (
    <footer>
      <div className='footerDiv'>
      <div className="footerLogoDiv">
        <img src={logo} alt='logo' className='logoImage'/>
        <p className='footerLogo'> Chair-ismatic</p>
      </div>
      <div className='footerDesc'>
      Discover our collection of distinctive and marketable furniture, where quality meets aesthetics in every piece.
      </div>
      </div>
      <div className='footerDiv'>
     <p className='footerTitle'> About Us</p>
      <ul className="footer-ul">
        <li className="footer-li">Home</li>
        <li className="footer-li">About Us </li>
        <li className="footer-li">Product</li>
        <li className="footer-li">Become A Seller</li>
        <li className="footer-li">FAQ</li>
      </ul>
      </div>
      <div className='footerDiv'>
     <p className='footerTitle'> Products</p>
      <ul className="footer-ul">
        <li className="footer-li">Sofa</li>
        <li className="footer-li"> Chairs </li>
        <li className="footer-li">Desktops</li>
        <li className="footer-li">Bed</li>
        <li className="footer-li">Tables</li>
      </ul>
      </div>
    </footer>
  )
}

export default Footer
