import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import airPorts from './../assets/Airport Data.json';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { faPlaneArrival } from '@fortawesome/free-solid-svg-icons';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Fly-App';
  airPorts = airPorts;

  constructor(
    public datepipe: DatePipe,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  faPlane = faPlane;
  faPlaneDeparture = faPlaneDeparture;
  faPlaneArrival = faPlaneArrival;
  faLongArrowAltRight = faLongArrowAltRight;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  airPortsFromList: any;
  airPortsToList: any;

  airPortsFrom: any;
  airPortsTo: any;

  startDate: any;
  endDate: any;

  flightResult: any;
  noResult: boolean = false;
  noFilterResult: boolean = false;

  inputFrom: string = '';
  inputTo: string = '';

  Roundtrip: boolean = true;
  NonStopFlightsOnly: boolean = false;
  passenger: number = 1;

  numOfConnections: any;
  maxPrice: number = 0;
  minPrice: number = 0;

  token: string = ''


  convertStartDate(date: any) {
    this.startDate = this.datepipe.transform(date, 'yyyy-MM-dd');
  }
  convertEndDate(date: string) {
    this.endDate = this.datepipe.transform(date, 'yyyy-MM-dd');
  }

  findAirPortNameFrom(wordToMach: string) {
    let optionAirPortsFrom = this.airPorts.filter((airPort) => {
      const regex = new RegExp(wordToMach, 'gi');
      return (
        airPort.city.match(regex) ||
        airPort.country.match(regex) ||
        airPort.code.match(regex)
      );
    });
    optionAirPortsFrom = optionAirPortsFrom.splice(0, 10);
    this.airPortsFromList = optionAirPortsFrom;
  }

  findAirPortNameTo(wordToMach: string) {
    let optionAirPortsTo = this.airPorts.filter((airPort) => {
      const regex = new RegExp(wordToMach, 'gi');
      return (
        airPort.city.match(regex) ||
        airPort.country.match(regex) ||
        airPort.code.match(regex)
      );
    });
    optionAirPortsTo = optionAirPortsTo.splice(0, 10);
    this.airPortsToList = optionAirPortsTo;
  }

  setFromValue(airPortFrom: any) {
    console.log(airPortFrom);
    this.inputFrom = `${airPortFrom.code}, ${airPortFrom.name}`;
    this.airPortsFromList = [];

    this.airPortsFrom = airPortFrom.code;
  }

  setToValue(airPortTo: any) {
    console.log(airPortTo);
    this.inputTo = `${airPortTo.code}, ${airPortTo.name}`;
    this.airPortsToList = [];
    this.airPortsTo = airPortTo.code;
  }

  itIsRoundtrip(Roundtrip: boolean) {
    this.Roundtrip = Roundtrip;
    console.log(this.Roundtrip);
  }

  NonStopFlights(NonStop: boolean) {
    this.NonStopFlightsOnly = NonStop;
  }
  passengerNum(number: number) {
    this.passenger = number;
  }

  flightSearch() {
    this.spinner.show()
    let url: string = ''
    this.noResult = false
    if (this.Roundtrip == false) {
      url = `https://api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${this.airPortsFrom}&destinationLocationCode=${this.airPortsTo}&departureDate=${this.startDate}&adults=${this.passenger}&nonStop=${this.NonStopFlightsOnly}&currencyCode=USD&max=100`
    } else {
      url = `https://api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${this.airPortsFrom}&destinationLocationCode=${this.airPortsTo}&departureDate=${this.startDate}&returnDate=${this.endDate}&adults=${this.passenger}&nonStop=${this.NonStopFlightsOnly}&currencyCode=USD&max=100`
    }
    fetch(url, {
      method: 'GET', // or 'PUT'
      headers: {
        'Authorization': `Bearer ${this.token}`,
      }
    })
      .then(response => response.json())
      .then(data => {
        var result = []
        for (var i = 0; i < data.data.length; i++) {
          let j = i + 1
          if (j < data.data.length) {
            if (data.data[i].price.total !== data.data[j].price.total) {
              result.push(data.data[i])
            }
          }
        }
        if (result.length == 0) {
          this.spinner.hide();
          this.flightResult = false
          this.noResult = true
        } else {
          this.spinner.hide();
          this.flightResult = result
        }

        console.log('Success:', data);
        console.log(this.flightResult);
      })
      .catch((error) => {
        console.error('Error:', error);
        this.spinner.hide();
        this.noResult = true
      });
  }

  validation() {
    if (this.Roundtrip == false) {
      if (!this.airPortsFrom || !this.airPortsTo || !this.startDate || !this.passenger) {
        this.toastr.error('make sure you fill all the fields', 'check your input')
      } else {
        return this.flightSearch()
      }
    }
    if (!this.airPortsFrom || !this.airPortsTo || !this.startDate || !this.endDate || !this.passenger) {
      this.toastr.error('make sure you fill all the fields', 'check your input')
    } else {
      this.Authorization()
    }
  }






  Authorization() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("client_id", "ZAcG1pGj9GnKdKobiursR8OOOtVHZXBK");
    urlencoded.append("grant_type", "client_credentials");
    urlencoded.append("client_secret", "KiKCnpD32tC9hu03");

    var requestOptions: any = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("https://api.amadeus.com/v1/security/oauth2/token", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        this.token = result.access_token
        this.flightSearch()
      })
      .catch(error => console.log('error', error));

  }

  setnumOfConnections(num: number) {
    this.numOfConnections = num;
  }
  setMinPrice(min: number) {
    this.minPrice = min;
  }
  setMaxPrice(max: number) {
    this.maxPrice = max;
  }
  filterFlight() {
    let filteredArray = [];
    if (this.numOfConnections == undefined) {
      this.numOfConnections = 0;
    }
    for (let i = 0; i < this.flightResult.length; i++) {
      let connctions = this.flightResult[i]?.itineraries[0]?.segments;
      if (
        this.numOfConnections == 0 &&
        this.maxPrice == 0 &&
        this.minPrice == 0
      ) {
        return;
      }
      if (
        this.minPrice != 0 &&
        this.maxPrice != 0 &&
        this.numOfConnections != 0
      ) {
        if (
          Number(this.flightResult[i].price.total) <= Number(this.maxPrice) &&
          Number(this.flightResult[i].price.total) >= Number(this.minPrice) &&
          Number(connctions.length - 1) <= Number(this.numOfConnections)
        ) {
          filteredArray.push(this.flightResult[i]);
        }
      } else if (this.minPrice == 0 && this.maxPrice == 0) {
        if (Number(connctions?.length - 1) <= Number(this.numOfConnections)) {
          filteredArray.push(this.flightResult[i]);
        }
      } else if (this.minPrice == 0 && this.maxPrice != 0) {
        if (Number(this.flightResult[i].price.total) <= Number(this.maxPrice)) {
          filteredArray.push(this.flightResult[i]);
        }
      } else if (this.minPrice != 0 && this.maxPrice != 0) {
        if (
          Number(this.flightResult[i].price.total) <= Number(this.maxPrice) &&
          Number(this.flightResult[i].price.total) >= Number(this.minPrice)
        ) {
          filteredArray.push(this.flightResult[i]);
        }
      }
    }
    if (filteredArray?.length == 0) {
      this.noFilterResult = true;
    } else {
      this.noFilterResult = false;
      this.flightResult = filteredArray;
    }
    console.log(filteredArray);
  }
}
