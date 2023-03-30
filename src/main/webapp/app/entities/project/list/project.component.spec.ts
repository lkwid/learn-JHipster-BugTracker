import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { ProjectService } from '../service/project.service';

import { ProjectComponent } from './project.component';

describe('Project Management Component', () => {
  let comp: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let service: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'project', component: ProjectComponent }]), HttpClientTestingModule],
      declarations: [ProjectComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(ProjectComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProjectComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(ProjectService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.projects?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to projectService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getProjectIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getProjectIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
