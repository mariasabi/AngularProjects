import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class XliffLoader implements TranslateLoader {
  constructor(private http: HttpClient, private prefix: string = '../assets/locale/', private suffix: string = '.xlf') {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get(`${this.prefix}messages.${lang}${this.suffix}`, { responseType: 'text' }).pipe(
      map(response => this.parseXliff(response))
    );
  }

  private parseXliff(xliff: string): any {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xliff, 'application/xml');
    const transUnits = xmlDoc.getElementsByTagName('trans-unit');
    const translations: any = {};

    for (let i = 0; i < transUnits.length; i++) {
      const unit = transUnits[i];
      const id = unit.getAttribute('id');
      const sourceElement = unit.getElementsByTagName('source')[0] ;
      const targetElement = unit.getElementsByTagName('target')[0] as Element|null;
      const target = targetElement ? targetElement.textContent : sourceElement;

      if (id && target !== null) {
        console.log("Translation");
        translations[id] = target;
      }
      else
      {
        console.log(target," warning");
      }
    }

    return translations;
  }
}
