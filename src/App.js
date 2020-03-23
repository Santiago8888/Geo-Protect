import React, { Fragment, useState, useEffect } from "react"
import { Consumer, db } from './components/Data/context'

import Layout from "./components/layout"
import SEO from "./components/seo"

import { WelcomeForm } from './components/Forms/WelcomeForm'
import { GeoLayer } from './components/Map/Map'

import amplitude from 'amplitude-js'
import './styles/style.scss'
import axios from 'axios'


const near_me_options = (center) => ({geoCoords: {$near: {$geometry: {type :"Point", coordinates:center}, $maxDistance: 1000000000 }}})
const default_coords = [-102.5528, 23.6345]
const IndexPage = () => {
	const [ coords, setCoords ] = useState(null)
	const [ location, setLocation ] = useState({})
	const [ locations, setLocations ] = useState([])
	const [ navigation, setNavigation ] = useState(false)

    const post = async (doc, db, id) => {
		setNavigation(true)

		const location_url = 'https://us1.locationiq.com/v1/reverse.php'
		const token = process.env.REACT_APP_LOCATION_IQ
		const geocode_url = `${location_url}?key=${token}&lat=${coords[1]}&lon=${coords[0]}&format=json`
		const { data = { address:{}} } = await axios.get(geocode_url)

		const location = {
			...doc, 
			owner_id:id, 
			coords: coords,
			geoCoords: {type : 'Point', coordinates : coords},
			city: data.address.city,
			country: data.address.country,
			created: new Date()
		}

		setLocation(location)
		await db.insertOne(location).catch(console.log)
		const { created, coords: c, ...amplitude_event } = location
		amplitude.getInstance().logEvent('Submit Health', {amplitude_event})
    }

	const success = async ({ coords: { latitude, longitude }}) => {
		const coords = [longitude, latitude]
		setCoords(coords)
		const locations = await db.find(near_me_options(coords), {limit: 100}).asArray()
		console.log('Locations', locations)
		setLocations(locations)
	}

	const error = async() => {
		setCoords(default_coords)
		const locations = await db.find(near_me_options(default_coords), {limit: 100}).asArray()
		console.log('Default Locations', locations)
		setLocations(locations)
	}


	useEffect(() => {
        async function fetchLocation(){
            console.log('Getting Location')
            !navigator.geolocation
            ?   setCoords(default_coords)
			:   navigator.geolocation.getCurrentPosition(success, error)
        } fetchLocation()
    }, [])


    return <Layout>
        <SEO title="Map" />
        <Consumer>{({ id, db, cities, countries }) => <Fragment>
            <WelcomeForm onSubmit={d => post(d, db, id)}/>
			<GeoLayer 
				coords={coords} 
				cities={cities}
				countries={countries}
				navigation={navigation} 
				locations={[...locations, location]}
			/>
        </Fragment>}</Consumer>
    </Layout>
}

export default IndexPage
