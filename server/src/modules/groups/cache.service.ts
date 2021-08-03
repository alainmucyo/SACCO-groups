import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager) {}
  private TTL = 120;
  public async saveSession(session: string, step: number) {
    await this.cacheManager.set(session + ":step", step.toString(), {
      ttl: this.TTL,
    });
  }

  public async checkStep(session: string) {
    const step = await this.cacheManager.get(session + ":step");
    if (!step) return 0;
    return step;
  }

  public async checkAction(session: string) {
    const step = await this.cacheManager.get(session + ":action");
    if (!step) return "create";
    return step;
  }

  public async userAction(session: string, action: string) {
    await this.cacheManager.set(`${session}:action`, action, { ttl: this.TTL });
  }

  public async getGroupName(session: string) {
    return await this.cacheManager.get(session + ":groupName");
  }

  public async getGroupId(session: string) {
    return await this.cacheManager.get(session + ":groupId");
  }

  public async setGroupName(session: string, name: string) {
    await this.cacheManager.set(`${session}:groupName`, name, {
      ttl: this.TTL,
    });
  }

  public async selectGroupId(session: string, id: number) {
    await this.cacheManager.set(`${session}:groupId`, id, { ttl: this.TTL });
  }
}
