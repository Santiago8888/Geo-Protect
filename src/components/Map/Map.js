import React from 'react'
import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZHpldGEiLCJhIjoiY2s2cWFvbjBzMDIzZzNsbnhxdHI5eXIweCJ9.wQflyJNS9Klwff3dxtHJzg'
const MAP_STYLES = ['light-v10', 'dark-v10', 'outdoors-v11', 'satellite-v9']


const initialViewState = {    
    latitude: 0.69279,
    longitude: -80.9878993247973,

    zoom: 4.5,
    pitch: 55.5,
    bearing: 5.396674584323023
}


export const GeoLayer = () => <DeckGL
        onContextMenu={event => event.preventDefault()}
        initialViewState={initialViewState}
        height={'90vh'}
        style={{marginTop:'10vh'}}
        controller={true}
    >
    <StaticMap 
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} 
        mapStyle={`mapbox://styles/mapbox/${MAP_STYLES[2]}`}
        attributionControl={false}
        onLoad={()=> console.log({loaded: true})}
    />
</DeckGL>
