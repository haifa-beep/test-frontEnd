import { Component, OnInit, Input } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from "src/app/core/services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() navClass?: string;
  @Input() buttonList?: boolean;
  @Input() sliderTopbar?: boolean;
  @Input() isdeveloper?: boolean;
  @Input() shopPages?: boolean;


  constructor(private router: Router, private modalService: NgbModal, public userService: UserService) {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this._activateMenuDropdown();
      }
    });
  }

  isCondensed = false;

  ngAfterViewInit() {
    this._activateMenuDropdown();
  }

  ngOnInit(): void {
  }

  _activateMenuDropdown() {
    /**
     * Menu activation reset
     */
    const resetParent = (el: any) => {
      el.classList.remove("active");
      const parent = el.parentElement;

      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
      if (parent) {
        parent.classList.remove("active");
        const parent2 = parent.parentElement;
        if (parent2) {
          parent2.classList.remove("active");
          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("active");
            const parent4 = parent3.parentElement;
            if (parent4) {
              const parent5 = parent4.parentElement;
              parent5.classList.remove("active");

            }
          }
        }
      }
    };
    let links = document.getElementsByClassName("nav-link-ref");
    let matchingMenuItem = null;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < links.length; i++) {
      // reset menu
      resetParent(links[i]);
    }


  }

  /**
   * Window scroll method
   */
  // tslint:disable-next-line: typedef

  /**
   * Toggle menu
   */
  toggleMenu() {
    this.isCondensed = !this.isCondensed;
    if (this.isCondensed) {
      // document.getElementById("navigation").style.display = "block";
    } else {
      // document.getElementById("navigation").style.display = "none";
    }
  }

  /**
   * Menu clicked show the submenu
   */
  onMenuClick(event: any) {
    event.preventDefault();
    const nextEl = event.target.nextSibling.nextSibling;
    if (nextEl && !nextEl.classList.contains("open")) {
      const parentEl = event.target.parentNode;
      if (parentEl) {
        parentEl.classList.remove("open");
      }
      nextEl.classList.add("open");
    } else if (nextEl) {
      nextEl.classList.remove("open");
    }
    return false;
  }

  developerModal(content: any) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  wishListModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
}
