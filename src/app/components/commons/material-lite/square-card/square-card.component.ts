import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-square-card',
  templateUrl: './square-card.component.html',
  styleUrls: ['./square-card.component.css']
})
export class SquareCardComponent implements OnInit {

  @Input() cardTitle: string;
  //cardTitle = "My card";
  @Input() cardText: string;
  //cardText = "Esta es una tarjeta cuadrada sencilla.";
  @Input() cardLinkText: string;
  //cardLinkText = "Read More";
  @Input() cardLink: string;
  //cardLink = 'home';

  constructor() { }

  ngOnInit() {
  }

}
