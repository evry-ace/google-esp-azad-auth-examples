import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { OAuthService, JwksValidationHandler, AuthConfig } from 'angular-oauth2-oidc';

import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public accessToken: string;
  public data: any;

  constructor(
    private router: Router,
    private oauthService: OAuthService,
    private cfgService: ConfigService,
    private http: HttpClient
  ) {
    this.cfgService.state.subscribe(s => {
      if (s) {
        this.configure();
      }
    });
  }

  private configure() {
    const authConfig = this.cfgService.cfg.auth as AuthConfig;
    authConfig.strictDiscoveryDocumentValidation = false;

    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (!this.oauthService.hasValidAccessToken()) {
        this.oauthService.initLoginFlow();
      } else {
        // this.oauthService.loadUserProfile();
      }
    });
  }

  public logout() {
    this.oauthService.logOut();
  }

  public fetchData() {
    const token = this.oauthService.getAccessToken();
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    this.http.get(`${this.cfgService.cfg.apiEndpoint}`, {headers}).subscribe(data => {this.data = data})
  }

  public fetchUserInfo() {
    this.oauthService.loadUserProfile();
  }
}
