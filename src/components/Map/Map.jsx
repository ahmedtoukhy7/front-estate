import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import './Map.scss'
import "leaflet/dist/leaflet.css";
import Pin from '../Pin/Pin';



export default function Map({items}) {

  console.log(items)

  
return <>

<MapContainer className='mapCont'  center={
       
          [52.4797, -1.90269]
      } zoom={7} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {/* {items.map((ele,inx)=> <Pin key={inx} ele={ele}/>)} */}
  </MapContainer>
  </>
}
