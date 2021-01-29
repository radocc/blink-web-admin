import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelSiteComponent } from './painel-site.component';

describe('PainelSiteComponent', () => {
  let component: PainelSiteComponent;
  let fixture: ComponentFixture<PainelSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PainelSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
