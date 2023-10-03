import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RedisService } from 'src/redis/redis.service';
import { Redis } from 'ioredis';

// import { UserRoles } from 'src/users/enums/user.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly redisService: RedisService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // const user = {
    //   name: 'owais',
    //   role: UserRoles.BUYER,
    // };
    // if (roles.includes(user.role)) return true;
    // else {
    //     return false
    // }
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (roles===undefined) return true
    const request = context.switchToHttp().getRequest()
    const token = request.headers.authorization
    const redisClient: Redis = this.redisService.getRedisClient();


    // const token = localStorage.getItem("token")
    const strUser = await redisClient.get(token);

    if (roles.length==0 && strUser ) { return true}

    const user = JSON.parse(strUser)
    console.log("role is ", user.role)
    console.log("roles are ", roles)

    
    if (roles.includes(user.role)) return true;
    else {
        return false
    }
     
  }
}
