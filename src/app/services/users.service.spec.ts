import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { provideHttpClient } from "@angular/common/http";
import {provideHttpClientTesting, HttpTestingController} from "@angular/common/http/testing"

describe('pruebas para servico users', () => {

 
  
  //--------------VARIABLES----------
  let service: UsersService;
  let mockHttp : HttpTestingController;
  const urlTest = "http://localhost:9000/usuarios"



  beforeEach(() => {
    TestBed.configureTestingModule({ 
      providers: [UsersService,
      provideHttpClient(),
      provideHttpClientTesting()

      ] });
    service = TestBed.inject(UsersService);
    mockHttp= TestBed.inject(HttpTestingController);
  });

 afterAll(()=>{
  mockHttp.verify()
 })
// caso de prueba 1
  it('deberia hacer una petición GET para mostrar usuarios', () => {
    const mockUsers = [
      {fullName:"Anastasia", email: "Anastasia@gmail.com", password: "123"},
      {fullName: 'pepita Perez', email: 'pepita@gmail.com', password: '123'},
    ]
    const mockResponse = {
      mensaje: 'Se encontraron usuarios almacenados',
      numeroUsuarios: mockUsers.length,
      datos: mockUsers
    }
    
    service.getUser().subscribe(
      (res)=>{
        expect(res).toEqual(mockResponse);
      }
    );

    const req = mockHttp.expectOne(urlTest);
    expect(req.request.method).toBe('GET');
    
    req.flush(mockResponse);
    
  });
});
