import { Component } from '@angular/core';
//import { ChartData } from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labels1: string[] = [ 
    'Download Sales', 
    'In-Store Sales', 
    'Mail-Order Sales' 
  ];
  public labels2: string[] = [ 
    'Dogs Sales', 
    'Cat Sales', 
    'Others Sales' 
  ];
  public labels3: string[] = [ 
    'Facebook marketing', 
    'Anoucement marketing', 
    'Others Marketing' 
  ];
  public labels4: string[] = [ 
    'Sunny days', 
    'Wendy days', 
    'Raining days' 
  ];
  
  public data1 = [ 100, 100, 550 ];
  public data2 = [ 50, 550, 100 ];
  public data3 = [ 650, 250, 450 ];
  public data4 = [ 220, 550, 200 ];

  public colors1 = ['#7DCBF0','#E3B13D','#736AEF'];
  public colors2 = ['#56C7FD','#4DE398','#4DA2E3'];
  public colors3 = ['#FFB578','#D4E34D','#61FAD9'];
  public colors4 = ['#6D4DE3','#FA685D','#F156FA'];



  public otroData1 = { 
    data: [100, 100, 550],
    backgroundColor: ['#7DCBF0','#E3B13D','#736AEF']
  }
}
