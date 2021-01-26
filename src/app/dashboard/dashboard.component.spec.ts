import { throwError, of } from 'rxjs';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from '../app-routing.module';
import { NasaService } from '../services/nasa.service';
import { DashboardComponent } from './dashboard.component';
import { emitKeypressEvents } from 'readline';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  const nasaServiceStub = jasmine.createSpyObj('NasaService', ['getNasaResult']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        MatTableModule,
        FormsModule,
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatButtonModule,
        MatTableModule,
        MatInputModule,
        MatProgressBarModule,
        MatSnackBarModule,
        MatSidenavModule,
        MatSortModule
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: NasaService, useValue: nasaServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getNasaResult when getData is called', () => {
    nasaServiceStub.getNasaResult.and.returnValue(of(getData()));
    component.getData('xyz');
    expect(component.loading).toBeFalse();
  });

  it('should throw error when getData is called', () => {
    nasaServiceStub.getNasaResult.and.returnValue(throwError('error'));
    component.getData('xyz');
    expect(component.loading).toBeFalse();
  });

  it('should call getData when getNasaResult is called', () => {
    spyOn(component, 'getData').and.stub();
    component.apiKey = 'xyz'
    component.getNasaResult();
    expect(component.getData).toHaveBeenCalled();
  });

  it('should set dataSource.filter when filter applied', () => {
    component.dataSource = new MatTableDataSource();
    const event = { target: { value: 'xyz' }};

    console.log(event)
    component.applyFilter(event);
    expect(true).toBeTrue();
  });

});


function getData() {
  let today = new Date().toISOString().slice(0, 10)
  let array = [
    {
      'links': {
        'self': 'http://www.neowsapp.com/rest/v1/neo/2189040?api_key=LTfATfus64FS3I1PyK8NDI3gBqQuyPX0tEO6YhJz'
      },
      'id': '2189040',
      'neo_reference_id': '2189040',
      'name': '189040 (2000 MU1)',
      'nasa_jpl_url': 'http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=2189040',
      'absolute_magnitude_h': 19.9,
      'estimated_diameter': {
        'kilometers': {
          'estimated_diameter_min': 0.2783267681,
          'estimated_diameter_max': 0.6223575734
        },
        'meters': {
          'estimated_diameter_min': 278.3267680719,
          'estimated_diameter_max': 622.3575733667
        },
        'miles': {
          'estimated_diameter_min': 0.1729441822,
          'estimated_diameter_max': 0.3867149477
        },
        'feet': {
          'estimated_diameter_min': 913.1455937611,
          'estimated_diameter_max': 2041.8556210042
        }
      },
      'is_potentially_hazardous_asteroid': true,
      'close_approach_data': [
        {
          'close_approach_date': '2021-01-26',
          'close_approach_date_full': '2021-Jan-26 06:53',
          'epoch_date_close_approach': 1611643980000,
          'relative_velocity': {
            'kilometers_per_second': '14.3761058376',
            'kilometers_per_hour': '51753.9810155238',
            'miles_per_hour': '32157.9111482292'
          },
          'miss_distance': {
            'astronomical': '0.0911532595',
            'lunar': '35.4586179455',
            'kilometers': '13636333.464757265',
            'miles': '8473224.706349657'
          },
          'orbiting_body': 'Earth'
        }
      ],
      'orbital_data': {
        'orbit_id': '82',
        'orbit_determination_date': '2021-01-19 05:28:16',
        'first_observation_date': '2000-06-24',
        'last_observation_date': '2021-01-18',
        'data_arc_in_days': 7513,
        'observations_used': 272,
        'orbit_uncertainty': '0',
        'minimum_orbit_intersection': '.0101602',
        'jupiter_tisserand_invariant': '4.715',
        'epoch_osculation': '2459000.5',
        'eccentricity': '.382536253190838',
        'semi_major_axis': '1.372901212976422',
        'inclination': '13.09467216159252',
        'ascending_node_longitude': '130.084804484256',
        'orbital_period': '587.5669510110649',
        'perihelion_distance': '.8477167269632651',
        'perihelion_argument': '63.64945210183415',
        'aphelion_distance': '1.89808569898958',
        'perihelion_time': '2459287.658641669370',
        'mean_anomaly': '184.0590100871307',
        'mean_motion': '.612696135105156',
        'equinox': 'J2000',
        'orbit_class': {
          'orbit_class_type': 'APO',
          'orbit_class_description': 'Near-Earth asteroid orbits which cross the Earth’s orbit similar to that of 1862 Apollo',
          'orbit_class_range': 'a (semi-major axis) > 1.0 AU; q (perihelion) < 1.017 AU'
        }
      },
      'is_sentry_object': false
    },

  ]
  return {
    'element_count': 7,
    'near_earth_objects': {
      today:array
    }
  }
}
