import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeResComponent } from './home-res.component';

describe('HomeResComponent', () => {
  let component: HomeResComponent;
  let fixture: ComponentFixture<HomeResComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeResComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
