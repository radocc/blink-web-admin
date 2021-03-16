import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteudoRowComponent } from './conteudo-row.component';

describe('ConteudoRowComponent', () => {
  let component: ConteudoRowComponent;
  let fixture: ComponentFixture<ConteudoRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConteudoRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConteudoRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
