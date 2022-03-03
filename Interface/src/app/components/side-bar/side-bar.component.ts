import { Component, OnInit } from '@angular/core';
import { ToolLabels, TOOL_LABELS } from 'src/app/objects/menu';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  toolLabels: ToolLabels = TOOL_LABELS;
  isVisible: boolean = true;


  constructor() {}

  ngOnInit(): void {
    
  }

  showLog() {
    window.open('/log-page',"_blank");
  }

  hideSidebar() {
    var sidebar = document.getElementById("sidebar");
    if (sidebar != null)
      sidebar.hidden = true;
    console.log ("Helooooo!")
  }

}
