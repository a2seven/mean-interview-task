import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getStarted() {
    this.router.navigate(['users']);
  }

}
