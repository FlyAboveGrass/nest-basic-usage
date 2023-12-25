import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ApiConfigService } from './services/api-config.service';
import { ValidatorService } from './services/validator.service';
import { UuidService } from './services/uuid.service';

const providers = [
  // TODO:awsS3Service 创建和删除存储桶，上传和下载文件，管理文件的访问权限等。
  // AwsS3Service
  ApiConfigService,
  ValidatorService,
  UuidService,
];

@Global()
@Module({
  providers,
  // CQRS（Command Query Responsibility Segregation）命令查询职责分离
  // 控制读写分离
  imports: [CqrsModule],
  exports: [...providers, CqrsModule],
})
export class ShareModule {}
