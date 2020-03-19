import { Module, Global } from '@nestjs/common';

const providers = [];

@Global()
@Module({
  providers: [...providers],
  imports: [],
  exports: [],
})
export class SharedModule {}
