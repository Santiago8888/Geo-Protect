import { RemoteMongoClient, Stitch, AnonymousCredential } from 'mongodb-stitch-browser-sdk'
import { countries_pipeline, cities_pipeline } from '../../data/queries'
import React, { useState, useEffect } from "react"
import amplitude from 'amplitude-js'



const collection = process.env.REACT_APP_ENV !== 'PROD' ? 'local_healthmap' : 'healthmap'
const client = Stitch.initializeDefaultAppClient("geo-protection-vaqca")
const mongo = client.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
const db = mongo.db("geodatadev").collection(collection)


const get_countries = () => db.aggregate(countries_pipeline).toArray()
const get_cities = () => db.aggregate(cities_pipeline).toArray()
const get_locations = () => db.find({}, { limit: 100}).asArray().catch(console.log)


const AMPLITUDE_KEY_DEV = 'ed8af6b3897a0779afd06757c5d971ff'
const AMPLITUDE_KEY_PROD = 'a838005ddd108fc173c0094b8c3e56b8'
export const AMPLITUDE_KEY = process.env.REACT_APP_ENV !== 'PROD' ?  AMPLITUDE_KEY_DEV : AMPLITUDE_KEY_PROD 
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

        amplitude.getInstance().init(AMPLITUDE_KEY, id)
        amplitude.getInstance().logEvent('New Visit')

        const countries = await get_countries()
        setCountries(countries.filter(({ _id })=> _id))

        const cities = await get_cities()
        setCities(cities.filter(({ _id })=> _id))

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
