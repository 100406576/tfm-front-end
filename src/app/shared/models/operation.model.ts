export class Operation {
    operation_id?: string;
    description: string;
    date: Date;
    type: 'income' | 'expense';
    value: number;
    property_id: string;

    constructor() {
        this.description = '';
        this.date = new Date();
        this.type = 'income';
        this.value = NaN;
        this.property_id = '';
    }
}