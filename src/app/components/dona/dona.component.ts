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

  @Input('labels') doughnutChartLabels: string[] = [ 'Label1', 'Label2', 'Label3' ];
  @Input() data: number[] = [ 400,100,50 ];
  @Input() colors: string[] = [ '#7DCBF0','#E3B13D','#736AEF' ];

  
  // Doughnut
  public doughnutChartData: ChartData<'doughnut'> = {
    datasets: [ ]
  };
  
  ngOnInit(): void {
    this.doughnutChartData.labels = this.doughnutChartLabels;
    this.doughnutChartData.datasets.push( 
        { data: this.data, 
          backgroundColor: this.colors
        });
  }


}
