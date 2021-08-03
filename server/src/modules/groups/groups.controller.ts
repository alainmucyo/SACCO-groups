import { Controller, Post, Body, Get, Param, Put } from "@nestjs/common";
import { GroupsService } from "./groups.service";
import { UssdRequestDto } from "./dto/ussd-request.dto";
import { CacheService } from "./cache.service";
import { MembersService } from "../members/members.service";

@Controller()
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly cacheService: CacheService,
    private readonly memberService: MembersService,
  ) {}

  @Get("/api/groups")
  async getGroups() {
    return await this.groupsService.findAll();
  }
  @Put("/api/groups/:groupId/:status")
  async updateStatus(
    @Param("groupId") groupId: number,
    @Param("status") status: string,
  ) {
    return await this.groupsService.updateStatus(groupId, status);
  }

  @Post("/ussd/groups")
  async handleUSSDRequests(@Body() request: UssdRequestDto) {
    const text = request.text;
    // if (text == "0") await this.reset(request.sessionId);

    let step = await this.cacheService.checkStep(request.sessionId);
    step = Number(step);
    if (text == "00" && step > 2) step = this.back(step, request);
    let result = "";

    switch (step) {
      case 0:
        console.log("Step 1");
        result = GroupsController.welcomeMenu();
        break;
      case 1:
        if (text == "1") {
          await this.cacheService.userAction(request.sessionId, "create");
          result = `CON Please provide the group name\n\n`;
        }
        if (text == "2") {
          await this.cacheService.userAction(request.sessionId, "join");
          result = "CON Please select a group you want to join: \n";
          const groups = await this.groupsService.findAll();

          for (const group of groups) {
            result += `${group.id}. ${group.name} \n`;
          }
        }
        if (text == "3") result = "END thank you for your visit!";
        break;
      case 2:
        const action = await this.cacheService.checkAction(request.sessionId);

        if (action == "create") {
          await this.groupsService.create(request.text, request.phoneNumber);
          await this.cacheService.setGroupName(request.sessionId, text);
          result = `CON Group ${text} created successfully!\n`;
        } else {
          const group = await this.groupsService.findOne(Number(text));
          await this.cacheService.selectGroupId(request.sessionId, group.id);
          await this.memberService.create("member", request.phoneNumber, group);
          result = `CON Group with ${group.name} joined successfully!\n`;
        }
        break;
    }
    if (text != "") {
      step++;
      await this.cacheService.saveSession(request.sessionId, step);
    }
    return result;
  }

  private async reset(session: string) {
    await this.cacheService.saveSession(session, 0);
  }

  private back(step: number, requestDto: UssdRequestDto) {
    step = step - 2;
    requestDto.text = "1";
    return step;
  }

  private static welcomeMenu(): string {
    return `CON Welcome, please choose your next action:
             1. Create Group
             2. Join Group
             3. Exit app
     `;
  }
}
