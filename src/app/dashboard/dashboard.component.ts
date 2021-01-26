import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NasaService } from '../services/nasa.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  displayedColumns: string[] = ['id', 'neo_reference_id', 'name', 'nasa_jpl_url', 'absolute_magnitude_h', 'estimated_diameter'];
  dataSource: MatTableDataSource<any>;
  public result: any;
  public nearEarthData: any;
  public loading = false;
  apiKey: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private nasaService: NasaService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getNasaResult() {
    if (this.apiKey) {
      this.getData(this.apiKey);
    } else {
      this._snackBar.open('Please enter the API key, if not then get one at https://api.nasa.gov:443', '',
      { duration: 2000 });
    }
  }

  public getData(key) {
    this.loading = true;
    this.nasaService.getNasaResult(key).subscribe((response) => {
      this.result = response;
      this.loading = false;
      let today = new Date().toISOString().slice(0, 10);
      this.nearEarthData = this.result.near_earth_objects[today];
      this.dataSource = new MatTableDataSource(this.nearEarthData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, (err) => {
      this.loading = false;
      this._snackBar.open(err.error.error.message, '', { duration: 3000 });
    });
  }

}
