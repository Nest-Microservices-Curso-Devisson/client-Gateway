import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ORDER_SERVICE, envs } from 'src/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [OrdersController],
  imports: [
    ClientsModule.register([
      { 
        name: ORDER_SERVICE, 
        transport: Transport.TCP,
        options: {
          host: envs.ordersMicroServicesHost,
          port: envs.ordersMicroservicesPort,
        }
      },
    ]),
  ]
})
export class OrdersModule {}

