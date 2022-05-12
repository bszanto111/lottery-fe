import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  requiredSizeOfSelection: number = 6;
  numberSelectionOfPanels: Set<number>[];
  results: string[];

  constructor() { }

  ngOnInit(): void {
    this.numberSelectionOfPanels = new Array(4);
  }

  updateNumberSelection(selectedNumbers: Set<number>, index: number): void {
    this.numberSelectionOfPanels[index] = selectedNumbers;
  }

  play() {
    this.results = [];
    for (let index = 0; index < this.numberSelectionOfPanels.length; index++) {
      let result: string = 'Panel ' + (index + 1) + ': ';
      const selectedNumbers: Set<number> = this.numberSelectionOfPanels[index];
      if (!selectedNumbers || selectedNumbers.size == 0) {
        result += 'empty';
      }
      else {
        if (selectedNumbers.size < this.requiredSizeOfSelection) {
          result += 'Error: ' + (this.requiredSizeOfSelection - selectedNumbers.size) + ' marks are missing';
        }
        else if (selectedNumbers.size > this.requiredSizeOfSelection) {
          result += 'Error: Please remove ' + (selectedNumbers.size - this.requiredSizeOfSelection) + ' mark';
        }
        else {
          const sortedSelectedNumbers: number[] = Array.from(selectedNumbers).sort((a, b) => a - b);
          for (let index = 0; index < sortedSelectedNumbers.length; index++) {
            const selectedNumber = sortedSelectedNumbers[index];
            result += selectedNumber;
            if (index < sortedSelectedNumbers.length - 1) {
              result += ','
            }
          }
        }
      }
      this.results.push(result);
    }
  }
}
