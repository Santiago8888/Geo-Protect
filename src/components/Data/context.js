import { RemoteMongoClient, Stitch, AnonymousCredential } from 'mongodb-stitch-browser-sdk'
import { countries_pipeline, cities_pipeline } from '../../data/queries'
import React, { useState, useEffect } from "react"


const collection = process.env.REACT_APP_ENV !== 'PROD' ? 'local_healthmap' : 'healthmap'
const client = Stitch.initializeDefaultAppClient("geo-protection-vaqca")
const mongo = client.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
const db = mongo.db("geodatadev").collection(collection)

const get_countries = () => db.aggregate(countries_pipeline).toArray()
const get_cities = () => db.aggregate(cities_pipeline).toArray()
const get_locations = () => db.find({}, { limit: 100}).asArray().catch(console.log)


export const { Provider, Consumer } = React.createContext()
export const DBProvider = ({ children }) => {
    const [ id, setId ] = useState(null)
    const [ cities, setCities ] = useState([])
    const [ countries, setCountries ] = useState([])
    const [ locations, setLocations ] = useState([])
  
    useEffect(() => {
      async function fetchData(){
        const { id } = await client.auth.loginWithCredential(new AnonymousCredential())
        setId(id)

        const countries = await get_countries()
        setCountries(countries.filter(({ _id })=> _id))

        const cities = await get_cities()
        setCities(cities.filter(({ _id })=> _id))
        console.log(cities)

        const locations = await get_locations()
        setLocations(locations)
      }
      
      fetchData()
    }, [])

    return <Provider 
      value={{
        id: id,
        db: db, 
        cities: cities,
        countries: countries,
        locations: locations
      }}
    >{children}</Provider>
}
