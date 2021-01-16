import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderlinedNameComponent } from './underlined-name.component';

describe('UnderlinedNameComponent', () => {
  let component: UnderlinedNameComponent;
  let fixture: ComponentFixture<UnderlinedNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnderlinedNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderlinedNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
