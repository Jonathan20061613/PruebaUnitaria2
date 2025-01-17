// Tiene una estrucutura basica para hacer pruebas unitarias en angular
// EN EL FRONT NO PROBAMOS SERVIDORES  - NI BASE DE DATOS
// AQUI PROBAMOS QUE EL USUARIO ESTE OBTENIENDO LA INFO QUE DEBERIA  ES DECIR QUE LA INTERFAZ FUNCIONA 


// EL testbed nos sirve para configurar el entorno de pruebas en angular 
import { TestBed } from '@angular/core/testing';


//aqui traemos lo que necesitamos testear 
import { EjemploService } from './ejemplo.service';


// definir nuestro bloque de pruebas 
describe('EjemploService', () => {
  
  
// Declarar las variables que necesitamos en las pruebas por ejemplo usuarios, servicios 
  let service: EjemploService;



  //2.configuracion global -> el befoeach siempre debemos configurarlo, sucede antes de cada caso de prueba  

  beforeEach(() => {

  //configuramos el entorno de prueba con el testbed
    TestBed.configureTestingModule({
// aqui injectamos lo que necesitamos -> importar servicios, componentes o proveedores

   providers:[ EjemploService]
    });
    service = TestBed.inject(EjemploService);
  });

//3. definir los casos de prueba 
  // estos son los casos de prueba cada it es un caso
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
// aqui empezamos lo anterios se puede eliminar
it(" deberia sumar dos nuemeros correctamente", ()=> {
   const resultado = service.suma (3,5);
   expect(resultado).toBe(8);


});








});
