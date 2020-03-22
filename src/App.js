import React, { Fragment, useState, useEffect } from "react"
import { Consumer } from './components/Data/context'

import Layout from "./components/layout"
import SEO from "./components/seo"

import { WelcomeForm } from './components/Forms/WelcomeForm'
import { GeoLayer } from './components/Map/Map'

import amplitude from 'amplitude-js'
import './styles/style.scss'
import axios from 'axios'


const default_coords = [-102.5528, 23.6345]
const IndexPage = () => {
	const [ coords, setCoords ] = useState(null)
	const [ location, setLocation ] = useState({})
	const [ navigation, setNavigation ] = useState(false)

    const post = async (val, db, id) => {
		setNavigation(true)

		const location_url = 'https://us1.locationiq.com/v1/reverse.php'
		const token = process.env.REACT_APP_LOCATION_IQ
		const geocode_url = `${location_url}?key=${token}&lat=${coords[1]}&lon=${coords[0]}&format=json`
		const { data = { address:{}} } = await axios.get(geocode_url)

		const location = {
			value: val, 
			owner_id:id, 
			coords: coords,
			city: data.address.city,
			country: data.address.country,
			created: new Date()
		}

		setLocation(location)
		await db.insertOne(location).catch(console.log)
		const { created, coords: c, ...amplitude_event } = location
		amplitude.getInstance().logEvent('Submit Health', {amplitude_event})
    }

	const success = ({ coords: { latitude, longitude }}) => setCoords([longitude, latitude])
	const error = () => setCoords(default_coords)
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
        <Consumer>{({ id, db, cities, countries, locations }) => <Fragment>
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
