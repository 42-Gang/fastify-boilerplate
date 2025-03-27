import { User } from '@prisma/client';
import { UserCacheInterface } from '../interfaces/user.cache.interface.js';

export default class UserCacheRedis implements UserCacheInterface {
  constructor(private readonly redisClient: UserCacheInterface) {}
  // private redisClient: UserCacheInterface;
  //
  // constructor({ redisClient }: { redisClient: UserCacheInterface }) {
  //   this.redisClient = redisClient;
  // }

  private getKey(userId: number): string {
    return `user:${userId}`;
  }

  async get(key: string): Promise<User | null> {
    return await this.redisClient.get(key);
  }

  async set(key: string, value: User, _ttlSeconds?: number): Promise<void> {
    await this.redisClient.set(key, value);
  }

  async delete(key: string): Promise<void> {
    await this.redisClient.delete(key);
  }

  async exists(key: string): Promise<boolean> {
    return await this.redisClient.exists(key);
  }

  // UserCache 인터페이스 구현 메소드
  async getUserById(userId: number): Promise<User | null> {
    return this.get(this.getKey(userId));
  }

  async setUserById(userId: number, user: User, ttlSeconds?: number): Promise<void> {
    await this.set(this.getKey(userId), user, ttlSeconds);
  }

  async deleteUserById(userId: number): Promise<void> {
    await this.delete(this.getKey(userId));
  }
}
