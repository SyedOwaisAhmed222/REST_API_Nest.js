import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      // Redis server configuration options go here
      host: 'localhost', // Redis server hostname
      port: 6379, // Redis server port
      // Other options...
    });

    // Handle connection errors if needed
    this.redisClient.on('error', (err) => {
      console.error('Redis connection error:', err);
    });
  }

  getRedisClient(): Redis {
    return this.redisClient;
  }
}
