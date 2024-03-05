import { useNavigate, useLocation } from "react-router-dom"
import {ReactComponent as OfferIcon} from "../assets/svg/localOfferIcon.svg" 
import {ReactComponent as ExploreIcon} from "../assets/svg/exploreIcon.svg" 
import {ReactComponent as PersonOutlineIcon} from "../assets/svg/personOutlineIcon.svg" 
import { EnvelopeOpenIcon } from '@heroicons/react/24/solid'


function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()


    const pathMatchRoute = (route) => {
        //check if thr route === pathname
        if (route === location.pathname) {
            return true
        }
    }


  return (
    <footer className="navbar">
        <nav className="navbarNav">
            <ul className="navbarListItems">
                <li className="navbarListItem" onClick={() => navigate('/')}>
                    <ExploreIcon fill={pathMatchRoute('/') ? '#ff4500' : '#8f8f8f'} width='36px' height="36px"/>
                    <p>Explore</p>
                </li>

                <li className="navbarListItem"onClick={() => navigate('/offers')}>
                    <OfferIcon fill={pathMatchRoute('/offers') ? '#ff4500' : '#8f8f8f'} width='36px' height="36px"/>
                    <p>Offers</p>
                </li>

                <li className="navbarListItem" onClick={() => navigate('/profile')}>
                    <PersonOutlineIcon fill={pathMatchRoute('/profile') ? '#ff4500' : '#8f8f8f'} width='36px' height="36px"/>
                    <p>Profile</p>
                </li>

                <li className="navbarListItem" onClick={() => navigate('/support')}>
                <EnvelopeOpenIcon fill={pathMatchRoute('/support') ? '#ff4500' : '#8f8f8f'} width='36px' height="36px"/>
                <p>Support</p>
                </li>

                


            </ul>
        </nav>
    </footer>
  )
}

export default Navbar