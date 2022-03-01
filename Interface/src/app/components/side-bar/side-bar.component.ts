import { Component, OnInit } from '@angular/core';
import { ToolLabels, TOOL_LABELS } from 'src/app/objects/menu';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  toolLabels!: ToolLabels;

  constructor() {
    this.initialize()
   }

  private initialize(): void {
    this.toolLabels = TOOL_LABELS;
}

  ngOnInit(): void {
    
  }

  showLog() {
    console.log("Log clocked");
  }

}
