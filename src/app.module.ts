import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// init NestJS ENV variables globally
// should be initialized before custom modules
ConfigModule.forRoot({
  isGlobal: true,
});

import { StoreModule } from './store/store.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [StoreModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  //
}
