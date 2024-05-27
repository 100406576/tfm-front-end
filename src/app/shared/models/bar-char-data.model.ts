export class BarChartData {
    labels: string[];
    income: number[];
    expenses: number[];

    constructor(labels: string[], income: number[], expenses: number[]) {
        this.labels = labels;
        this.income = income;
        this.expenses = expenses;
    }
}