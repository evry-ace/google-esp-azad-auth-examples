import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Inject({})
export class ConfigService {
  cfg: any = undefined;
  state = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  load() {
    this.http.get<any>('/assets/appConfig.json').subscribe(i => {
      this.cfg = i;

      this.state.next(true);
    });
  }
}
