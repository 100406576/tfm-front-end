import { NativeDateAdapter } from '@angular/material/core';

export class CustomDateAdapter extends NativeDateAdapter {
    override format(date: Date, displayFormat: Object): string {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        
        // Si el día o el mes son menores a 10, añade un cero al inicio
        let dayStr = day < 10 ? '0' + day : '' + day;
        let monthStr = month < 10 ? '0' + month : '' + month;

        return `${dayStr}/${monthStr}/${year}`;
    }

    override parse(value: any): Date | null {
        if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
          const str = value.split('/');
          const year = Number(str[2]);
          const month = Number(str[1]) - 1;
          const date = Number(str[0]);
          return new Date(year, month, date);
        }
        const timestamp = typeof value === 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
    }
}