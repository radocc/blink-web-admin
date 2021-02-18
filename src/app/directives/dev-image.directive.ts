import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[devImage]',
})
export class DevImageDirective{

    @Input('bgImage') set image(value){
        if(value != null){
            this.bgImage = `url(${value})`;
        }else{
            this.bgImage = '';
        }
    }

    @Input('size')
    set size(size: string) {
        this.bgSize = size;
    }

    @Input('repeat')
    set repeat(repeat: string) {
        this.bgRepeat = repeat;
    }

    @Input('position')
    set position(position: string) {
        this.bgPosition = position;
    }

    @HostBinding('style.backgroundImage') bgImage: string;
    @HostBinding('style.backgroundSize') bgSize: string = 'contain';
    @HostBinding('style.backgroundRepeat') bgRepeat: string = 'no-repeat';
    @HostBinding('style.backgroundPosition') bgPosition: string = 'center';
}