import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Inject, 
  ParseUUIDPipe,
  Query,
  Patch
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE, ORDER_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';
import { 
  OrderPaginationDto,
  CreateOrderDto, 
  StatusDto 
} from './dto';
import { PaginationDto } from 'src/common';


@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly Client: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.Client.send('createOrder',createOrderDto);
  }

  @Get()
  async findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    try {
      const orders = await firstValueFrom(
        this.Client.send('findAllOrders',orderPaginationDto)
      )
      return orders;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.Client.send('findOneOrder',{ id })
      );
      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto
  ) {
    try {
      return this.Client.send('findAllOrders',{
        ...paginationDto,
        status: statusDto.status,
      });
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ){
    try {
      return this.Client.send('changeOrderStatus', { 
        id, status: statusDto.status 
      })
    } catch (error) {
      throw new RpcException(error);
    }
  }


}
