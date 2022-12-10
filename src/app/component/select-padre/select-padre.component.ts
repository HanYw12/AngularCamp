import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-padre',
  templateUrl: './select-padre.component.html',
  styleUrls: ['./select-padre.component.css']
})
export class SelectPadreComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  cardValue: any = {
    options: []
  };

  selectOptions: Array<string> = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ,'asdfasdf'
  ];

  selectChange = (event: any) => {
    const key: string = event.key;
    this.cardValue[key] = [ ...event.data ];
    console.log(this.cardValue);
  };

}
