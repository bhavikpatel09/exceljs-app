import { Component } from '@angular/core';
import * as Excel from "exceljs/dist/exceljs.min.js";
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'excel-app';

  generateExcel(): void{

    var options = {
      filename: './streamed-workbook.xlsx',
      useStyles: true,
      useSharedStrings: true
    };
    let workbook = new Excel.Workbook(options);

    // workbook.creator = 'Me';
    // workbook.lastModifiedBy = 'Her';
    // workbook.created = new Date(1985, 8, 30);
    // workbook.modified = new Date();
    // workbook.lastPrinted = new Date(2016, 9, 27);
    // create a sheet with red tab colour
    var worksheet = workbook.addWorksheet('My Sheet', {properties:{tabColor:{argb:'FFC0000'}}});
    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 32, style: { font: { name: 'Arial Black', color: { argb: 'FF0000' } } } },
      { header: 'D.O.B.', key: 'DOB', width: 10, style: { numFmt: 'dd/mm/yyyy' } }
    ];
    worksheet.addRow({id: 1, name: 'Bhavik Patel', dob: new Date(1989,1,1)});    

    let fileName="demo_file.xlsx";
    const excelBuffer: any = workbook.xlsx.writeBuffer();
    workbook.xlsx.writeBuffer()
        .then(function(buffer) {
            // done buffering
            const data: Blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            FileSaver.saveAs(data, fileName);
        });
  }
}
