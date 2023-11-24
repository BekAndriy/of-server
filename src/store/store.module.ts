import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { AuthModule } from '../user/auth/auth.module';
import { StoreController } from './store.controller';

/**
 * Is responsible for storing any kind of data in JSON format to the Files system
 */
@Module({
  imports: [],
  controllers: [StoreController],
  providers: [StoreService, AuthModule],
})
export class StoreModule {
  //
}
