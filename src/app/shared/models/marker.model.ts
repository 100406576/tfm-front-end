export class Marker {
    position: {
      lat: number;
      lng: number;
    };
    property_id: string;

    constructor(position: { lat: number, lng: number }, property_id: string) {
        this.position = position;
        this.property_id = property_id;
    }
}