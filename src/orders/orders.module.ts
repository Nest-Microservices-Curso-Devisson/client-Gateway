import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ORDER_SERVICE, envs } from 'src/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [OrdersController],
  imports: [
   NatsModule
  ]
})
export class OrdersModule {}

