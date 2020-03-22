import { RemoteMongoClient, Stitch, AnonymousCredential } from 'mongodb-stitch-browser-sdk'
import { countries_pipeline } from '../../data/queries'
import React, { useState, useEffect } from "react"


const client = Stitch.initializeDefaultAppClient("geo-protection-vaqca")
const mongo = client.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
const db = mongo.db("geodatadev").collection('healthmap')

const get_countries = () => db.aggregate(countries_pipeline).toArray()
const get_locations = () => db.find({}, { limit: 100}).asArray().catch(console.log)


export const { Provider, Consumer } = React.createContext()
export const DBProvider = ({ children }) => {
    const [ id, setId ] = useState(null)
    const [ countries, setCountries ] = useState([])
    const [ locations, setLocations ] = useState([])
  
    useEffect(() => {
      async function fetchData(){
        const { id } = await client.auth.loginWithCredential(new AnonymousCredential())
        setId(id)

        const countries = await get_countries()
        setCountries(countries.filter(({ _id })=> _id))

        const locations = await get_locations()
        setLocations(locations)
        console.log(locations)
      }
      
      fetchData()
    }, [])

    return <Provider 
      value={{
        id: id,
        db: db, 
        locations: locations,
        countries: countries
      }}
    >{children}</Provider>
}
