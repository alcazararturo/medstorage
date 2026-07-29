import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { FamilyMembersService } from "./family-members.service";
import { CreateFamilyMemberDto } from "./dto/create-family-member.dto";
import { UpdateFamilyMemberDto } from "./dto/update-family-member.dto";
import { ParamsDto } from "../util/dto/paramsSchema";

@Controller("family-members")
export class FamilyMembersController {
  constructor(private readonly familyMembersService: FamilyMembersService) {}

  @Post()
  create(@Body() createFamilyMemberDto: CreateFamilyMemberDto) {
    return this.familyMembersService.create(createFamilyMemberDto);
  }

  @Get()
  findAll() {
    return this.familyMembersService.findAll();
  }

  @Get(":id")
  findOne(@Param() params: ParamsDto) {
    return this.familyMembersService.findOne(params.id);
  }

  @Patch(":id")
  update(
    @Param() params: ParamsDto,
    @Body() updateFamilyMemberDto: UpdateFamilyMemberDto,
  ) {
    return this.familyMembersService.update(params.id, updateFamilyMemberDto);
  }

  @Delete(":id")
  remove(@Param() params: ParamsDto) {
    return this.familyMembersService.remove(params.id);
  }
}
