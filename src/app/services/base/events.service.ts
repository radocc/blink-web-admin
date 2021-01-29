import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class EventsService {
    
    public skipClicked: EventEmitter<{event: string, data: any}> = new EventEmitter();

    constructor() {}

    publish(event: string, data: any) {
        this.skipClicked.next({event: event, data: data});
    };
}