export interface MapMarker {
  latitude: number
  longitude: number
}
export interface GoogleMapClickEvent {
  latLng: {
    lat: () => number
    lng: () => number
  }
}
