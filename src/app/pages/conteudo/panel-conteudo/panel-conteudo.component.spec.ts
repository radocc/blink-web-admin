import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelConteudoComponent } from './panel-conteudo.component';

describe('PanelConteudoComponent', () => {
  let component: PanelConteudoComponent;
  let fixture: ComponentFixture<PanelConteudoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelConteudoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelConteudoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
