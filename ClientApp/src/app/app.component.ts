import { Component } from '@angular/core';
import { TagDetailsService } from './tag-details.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: any;
  resdata: any;
  totalspots!: number | 0;
  feeperHour!: number | 0;
  availablespots!: number | 0;
  takenspotsCount!: number | 0;
  parkingspotslist: any;
  tagtextInput!: string;
  spots!: number | 0;
  todayRevenue!: number | 0;
  avgCarsPerDay!: number | 0;
  avgRevenuePerDay!: number | 0;
  isModalStatsShow: boolean = false;
  constructor(private service: TagDetailsService) { }


  ngOnInit() {
    this.getParkingspots();
  }
  async inTagValue() {
    try {
      if (this.tagtextInput != '' && this.tagtextInput != undefined) {
        const textdata = this.tagtextInput;
        await this.service.inTagData(textdata).subscribe((response) => {
          console.log(response);
        },
          (error) => {
            console.log('Error:', error.error.text);
            alert(error.error);
          });

        this.getParkingspots();
      }
      else {
        alert('Please Enter Tag Number');
      }
    } catch (error) {
      console.error(error);
    }
  }
  async outTagValue() {
    try {
      if (this.tagtextInput != '' && this.tagtextInput != undefined) {
        const textdata = this.tagtextInput;
        await this.service.outTagData(textdata).subscribe((response) => {
          this.resdata = response;
          if (this.resdata != true) {
            alert(this.resdata);
          }
          this.getParkingspots();
        },
          (error) => {
            console.log('Error:', error.error.text);
            alert(error.error.text);
          }
        );
        console.log(this.resdata);
      }
      else {
        alert('Please Enter Tag Number');
      }
    } catch (error) {
      console.error(error);
    }
  }
  async modalStats() {
    try {
      this.isModalStatsShow = !this.isModalStatsShow;
      this.data = this.service.getModalStats().subscribe((response) => {
        this.data = response;
        this.spots = this.data.availablespots;
        //console.log(this.data.availablespots);
        this.todayRevenue = this.data.todayRevenue;
        this.avgCarsPerDay = this.data.avgCarsPerDay;
        this.avgRevenuePerDay = this.data.avgRevenuePerDay;
      });

      this.getParkingspots();
    } catch (error) {
      console.error(error);
    }
  }
  async getParkingspots() {
    try {
      await this.service.getTagData().subscribe((response) => {
        //console.log(response);
        this.data = response;
        this.totalspots = this.data.totalspots;
        this.feeperHour = this.data.feeperHr;
        this.availablespots = this.data.availablespotsCount;
        this.takenspotsCount = this.data.takenspotsCount;
        this.parkingspotslist = this.data.parkingspotslist;
      });
    } catch (error) {
      console.error(error);
    }
  }
}
