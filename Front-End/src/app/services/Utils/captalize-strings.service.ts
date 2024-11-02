import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CapitalizeService {
  constructor() {}

  capitalize(str: string): string {
    if (!str) return str;
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
