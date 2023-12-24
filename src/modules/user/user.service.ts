import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entity/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {
    this.dataSource = dataSource;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createMany(users: User[]) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(users[0]);
      await queryRunner.manager.save(users[1]);

      await queryRunner.commitTransaction();
    } catch (err) {
      //如果遇到错误，可以回滚事务
      await queryRunner.rollbackTransaction();
    } finally {
      //你需要手动实例化并部署一个queryRunner
      await queryRunner.release();
    }
  }
}
