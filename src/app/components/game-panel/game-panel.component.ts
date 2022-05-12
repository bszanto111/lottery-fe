import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RandomNumberGeneratorService } from 'src/app/services/random-number-generator.service';

@Component({
  selector: 'app-game-panel',
  templateUrl: './game-panel.component.html',
  styleUrls: ['./game-panel.component.scss']
})
export class GamePanelComponent implements OnInit {

  @Input()
  numberOfPanel: number;

  @Output()
  selectedNumbersChange: EventEmitter<Set<number>> = new EventEmitter<Set<number>>();

  numbers: number[] = Array.from({length: 49}, (_, i) => i + 1);

  selectedNumbers: Set<number> = new Set<number>();

  constructor(private randomNumberGeneratorService: RandomNumberGeneratorService) { }

  ngOnInit(): void {
  }

  async selectRandomNumbers(): Promise<void> {
    this.selectedNumbers = await this.randomNumberGeneratorService.getGeneratedRandomNumbers(6);
    this.selectedNumbersChange.emit(this.selectedNumbers);
  }

  deleteNumberSelection(): void {
    this.selectedNumbers.clear();
    this.selectedNumbersChange.emit(this.selectedNumbers);
  }

  toggleNumberSelection(event, numberInBox) {
    if (this.selectedNumbers.has(numberInBox)) {
      this.selectedNumbers.delete(numberInBox);
    }
    else {
      this.selectedNumbers.add(numberInBox);
    }
    this.selectedNumbersChange.emit(this.selectedNumbers);
  }
}
