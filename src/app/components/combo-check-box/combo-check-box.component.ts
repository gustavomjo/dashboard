import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ComboCheckService } from './combocheck.service';

interface OptionModel {
  value: string;
  text: string;
}

@Component({
  selector: 'app-combo-check-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './combo-check-box.component.html',
  styleUrls: ['./combo-check-box.component.scss']
})
export class ComboCheckBoxComponent {
  dropdownOpen = false;
  options: OptionModel[] = []; //options: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  //selectedOptions: OptionModel[] = [];
  Atualiza : boolean = false;

  constructor(public combocheck: ComboCheckService) {
    this.combocheck.addOnUpdateCallbackLista(() => this.updateOptionsList());

  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    if (!this.dropdownOpen && this.Atualiza){
      this.combocheck.notifyUpdateSelected();
      this.Atualiza = false;
    }
  }

  onOptionChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    if (input.checked) {
      const selectedOption = this.options.find(option => option.value === value);
      if (selectedOption)
        this.combocheck.ListChecked.push(selectedOption);
    } else {
      this.combocheck.ListChecked = this.combocheck.ListChecked.filter(option => option.value !== value);
    }
    this.Atualiza = true;
  }

  areAllSelected(): boolean {
    return this.combocheck.ListChecked.length === this.options.length;
  }

  toggleSelectAll(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.combocheck.ListChecked = [...this.options];
    } else {
      this.combocheck.ListChecked = [];
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      if(this.Atualiza){
        this.dropdownOpen = false;
        this.combocheck.notifyUpdateSelected();
        this.Atualiza = false;
      }
    }
  }


//preenchendo a lista
  get selectedOptionsText(): string {
    return this.combocheck.ListChecked.length
      ? this.combocheck.ListChecked.map(opt => opt.text).join(', ')
      : 'Select options';
  }

  public updateOptionsList(): void {
    this.combocheck.ListChecked = []
    this.options = this.combocheck.List;
  }

  public updateSelectedOptions(): void {
    // Lógica para ser executada quando as opções selecionadas são atualizadas
  }
}
