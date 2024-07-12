import { Component } from '@angular/core';
// import { DashComponent } from "../dash/dash.component";
import { MenutopComponent } from "../menutop/menutop.component";

@Component({
    selector: 'app-menu',
    standalone: true,
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss',
    imports: [ MenutopComponent]
})
export class MenuComponent {
  ngOnInit()
  {
    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
    allSideMenu.forEach(item=>{
      const li = item.parentElement;

      item.addEventListener('click',function(){
        allSideMenu.forEach(i=>{
          i.parentElement?.classList.remove('active');

        })
        li?.classList.add('active');

      })
    });

    // TOGGLE SIDEBAR
    //const menuBar = <any> document.querySelectorAll('#content nav .bx.bx-menu');


  }

  ngAfterViewInit()
  {
    // const hamBurger = document.querySelectorAll(".toggle-btn");

    // hamBurger.addEventListener("click", function () {
    //   document.querySelector("#sidebar").classList.toggle("expand");
    // });
  }
}
function ngOnInit() {
  throw new Error('Function not implemented.');
}

