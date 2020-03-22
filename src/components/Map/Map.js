import { ColumnLayer, IconLayer } from '@deck.gl/layers'
import DeckGL, {FlyToInterpolator} from 'deck.gl'
import { StaticMap } from 'react-map-gl'
import React from 'react'


const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZHpldGEiLCJhIjoiY2s2cWFvbjBzMDIzZzNsbnhxdHI5eXIweCJ9.wQflyJNS9Klwff3dxtHJzg'
const MAP_STYLES = ['light-v10', 'dark-v10', 'outdoors-v11', 'satellite-v9']
const MAX_ZOOM = 12.5

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
		this.state = { 
            viewState: initialViewState,
            layer: null
        }
    }
    
    componentDidMount(){
		document.getElementById('deckgl-wrapper').addEventListener('contextmenu', evt => evt.preventDefault())
    }

    componentWillReceiveProps({ navigation, coords }){
        if(navigation){
            this._goToViewState({longitude: coords[0], latitude: coords[1], zoom: 10.5})
        }
    }

    _onViewStateChange = viewState => {
        this.setState({ viewState: {...this.state.viewState, ...viewState, zoom: Math.min(MAX_ZOOM, viewState.zoom)} })
    }

    _goToViewState = props => {
        this._onViewStateChange({
            ...props,
            transitionDuration: 5000,
            transitionInterpolator: new FlyToInterpolator()            
        })
    }    

	_getTooltip = ({ object }) => object
        ? 	this.state.viewState.zoom < 9 
            ?   { text:`${object._id}\n Healthy: ${object.total - object.sick}\n Sick: ${object.sick}` }
            :   { text: object.value ? 'Sick' : 'Healthy' }
		:	null

    render() {
        const { viewState, layer } = this.state
        const { countries, cities, locations } = this.props

        const countryLayer = new ColumnLayer({
            id: 'column-layer',
            data: countries,
            diskResolution: 12,
            radius: 50000,
            extruded: true,
            pickable: true,
            elevationScale: 5000,
            getPosition: d => d.coords,
            getFillColor: d => [
                Math.round(127 * Math.max(0, Math.min(2, d.sick/(d.total - d.sick)))),
                0, 
                Math.round(127 * Math.max(0, Math.min(2, (d.total - d.sick)/d.sick))), 
                255
            ],   
            getLineColor: [0, 0, 0],
            getElevation: d => d.sick
        })

        const cityLayer = new ColumnLayer({
            id: 'column-layer',
            data: cities,
            diskResolution: 12,
            radius: 50000,
            extruded: true,
            pickable: true,
            elevationScale: 5000,
            getPosition: d => {console.log(d); return d.coords},
            getFillColor: d => [
                Math.round(127 * Math.max(0, Math.min(2, d.sick/(d.total - d.sick)))),
                0, 
                Math.round(127 * Math.max(0, Math.min(2, (d.total - d.sick)/d.sick))), 
                255
            ],   
            getLineColor: [0, 0, 0],
            getElevation: d => d.sick
        })

        const locationsLayer = new IconLayer({
            id: 'icon-layer',
            data: locations,
            pickable: true,
            iconAtlas: 'https://deck.gl/images/icon-atlas.png',
            iconMapping: ICON_MAPPING,
            getIcon: d => 'marker',
        
            sizeScale: 15,
            getPosition: d => d.coords,
            getSize: d => 10,
            getColor: d => [d.value*127, 140, 0],
        })

        const get_layer = ({ zoom }) => {
            if(zoom < 6) this.setState({layer: countryLayer})
            else if(zoom < 9) this.setState({layer: cityLayer})
            else return this.setState({layer: locationsLayer})
        }


        return <DeckGL
            onContextMenu={event => event.preventDefault()}
            initialViewState={ viewState }
            height={'90vh'}
            style={{marginTop:'10vh'}}
            controller={true}
            layers={[layer]}
            getTooltip={this._getTooltip}
            viewState={ viewState }
            onViewStateChange={({ viewState }) => {
                this._onViewStateChange(viewState)
                get_layer(viewState)
            }}
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
