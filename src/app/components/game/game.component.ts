import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  requiredSizeOfSelection: number = 6;
  numberSelectionOfPanels: Set<number>[];
  results: string[];

  constructor(
    private loginService: LoginService,
    private router: Router) { }

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
      const selectedNumbers: Set<number> = this.numberSelectionOfPanels[index] ?? new Set();
      if (selectedNumbers.size === 0) {
        result += 'empty';
        this.results.push(result);
        continue;
      }
      if (selectedNumbers.size === this.requiredSizeOfSelection) {
        result += this.buildNumberListText(selectedNumbers);
      }
      else {
        result += this.buildErrorMessage(selectedNumbers.size);
      }
      this.results.push(result);
    }
  }

  private buildNumberListText(selectedNumbers: Set<number>) {
    let result: string = '';
    const sortedSelectedNumbers: number[] = Array.from(selectedNumbers).sort((a, b) => a - b);
    for (let index = 0; index < sortedSelectedNumbers.length; index++) {
      const selectedNumber = sortedSelectedNumbers[index];
      result += selectedNumber;
      if (index < sortedSelectedNumbers.length - 1) {
        result += ',';
      }
    }
    return result;
  }

  buildErrorMessage(size: number) {
    if (size > this.requiredSizeOfSelection) {
      return 'Error: Please remove ' + (size - this.requiredSizeOfSelection) + ' mark';
    }
    if (size < this.requiredSizeOfSelection) {
      return 'Error: ' + (this.requiredSizeOfSelection - size) + ' marks are missing';
    }
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
