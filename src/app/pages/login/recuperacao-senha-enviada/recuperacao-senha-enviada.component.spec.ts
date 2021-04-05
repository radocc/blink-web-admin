import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperacaoSenhaEnviadaComponent } from './recuperacao-senha-enviada.component';

describe('RecuperacaoSenhaEnviadaComponent', () => {
  let component: RecuperacaoSenhaEnviadaComponent;
  let fixture: ComponentFixture<RecuperacaoSenhaEnviadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecuperacaoSenhaEnviadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperacaoSenhaEnviadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
