import {
  Controller,
  Get,
  Post,
  Delete,
  UseGuards,
  Param,
  Body,
} from '@nestjs/common';

import { JwtAuthGuard } from '../user/auth';
import { StoreService } from './store.service';
import { User, UserInfo } from '../decorators/User';

@Controller()
export class StoreController {
  constructor(private readonly storeService: StoreService) {
    //
  }

  @UseGuards(JwtAuthGuard)
  @Get('/api/store/*')
  getFileContentOrFilesInFolder(@Param() params, @User() user: UserInfo) {
    return this.storeService.read(params[0], user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/api/store/*')
  createFile(@Param() params, @Body() body, @User() user: UserInfo) {
    this.storeService.save(params[0], body, user.id);
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/api/store/*')
  delete(@Param() params, @User() user: UserInfo) {
    this.storeService.delete(params[0], user.id);
    return true;
  }
}
