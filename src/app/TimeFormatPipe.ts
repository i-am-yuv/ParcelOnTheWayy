import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeformat'
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: number): String {
    if (value) {
      console.log(value);
    }

    let time: string = (value.toString());
    console.log(time);
    let ans: string = "";
    let str1: string, str2: string, str3: string;
    if (time.length == 4) {
      str1 = time.substr(0, 2).toString();
      str2 = ":";
      str3 = time.substr(2, 2).toString();
      ans = "";
      // console.log(str1,str2,str3);
      ans = ans.concat(str1.toString(), str2.toString(), str3.toString());
      // console.log("ans=",ans);
      //ans=ans.concat(str2.toString);

    }
    else if (time.length == 3) {
      str1 = "0";
      str2 = time.substr(0, 1);
      str3 = time.substr(1, 2);
      ans = ans.concat(str1.toString(), str2.toString(), ":", str3.toString());



    }
    else if (time.length == 2) {
      str1 = "00:";
      str2 = time.substr(0, 2);

      ans = ans.concat(str1.toString(), str2.toString());





    }
    else {
      str1 = "00:0";
      str2 = time.substr(0, 1);
      ans = ans.concat(str1.toString(), str2.toString());


    }
    console.log(ans);
    return ans;
    // return value.filter((data: any) => this.matchValue(data,searchText)); 
  }


}