import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'timeformat'})
export class Timeformat implements PipeTransform {
  transform(value: number): String {
    let time:string;
    let hours:number=value/100;
   
   
    let minutes:number=value%100;
     let ans: string;
     ans=hours.toString()+":"+minutes.toString();
     
    return ans;
  }
}