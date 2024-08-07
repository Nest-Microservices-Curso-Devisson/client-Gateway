<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Dev

1. Clonar el repositorio
2. Instalar dependencias `npm install`
3. Crear un archivo `.env` basado en el `env.template`
4. Levantar el servidor de NATS
```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```
5. Verificar que los microservicios necesarios estén descargados y corriendo: 

   Repositorios de los microservicios necesarios:

   - Products: [GitHub](https://github.com/Nest-Microservices-Curso-Devisson/products-microservices)
   - Orders: [GitHub](https://github.com/Nest-Microservices-Curso-Devisson/orders-microservices)

6. Después de instalar y seguir los pasos de ejecución de cada microservicio, ejecutar `npm run start:dev`
7. En la carpeta raiz de este proyecto existe un archivo llamado `collection.json` , este archivo se puede importar en el postman para tener un ejemplo de transaccion de cada uno de los endpoint de este gateway


## Nats
```
docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
```
