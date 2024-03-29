/**
 * SNC
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { NetworkType } from '../model/networkType';
import { Response } from '../model/response';
import { UserChannelDTO } from '../model/userChannelDTO';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class ChannelsService {

    protected basePath = '/';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Subscribe to the channel
     * 
     * @param networkType 
     * @param name 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public subscribe(networkType: NetworkType, name: string, observe?: 'body', reportProgress?: boolean): Observable<Response>;
    public subscribe(networkType: NetworkType, name: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Response>>;
    public subscribe(networkType: NetworkType, name: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Response>>;
    public subscribe(networkType: NetworkType, name: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (networkType === null || networkType === undefined) {
            throw new Error('Required parameter networkType was null or undefined when calling subscribe.');
        }

        if (name === null || name === undefined) {
            throw new Error('Required parameter name was null or undefined when calling subscribe.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (networkType !== undefined && networkType !== null) {
            queryParameters = queryParameters.set('networkType', <any>networkType);
        }
        if (name !== undefined && name !== null) {
            queryParameters = queryParameters.set('name', <any>name);
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Response>('post',`${this.basePath}/api/Channels/subscription`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get all user subscriptions
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public subscriptions(observe?: 'body', reportProgress?: boolean): Observable<Array<UserChannelDTO>>;
    public subscriptions(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<UserChannelDTO>>>;
    public subscriptions(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<UserChannelDTO>>>;
    public subscriptions(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<UserChannelDTO>>('get',`${this.basePath}/api/Channels/subscriptions`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Unsubscribe to the channel
     * 
     * @param networkType 
     * @param name 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public unsubscribe(networkType: NetworkType, name: string, observe?: 'body', reportProgress?: boolean): Observable<Response>;
    public unsubscribe(networkType: NetworkType, name: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Response>>;
    public unsubscribe(networkType: NetworkType, name: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Response>>;
    public unsubscribe(networkType: NetworkType, name: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (networkType === null || networkType === undefined) {
            throw new Error('Required parameter networkType was null or undefined when calling unsubscribe.');
        }

        if (name === null || name === undefined) {
            throw new Error('Required parameter name was null or undefined when calling unsubscribe.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (networkType !== undefined && networkType !== null) {
            queryParameters = queryParameters.set('networkType', <any>networkType);
        }
        if (name !== undefined && name !== null) {
            queryParameters = queryParameters.set('name', <any>name);
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }
        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Response>('post',`${this.basePath}/api/Channels/unsubscribe`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
