import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async findByUsername(username: string): Promise<Admin | undefined> {
    const admin = await this.adminRepository.findOne({ where: { username } });
    return admin ?? undefined; // null이면 undefined로 바꿔 반환
  }
}
