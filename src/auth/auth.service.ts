import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAdmin(username: string, password: string): Promise<any> {
    const admin = await this.adminService.findByUsername(username);
    if (!admin) throw new UnauthorizedException('관리자를 찾을 수 없습니다.');

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');

    const payload = { username: admin.username, sub: admin.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
