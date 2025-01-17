
// 1. importaciones necesarias
import { TestBed } from "@angular/core/testing";
import { LoginService } from "./login.service";
// importar el proveedor para hacer peticiones HTTP
import { provideHttpClient } from "@angular/common/http";
// IMPORTAR HERRAMIENTAS QUE PERMITAN SIMULAR INTERACIONES CON MIS PETICIONES HTTP
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";
import { ControlContainer } from "@angular/forms";
// 2. Definir el bloque de prueba 

describe("pruebas para servicio login", ()=> {

    /*
    mock -> objeto o función FALSA -> simular un comportamiento 
    
    */
   //--------------VARIABLES----------
   let httpMock: HttpTestingController;  //simula interaciones con HTTP

   let loginService : LoginService;
    
    const urlTest = "http://localhost:9000/iniciarSesion";
    const emailTest = "pepito@gmail.com";
    const passwordTest = "123";
    const tokenTest = "kfldshf8ewr83dh";

    // beforeEach  y afterAll -> configuración global 
    // beforeEach y afterAll -> configuración global
    beforeEach(()=> {
        TestBed.configureTestingModule({
            providers: [
                LoginService,
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });

        // injección de servicios
         loginService = TestBed.inject(LoginService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterAll(()=>{
        httpMock.verify(); //después de TODAS las pruebas, no queden peticiones pendientes
    });

// 3. Definir nuestros casos de prueba 
// caso de prueba 1

it ("Deberia hacer una petición POST para iniciar sesión",()=> {
 const mockRespusta = {
   mensaje: " Inicio de sesión exitoso",
   token: tokenTest
 }
                                              // subscribe activa las peticiones http y significa que estamos probando 
 loginService.login(emailTest, passwordTest). subscribe(
    (res)=> {
        expect(res).toEqual(mockRespusta);
        // el toBe espera datos exactos como 5 o o 
 }
)
// yo quiero garantizar que la peticion esta haciendo la url en particular 
const peticion = httpMock.expectOne(urlTest)
      // garantizar el metodo 
      expect(peticion.request.method).toBe("POST")

    // esto es lo que simula el servidor 
    peticion.flush(mockRespusta)
});

// caso de prueba 2
it ("Deberia obtener el token alamacenado en el localStorege",()=> {
    localStorage.setItem("token", tokenTest) // lo que guardo en el localStoge
    expect(loginService.getToken()).toBe(tokenTest);
});

// caso de prueba 3
it ("Deberia verificar si el usuario esta logueado",()=> {
    localStorage.setItem("token", tokenTest) // lo que guardo en el localStoge
    expect(loginService.isLoggedIn()).toBeTrue(); // respuesta buleana verdad


});

// caso de prueba 4
it ("Deberia cerrar sesion",()=> {
loginService.logout();
expect(localStorage.getItem("token")). toBeNull();
// si cierro sesión 


});




});

