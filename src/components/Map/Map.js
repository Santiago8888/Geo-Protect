import { StaticMap } from 'react-map-gl'
import { ColumnLayer } from '@deck.gl/layers'

import DeckGL from '@deck.gl/react'
import countries from '../../data/countries.json'
import React from 'react'


const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZHpldGEiLCJhIjoiY2s2cWFvbjBzMDIzZzNsbnhxdHI5eXIweCJ9.wQflyJNS9Klwff3dxtHJzg'
const MAP_STYLES = ['light-v10', 'dark-v10', 'outdoors-v11', 'satellite-v9']


const initialViewState = { 
    latitude: 10.69279,
    longitude: -80.9878993247973,

//    latitude: 37.7,
//    longitude: -122.4,

    zoom: 4.5,
    pitch: 55.5,
    bearing: 5.396674584323023
}

const data = [{centroid: [-122.4, 37.7], value: 0.2}]

//export const GeoLayer = () => {
export class GeoLayer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
            object: {},

		}
    }
    
    componentDidMount(){
		document.getElementById('deckgl-wrapper').addEventListener('contextmenu', evt => evt.preventDefault())

    }

	_getTooltip = ({ object }) => object
		? 	{ text:`Healthy: ${object.healthy}\n Sick: ${object.sick}` }
		:	null

    render() {

        const layer = new ColumnLayer({
            id: 'column-layer',
            data: countries,
            diskResolution: 12,
            radius: 50000,
            extruded: true,
            pickable: true,
            elevationScale: 5000,
            getPosition: d => [d.longitude, d.latitude],
            getFillColor: d => [128+((d.sick-128)*2), 0, 128-((d.sick-128)*2), 255], // Red, Green, Blue  
            getLineColor: [0, 0, 0],
            getElevation: d => d.sick,

          })
        
        return <DeckGL
            onContextMenu={event => event.preventDefault()}
            initialViewState={initialViewState}
            height={'90vh'}
            style={{marginTop:'10vh'}}
            controller={true}
            layers={[layer]}
            getTooltip={this._getTooltip}
        >
            <StaticMap 
                onContextMenu={event => event.preventDefault()}
                mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} 
                mapStyle={`mapbox://styles/mapbox/${MAP_STYLES[2]}`}
                attributionControl={false}
                onLoad={()=> console.log({loaded: true})}
            />
        </DeckGL>
    }
}