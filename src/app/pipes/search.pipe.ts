import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(alltransactions:any[],search_term:string,property:string):any[] {
  
  const result:any=[]
  if(!alltransactions || search_term=="" ||property==""){
    return alltransactions;

  }
  alltransactions.forEach((item:any)=>{
    if(item[property].trim().toLowerCase().includes(search_term.trim().toLowerCase())){
      result.push(item)
    }
  })
  return result;
  }

}
