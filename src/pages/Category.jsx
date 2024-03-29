import {useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import {collection, getDocs, query, where, orderBy, limit, startAfter} from "firebase/firestore"
import {db} from "../firebase.config"
import {toast} from "react-toastify"
import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"


function Category() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)

  const params = useParams()

  useEffect(() => {
      const fetchListings =  async() => {
            try{
                  //Get Reference
                  const listingsRef = collection(db, 'listings')
                  //Create a query
                  const q = query(listingsRef, where('type', '==', params.categoryName), orderBy('timestamp', 'desc'), limit(10))
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
  } , [params.categoryName])

  return (
    <div className="category">
        <header>
            <p className="pageHeader">
              {params.categoryName === 'rent' ? 'Places For Rent' : 'Places For Sale'}
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
             : <p> No Listings For {params.categoryName} </p>}
    </div>
  )
}

export default Category