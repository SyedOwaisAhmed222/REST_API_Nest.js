import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RedisService } from 'src/redis/redis.service';
import { Redis } from 'ioredis';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly redisService: RedisService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (roles === undefined) return true;
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    // const redisClient: Redis = this.redisService.getRedisClient();
    // const strUser = await redisClient.get(token);
    const strUser = await this.redisService.get(token)

    if (roles.length == 0 && strUser) {
      console.log("role lenght", roles.length)
      console.log("struser", strUser)
      return true;
    }

    const user = JSON.parse(await strUser);
    console.log('role is ', user.role);
    console.log('roles are ', roles);

    if (roles.includes(user.role)) {
      return true;
    } else {
      return false;
    }
  }
}
