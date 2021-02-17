import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatePesquisaComponent } from './template-pesquisa.component';

describe('TemplatePesquisaComponent', () => {
  let component: TemplatePesquisaComponent;
  let fixture: ComponentFixture<TemplatePesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplatePesquisaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatePesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
