export class Property {
    property_id: string;
    propertyName: string;
    address: string;
    cadastralReference: string;
    user_id: string;
    houseDetails?: House;
    flatDetails?: Flat;
    garageDetails?: Garage;

    constructor() {
        this.property_id = '';
        this.propertyName = '';
        this.address = '';
        this.cadastralReference = '';
        this.user_id = '';
    }
}

export class House {
    numberOfRooms: number;
    hasGarden: boolean;

    constructor() {
        this.numberOfRooms = 0;
        this.hasGarden = false;
    }
}

export class Flat {
    numberOfRooms: number;
    floorNumber: number;
    hasBalcony: boolean;

    constructor() {
        this.numberOfRooms = 0;
        this.floorNumber = 0;
        this.hasBalcony = false;
    }
}

export class Garage {
    capacity: number;
    isPrivate: boolean;

    constructor() {
        this.capacity = 0;
        this.isPrivate = false;
    }
}
