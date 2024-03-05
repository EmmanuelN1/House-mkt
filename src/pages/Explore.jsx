import {Link} from "react-router-dom"
import Slider from "../components/Slider"
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg"
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg"
import { useEffect, useState } from "react"
import {collection, getDocs, query, where, orderBy, limit, startAfter} from "firebase/firestore"
import {db} from "../firebase.config"
import {toast} from "react-toastify"
import ExploreItem from "../components/ExploreItem"


function Explore() {
    const [listings, setListings] = useState(null)

    useEffect(() => {
        const fetchListings =  async() => {
              try{
                    //Get Reference
                    const listingsRef = collection(db, 'listings')
                    //Create a query
                    const q = query(listingsRef, orderBy('timestamp', 'asc'), limit(9))
                    //Executing the query
                    const querySnapshot = await getDocs(q)
                    //Initializing an empty array that stores the listings after looping
                    let properties = []
                    //looping through the query snapshot
                    querySnapshot.forEach((doc) => {
                        return properties.push({
                            id:doc.id,
                            data: doc.data()
                        })
                    })
                    setListings(properties);
                    
              } catch (err) {
                  toast.error('Couldnt Fetch Listings')
              }
        } 
  
       fetchListings()
        
    } , [])

    console.log(listings)
  return (
    <div className="pt-5 px-6 md:px-12 lg:px-40 justify-center ">
        <header>
            <p className="pageHeader">
                Explore Several Houses
            </p>
        </header>

        <main>
            <Slider/>

             { listings?.length > 0 && 

              <section>
                  <ul className="exploreListings grid grid-cols-3 gap-10">
                        {listings.map((listing) => (
                          <ExploreItem listing={listing.data} id={listing.id} key={listing.id}/>
                        )) }
                  </ul>
              </section>}

              {/* Categories */}
            <p className="exploreCategoryHeading mb-5">
                Categories
            </p>
            <div className="exploreCategories mb-28">
                    <Link to='/category/rent'>
                        <img src={rentCategoryImage} alt="rent" className="exploreCategoryImg" />
                        <p className="exploreCategoryName">Places For Rent</p>
                    </Link>
                   

                    <Link to='/category/sale'>
                        <img src={sellCategoryImage} alt="sale" className="exploreCategoryImg" />
                       <p className="exploreCategoryName ">Places For Sell</p>
                    </Link>
                   
            </div>
        </main>

    </div>
  )
}

export default Explore