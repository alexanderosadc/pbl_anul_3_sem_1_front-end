import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-underlined-name',
  templateUrl: './underlined-name.component.html',
  styleUrls: ['./underlined-name.component.css'],
})
export class UnderlinedNameComponent implements OnInit {
  constructor() {}
  @Input('text') text: string;

  ngOnInit(): void {}
}
