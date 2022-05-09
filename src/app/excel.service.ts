import { Injectable } from '@angular/core';
import { WorkBook, WorkSheet, WritingOptions, read, writeFileXLSX as writeFile, utils, version, set_cptable } from 'xlsx';
import * as XLSX from 'xlsx';

type AOA = any[][];

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  data: AOA = [];
	wopts: WritingOptions = { bookType: 'xlsx', type: 'array' };
	// fileName: string = 'SheetJS.xlsx';
	// ver: string = version;

  constructor() { }

  readFile(event: any) {
      /* wire up file reader */
      const target: DataTransfer = <DataTransfer>(event.target);
      if (target.files.length !== 1) throw new Error('Cannot use multiple files');

      console.log('Reading file');
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const ab: ArrayBuffer = e.target.result;
        const wb: WorkBook = read(ab);

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: WorkSheet = wb.Sheets[wsname];

        console.log('wsname = ' + wsname);
        console.log('ws = ' + ws);

        /* save data */
        this.data = <AOA>(utils.sheet_to_json(ws, {header: 1}));
      };
      reader.readAsArrayBuffer(target.files[0]);

      console.log('Returning data ', this.data);
      return this.data;
  };

  public importFromFile(bstr: string): XLSX.AOA2SheetOpts {
    /* read workbook */
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    /* grab first sheet */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* save data */
    const data = <XLSX.AOA2SheetOpts>(XLSX.utils.sheet_to_json(ws, { header: 1 }));

    return data;
  }
}
