import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { UserService } from 'src/app/shared/core/services/user.service';

@Component({
  selector: 'app-profile-statistics',
  templateUrl: './profile-statistics.component.html',
  styleUrls: ['./profile-statistics.component.scss']
})
export class ProfileStatisticsComponent implements OnInit, AfterViewInit {
  moneyToTime = {
    money: [],
    date: []
  };

  unsuccessfulBetsToTime = {
    date: [],
    bets: []
  };

  successfulBetsToTime = {
    date: [],
    bets: []
  };

  betsToTime = {
    date: [],
    bets: []
  };

  unsuccessfulLotsToTime = {
    date: [],
    lots: []
  };

  successfulLotsToTime = {
    date: [],
    lots: []
  };

  lotsToTime = {
    date: [],
    lots: []
  };

  objectKeys = [];
  requestedData: any;
  chartmoneyToTime = [];
  chartlotsToTime = [];
  chartsuccessfulLotsToTime = [];
  chartunsuccessfulLotsToTime = [];
  chartbetsToTime = [];
  chartsuccessfulBetsToTime = [];
  chartunsuccessfulBetsToTime = [];

  @ViewChild('unsuccessfulBetsToTime') canvasRefunsuccessfulBetsToTime: ElementRef;
  @ViewChild('lotsToTime') canvasReflotsToTime: ElementRef;
  @ViewChild('successfulLotsToTime') canvasRefsuccessfulLotsToTime: ElementRef;
  @ViewChild('unsuccessfulLotsToTime') canvasRefunsuccessfulLotsToTime: ElementRef;
  @ViewChild('betsToTime') canvasRefbetsToTime: ElementRef;
  @ViewChild('successfulBetsToTime') canvasRefsuccessfulBetsToTime: ElementRef;
  @ViewChild('moneyToTime') canvasRefmoneyToTime: ElementRef;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getStatistics().subscribe(res => {
      this.objectKeys = Object.keys(res);
      this.requestedData = res;

      this.objectKeys.map(data => {
        this.uploadChartsData(
          data,
          this.requestedData[data]
        );
      });
    });
  }

  uploadChartsData(data: string, array: any) {
    array.map(res => {
      this[data][Object.keys(array[0])[0]].push(res[Object.keys(array[0])[0]]);
      this[data][Object.keys(array[0])[1]].push(res[Object.keys(array[0])[1]]);
      
      console.log(this[data][Object.keys(array[0])[0]]);

      this[`chart${data}`] = new Chart(this[`canvasRef${data}`].nativeElement.getContext('2d'), {
        type: 'line',
        data: {
          labels: this[data][Object.keys(array[0])[0]],
          datasets: [
            {
              data: this[data][Object.keys(array[0])[1]],
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });
  }

  ngAfterViewInit(): void {
    // const ctx = this.canvasRef.nativeElement.getContext('2d');
    // console.log(this.lotsToTime);
    // this.chart = new Chart(ctx, {
    //   type: 'line',
    //   data: {
    //     labels: this.month,
    //     datasets: [
    //       {
    //         data: this.price,
    //         borderColor: '#3cba9f',
    //         fill: false
    //       }
    //     ]
    //   },
    //   options: {
    //     legend: {
    //       display: false
    //     },
    //     scales: {
    //       xAxes: [{
    //         display: true
    //       }],
    //       yAxes: [{
    //         display: true
    //       }],
    //     }
    //   }
    // });
  }
}
