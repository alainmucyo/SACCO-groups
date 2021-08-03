import { CacheModule, Module } from "@nestjs/common";
import { GroupsService } from "./groups.service";
import { GroupsController } from "./groups.controller";
import { CacheService } from "./cache.service";
import { MembersModule } from "../members/members.module";

@Module({
  imports: [CacheModule.register(), MembersModule],
  controllers: [GroupsController],
  providers: [GroupsService, CacheService],
})
export class GroupsModule {}
