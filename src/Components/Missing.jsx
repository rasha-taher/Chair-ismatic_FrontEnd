import '../Style/Missing.css'
import Footer from './Footer'
import MenuBar from './MenuBar'
import notFound from '../Images/pngegg.png'
const Missing = () => {
  return (
    <div >
      <MenuBar/>
      <div className='missing'> 
      <div className='insidemissingDivs'>
        <img src={notFound}/>
       
          <p className='missingBigText'> Oops! Page not found</p>
          <p className='missingSmallText'> We can't find the page you are looking for. Have a look at the url
          to see if you can spot an error. Or you do not have access to this page </p>
          <button className='goHomeBtn'> Go To HomePage</button>
        
      </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Missing
