import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagecadastroComponent } from './pagecadastro.component';

describe('PagecadastroComponent', () => {
  let component: PagecadastroComponent;
  let fixture: ComponentFixture<PagecadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagecadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagecadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
