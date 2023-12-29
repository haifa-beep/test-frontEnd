import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-switcher',
  templateUrl: './switcher.component.html',
  styleUrls: ['./switcher.component.scss']
})
export class SwitcherComponent implements OnInit {

  isVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // assign value
    this.isVisible = false;
  }

  onChangeColor(color: string) {
    const colorPath = `./assets/css/colors/${color}.css`;
    this.updateStyleSheet('color-opt', colorPath);
  }

  setDark() {
    const darkPath = './assets/css/style-dark.min.css';
    this.updateStyleSheet('theme-opt', darkPath);
  }

  setLight() {
    const lightPath = './assets/css/style.min.css';
    this.updateStyleSheet('theme-opt', lightPath);
  }

  darkRtl() {
    const darkRtlPath = './assets/css/style-dark-rtl.min.css';
    this.updateStyleSheet('theme-opt', darkRtlPath);
  }

  darkLtr() {
    const darkPath = './assets/css/style-dark.min.css';
    this.updateStyleSheet('theme-opt', darkPath);
  }

  setRtl() {
    const rtlPath = './assets/css/style-rtl.min.css';
    this.updateStyleSheet('theme-opt', rtlPath);
  }

  setLtr() {
    const ltrPath = './assets/css/style.min.css';
    this.updateStyleSheet('theme-opt', ltrPath);
  }

  onChangeSwitch() {
    this.isVisible = !this.isVisible;
  }

  private updateStyleSheet(id: string, path: string) {
    const linkElement = document.getElementById(id) as HTMLLinkElement;
    if (linkElement) {
      linkElement.href = path;
    }
  }
}
