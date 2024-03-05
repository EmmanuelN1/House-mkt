import {useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import {collection, getDocs, query, where, orderBy, limit, startAfter} from "firebase/firestore"
import {db} from "../firebase.config"
import {toast} from "react-toastify"
import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"

function Offers() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchListings =  async() => {
          try{
                //Get Reference
                const listingsRef = collection(db, 'listings')
                //Create a query
                const q = query(listingsRef, where('offer', '==', true), orderBy('timestamp', 'desc'), limit(10))
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
                setLoading(false)
          } catch (err) {
              toast.error('Couldnt Fetch Listings')
          }
    } 

    fetchListings()
} , [])

  return (
    <div className="category px-6 md:px-12 lg:px-40 justify-center ">
    <header>
        <p className="pageHeader">
              Offers
        </p>
    </header>

      {loading ? <Spinner/>: listings && listings.length > 0 ? 
        <> 
          <main>
              <ul className="categoryListings">
                    {listings.map((listing) => (
                      <ListingItem listing={listing.data} id={listing.id} key={listing.id}/>
                    )) }
              </ul>
          </main>
        </>
         : <p> There are no offers at the moment</p>}
    </div>
  )
}

export default Offers