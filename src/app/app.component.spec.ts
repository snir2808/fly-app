import { DatePipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NotificationKind } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let datepipe: jasmine.SpyObj<DatePipe>;
  let toastr: jasmine.SpyObj<ToastrService>;
  let spinner: jasmine.SpyObj<NgxSpinnerService>;
  beforeEach(() => {
    datepipe = jasmine.createSpyObj(['transform']);
    spinner = jasmine.createSpyObj(['show']);
    toastr = jasmine.createSpyObj(['error']);
    component = new AppComponent(datepipe, toastr, spinner);
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convertStartDate', () => {
    component.convertStartDate('');
    expect(component).toBeTruthy();
  });

  it('should convertEndDate', () => {
    component.convertEndDate('');
    expect(component).toBeTruthy();
  });

  it('should findAirPortNameFrom', () => {
    component.findAirPortNameFrom('');
    expect(component).toBeTruthy();
  });

  it('should findAirPortNameTo', () => {
    component.findAirPortNameTo('');
    expect(component).toBeTruthy();
  });

  it('should setFromValue', () => {
    component.setFromValue('');
    expect(component).toBeTruthy();
  });

  it('should setToValue', () => {
    component.setToValue('');
    expect(component).toBeTruthy();
  });

  it('should itIsRoundtrip', () => {
    component.itIsRoundtrip(true);
    expect(component).toBeTruthy();
  });

  it('should NonStopFlights', () => {
    component.NonStopFlights(true);
    expect(component).toBeTruthy();
  });

  it('should passengerNum', () => {
    component.passengerNum(2);
    expect(component).toBeTruthy();
  });

  it('should flightSearch', () => {
    component.flightSearch();
    expect(component).toBeTruthy();
  });

  it('should flightSearch', () => {
    component.Roundtrip = false;

    component.flightSearch();
    expect(component).toBeTruthy();
  });
  it('should validation', () => {
    component.validation();
    expect(component).toBeTruthy();
  });

  it('should validation roundtrip false', () => {
    component.Roundtrip = false;
    component.validation();
    expect(component).toBeTruthy();
  });

  it('should validation roundtrip false', () => {
    component.Roundtrip = false;
    component.airPortsFrom = 'df';
    component.airPortsTo = 'dksjd';
    component.startDate = 'dhfj';
    component.validation();
    expect(component).toBeTruthy();
  });

  it('should validation roundtrip false 2nd if', () => {
    component.Roundtrip = true;
    component.airPortsFrom = 'df';
    component.airPortsTo = 'dksjd';
    component.startDate = 'dhfj';
    component.endDate = 'dhfj';
    component.validation();
    expect(component).toBeTruthy();
  });

  it('should setnumOfConnections', () => {
    component.setnumOfConnections(4);
    expect(component).toBeTruthy();
  });
  it('should setMinPrice', () => {
    component.setMinPrice(4);
    expect(component).toBeTruthy();
  });

  it('should setMaxPrice', () => {
    component.setMaxPrice(4);
    expect(component).toBeTruthy();
  });

  describe('should filterFlight', () => {
    it('should filterFlight', () => {
      component.numOfConnections = null;
      component.flightResult = [{ itineraries: { segments: [1] } }];
      component.numOfConnections = 0;
      component.filterFlight();
      expect(component).toBeTruthy();
    });

    it('should filterFlight', () => {
      component.flightResult = [{ itineraries: { segments: [1] } }];
      component.numOfConnections = 0;
      component.filterFlight();
      expect(component).toBeTruthy();
    });

    it('should filterFlight 3rd if', () => {
      component.flightResult = [
        { itineraries: { segments: [1] }, price: { total: 100 } },
      ];
      component.numOfConnections = 2;
      component.minPrice = 1;
      component.maxPrice = 1;

      component.filterFlight();
      expect(component).toBeTruthy();
    });

    it('should filterFlight 4th if', () => {
      component.flightResult = [
        {
          itineraries: { segments: [1, 8, '36,ryt,tt'] },
          price: { total: 100 },
        },
      ];
      component.numOfConnections = 2;
      component.minPrice = 0;
      component.maxPrice = 0;

      component.filterFlight();
      expect(component).toBeTruthy();
    });

    it('should filterFlight 5th if', () => {
      component.flightResult = [
        {
          itineraries: { segments: [1, 8, '36,ryt,tt'] },
          price: { total: 100 },
        },
      ];
      component.numOfConnections = 2;
      component.minPrice = 0;
      component.maxPrice = 1;

      component.filterFlight();
      expect(component).toBeTruthy();
    });
  });
});
