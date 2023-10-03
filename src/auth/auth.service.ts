import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';
import { RedisService } from 'src/redis/redis.service';
import Redis from 'ioredis';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    // Step 1: Fetch a user with the given email
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    // Step 2: Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const redisClient: Redis = this.redisService.getRedisClient();
    const token = uuidv4();
    await redisClient.set(token, JSON.stringify(user));
    console.log(user)

    // Step 3: Generate a JWT containing the user's ID and return it
    return {
      accessToken: token,
    };
  }
}
