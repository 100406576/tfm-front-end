export class Operation {
    operation_id: string;
    type: string;
    description: string;
    date: Date;
    value: number;
    property_id: string;

    constructor(operation_id: string, type: string, description: string, date: Date, value: number, property_id: string) {
        this.operation_id = operation_id;
        this.type = type;
        this.description = description;
        this.date = date;
        this.value = value;
        this.property_id = property_id;
    }
}