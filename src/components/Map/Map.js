import { StaticMap } from 'react-map-gl'
import { ColumnLayer, IconLayer } from '@deck.gl/layers'

import countries from '../../data/countries.json'
import locations from '../../data/locations.json'
import DeckGL, {FlyToInterpolator} from 'deck.gl'


import React from 'react'


const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZHpldGEiLCJhIjoiY2s2cWFvbjBzMDIzZzNsbnhxdHI5eXIweCJ9.wQflyJNS9Klwff3dxtHJzg'
const MAP_STYLES = ['light-v10', 'dark-v10', 'outdoors-v11', 'satellite-v9']


const initialViewState = { 
    latitude: 10.69279,
    longitude: -80.9878993247973,

    zoom: 4.5,
    pitch: 55.5,
    bearing: 5.396674584323023
}

const ICON_MAPPING = {
    marker: {x: 0, y: 0, width: 32, height: 32, mask: true}
}

export class GeoLayer extends React.Component {
	constructor(props) {
		super(props)
		this.state = { viewState: initialViewState }
    }
    
    componentDidMount(){
		document.getElementById('deckgl-wrapper').addEventListener('contextmenu', evt => evt.preventDefault())
    }

    componentWillReceiveProps({ navigation }){
        if(navigation){
            this._goToViewState({...navigation, zoom: 10.5})
        }
    }

    _onViewStateChange = viewState => {
        this.setState({ viewState: {...this.state.viewState, ...viewState} })
        console.log({...this.state.viewState, ...viewState})
    }
    _goToViewState = props => {
        this._onViewStateChange({
            ...props,
            transitionDuration: 5000,
            transitionInterpolator: new FlyToInterpolator()            
        })
    }    

	_getTooltip = ({ object }) => object
        ? 	this.state.viewState.zoom < 6 
            ?   { text:`Healthy: ${object.healthy}\n Sick: ${object.sick}` }
            :   { text: object.isSick ? 'Sick' : 'Healthy' }
		:	null

    render() {
        const { viewState } = this.state

        const aggregateLayer = new ColumnLayer({
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
            getElevation: d => d.sick
        })

        const iconLayer = new IconLayer({
            id: 'icon-layer',
            data: locations,
            pickable: true,
            iconAtlas: 'https://deck.gl/images/icon-atlas.png',
            iconMapping: ICON_MAPPING,
            getIcon: d => 'marker',
        
            sizeScale: 15,
            getPosition: d => [d.longitude, d.latitude],
            getSize: d => 10,
            getColor: d => [d.isSick*200, 140, 0],
        })
        
        return <DeckGL
            onContextMenu={event => event.preventDefault()}
            initialViewState={ viewState }
            height={'90vh'}
            style={{marginTop:'10vh'}}
            controller={true}
            layers={viewState.zoom > 6 ? [iconLayer] : [aggregateLayer]}
            getTooltip={this._getTooltip}
            viewState={ viewState }
            onViewStateChange={({ viewState }) => this._onViewStateChange(viewState)}
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