import { Component, Input, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit{
  @Input() titulo: string = 'Sin titulo';
  @Input() labels: string[] = [ 'Sin etiquetaA','Sin etiquetaB','Sin etiquetaC'];
  @Input() data: number[] = [ 400,100,50 ];
  @Input() colors: string[] = [ '#7DCBF0','#E3B13D','#736AEF' ];

  
  // Doughnut
  public doughnutChartData: ChartData<'doughnut'> = {
    datasets: [ ]
  };
  
  ngOnInit(): void {
    console.log(this.labels);
    this.doughnutChartData.labels = this.labels;
    this.doughnutChartData.datasets.push( 
        { data: this.data, 
          backgroundColor: this.colors
        });
  }


}
