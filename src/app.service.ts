import {Injectable, Module} from '@nestjs/common';

import { AccountService } from './account/account.service';

@Module({
  imports: [AccountService]
})

@Injectable()
export class AppService {}