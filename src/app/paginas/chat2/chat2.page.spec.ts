import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Chat2Page } from './chat2.page';

describe('Chat2Page', () => {
  let component: Chat2Page;
  let fixture: ComponentFixture<Chat2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Chat2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Chat2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
