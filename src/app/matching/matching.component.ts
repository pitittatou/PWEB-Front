import {Component, OnInit, Input} from '@angular/core';
import {Matching} from "../models/matching.models";

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.scss']
})
export class MatchingComponent implements OnInit{
  @Input() matching!: Matching;
  ngOnInit() {
  }
}
