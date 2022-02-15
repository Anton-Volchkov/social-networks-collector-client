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

import { DefaultSubscriptionsDTO } from '../model/defaultSubscriptionsDTO';
import { Response } from '../model/response';
import { SubscriptionsGroupDTO } from '../model/subscriptionsGroupDTO';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class SubscriptionsGroupService {

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
     * Add subscription to subscriptions group
     * 
     * @param groupName 
     * @param subscriptionId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addSubscriptionToSubscriptionsGroup(groupName: string, subscriptionId: number, observe?: 'body', reportProgress?: boolean): Observable<Response>;
    public addSubscriptionToSubscriptionsGroup(groupName: string, subscriptionId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Response>>;
    public addSubscriptionToSubscriptionsGroup(groupName: string, subscriptionId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Response>>;
    public addSubscriptionToSubscriptionsGroup(groupName: string, subscriptionId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (groupName === null || groupName === undefined) {
            throw new Error('Required parameter groupName was null or undefined when calling addSubscriptionToSubscriptionsGroup.');
        }

        if (subscriptionId === null || subscriptionId === undefined) {
            throw new Error('Required parameter subscriptionId was null or undefined when calling addSubscriptionToSubscriptionsGroup.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (groupName !== undefined && groupName !== null) {
            queryParameters = queryParameters.set('groupName', <any>groupName);
        }
        if (subscriptionId !== undefined && subscriptionId !== null) {
            queryParameters = queryParameters.set('subscriptionId', <any>subscriptionId);
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

        return this.httpClient.request<Response>('post',`${this.basePath}/api/SubscriptionsGroup/add-subscription-to-group-subscriptions`,
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
     * Add new subscription group
     * 
     * @param groupName 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addSubscriptionsGroup(groupName: string, observe?: 'body', reportProgress?: boolean): Observable<Response>;
    public addSubscriptionsGroup(groupName: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Response>>;
    public addSubscriptionsGroup(groupName: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Response>>;
    public addSubscriptionsGroup(groupName: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (groupName === null || groupName === undefined) {
            throw new Error('Required parameter groupName was null or undefined when calling addSubscriptionsGroup.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (groupName !== undefined && groupName !== null) {
            queryParameters = queryParameters.set('groupName', <any>groupName);
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

        return this.httpClient.request<Response>('post',`${this.basePath}/api/SubscriptionsGroup/add-subscription-group`,
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
     * Delete subscription from subscriptions group
     * 
     * @param groupName 
     * @param subscriptionId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteSubscriptionFromSubscriptionsGroup(groupName: string, subscriptionId: number, observe?: 'body', reportProgress?: boolean): Observable<Response>;
    public deleteSubscriptionFromSubscriptionsGroup(groupName: string, subscriptionId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Response>>;
    public deleteSubscriptionFromSubscriptionsGroup(groupName: string, subscriptionId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Response>>;
    public deleteSubscriptionFromSubscriptionsGroup(groupName: string, subscriptionId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (groupName === null || groupName === undefined) {
            throw new Error('Required parameter groupName was null or undefined when calling deleteSubscriptionFromSubscriptionsGroup.');
        }

        if (subscriptionId === null || subscriptionId === undefined) {
            throw new Error('Required parameter subscriptionId was null or undefined when calling deleteSubscriptionFromSubscriptionsGroup.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (groupName !== undefined && groupName !== null) {
            queryParameters = queryParameters.set('groupName', <any>groupName);
        }
        if (subscriptionId !== undefined && subscriptionId !== null) {
            queryParameters = queryParameters.set('subscriptionId', <any>subscriptionId);
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

        return this.httpClient.request<Response>('delete',`${this.basePath}/api/SubscriptionsGroup/delete-subscription-from-group-subscriptions`,
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
     * Delete subscription group
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteSubscriptionGroup(id: number, observe?: 'body', reportProgress?: boolean): Observable<Response>;
    public deleteSubscriptionGroup(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Response>>;
    public deleteSubscriptionGroup(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Response>>;
    public deleteSubscriptionGroup(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteSubscriptionGroup.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (id !== undefined && id !== null) {
            queryParameters = queryParameters.set('id', <any>id);
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

        return this.httpClient.request<Response>('delete',`${this.basePath}/api/SubscriptionsGroup/delete-subscription-group`,
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
     * Get user default subscription group
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getUserDefaultSubscriptionGroup(observe?: 'body', reportProgress?: boolean): Observable<DefaultSubscriptionsDTO>;
    public getUserDefaultSubscriptionGroup(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<DefaultSubscriptionsDTO>>;
    public getUserDefaultSubscriptionGroup(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<DefaultSubscriptionsDTO>>;
    public getUserDefaultSubscriptionGroup(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<DefaultSubscriptionsDTO>('get',`${this.basePath}/api/SubscriptionsGroup/default-group`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get valid group subscriptions
     * 
     * @param groupName 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getValidActiveSubscriptionsForGroup(groupName: string, observe?: 'body', reportProgress?: boolean): Observable<Array<SubscriptionsGroupDTO>>;
    public getValidActiveSubscriptionsForGroup(groupName: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<SubscriptionsGroupDTO>>>;
    public getValidActiveSubscriptionsForGroup(groupName: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<SubscriptionsGroupDTO>>>;
    public getValidActiveSubscriptionsForGroup(groupName: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (groupName === null || groupName === undefined) {
            throw new Error('Required parameter groupName was null or undefined when calling getValidActiveSubscriptionsForGroup.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (groupName !== undefined && groupName !== null) {
            queryParameters = queryParameters.set('groupName', <any>groupName);
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

        return this.httpClient.request<Array<SubscriptionsGroupDTO>>('get',`${this.basePath}/api/SubscriptionsGroup/valid-group-subscriptions`,
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
     * Get all user group subscriptions
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public groupSubscriptions(observe?: 'body', reportProgress?: boolean): Observable<Array<SubscriptionsGroupDTO>>;
    public groupSubscriptions(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<SubscriptionsGroupDTO>>>;
    public groupSubscriptions(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<SubscriptionsGroupDTO>>>;
    public groupSubscriptions(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<Array<SubscriptionsGroupDTO>>('get',`${this.basePath}/api/SubscriptionsGroup/group-subscriptions`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Reset default subscription group
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public resetDefaultSubscriptionGroup(observe?: 'body', reportProgress?: boolean): Observable<Response>;
    public resetDefaultSubscriptionGroup(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Response>>;
    public resetDefaultSubscriptionGroup(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Response>>;
    public resetDefaultSubscriptionGroup(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.request<Response>('post',`${this.basePath}/api/SubscriptionsGroup/reset-default-group`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Set default subscription group
     * 
     * @param groupId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public setDefaultSubscriptionGroup(groupId: number, observe?: 'body', reportProgress?: boolean): Observable<Response>;
    public setDefaultSubscriptionGroup(groupId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Response>>;
    public setDefaultSubscriptionGroup(groupId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Response>>;
    public setDefaultSubscriptionGroup(groupId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (groupId === null || groupId === undefined) {
            throw new Error('Required parameter groupId was null or undefined when calling setDefaultSubscriptionGroup.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (groupId !== undefined && groupId !== null) {
            queryParameters = queryParameters.set('groupId', <any>groupId);
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

        return this.httpClient.request<Response>('post',`${this.basePath}/api/SubscriptionsGroup/set-default-group`,
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
     * Update subscription group
     * 
     * @param groupId 
     * @param groupName 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateSubscriptionsGroup(groupId: number, groupName: string, observe?: 'body', reportProgress?: boolean): Observable<Response>;
    public updateSubscriptionsGroup(groupId: number, groupName: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Response>>;
    public updateSubscriptionsGroup(groupId: number, groupName: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Response>>;
    public updateSubscriptionsGroup(groupId: number, groupName: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (groupId === null || groupId === undefined) {
            throw new Error('Required parameter groupId was null or undefined when calling updateSubscriptionsGroup.');
        }

        if (groupName === null || groupName === undefined) {
            throw new Error('Required parameter groupName was null or undefined when calling updateSubscriptionsGroup.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (groupId !== undefined && groupId !== null) {
            queryParameters = queryParameters.set('groupId', <any>groupId);
        }
        if (groupName !== undefined && groupName !== null) {
            queryParameters = queryParameters.set('groupName', <any>groupName);
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

        return this.httpClient.request<Response>('post',`${this.basePath}/api/SubscriptionsGroup/update-subscription-group`,
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
