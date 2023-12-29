import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() footerVariant?: string;
  @Input() hideFooter?: boolean;

  //Get Year
  year = new Date().getFullYear()

  constructor() { }

  ngOnInit(): void {
  }

}
