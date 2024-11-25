import { HttpStatus, Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, LoginDto } from './dto';
import { PayloadInterface, Public, User,Roles } from '../common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('auth/register')
  @Public()
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      'application/json': {
        value: {
          email: 'john.doe@example.com',
          password: 'password123',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async register(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
    const result = await this.usersService.register(createUserDto);
    response.status(HttpStatus.CREATED).json({ ok: true, result, msg: 'Created' });
  }

  @Post('auth/login')
  @Public()
  @ApiOperation({ summary: 'Login an existing user' })
  @ApiBody({
    type: LoginDto,
    examples: {
      'application/json': {
        value: {
          email: 'john.doe@example.com',
          password: 'password123',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'User successfully logged in.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  logtin(@Body() loginUserDto: LoginDto) {
    return this.usersService.login(loginUserDto);
  }

  @Get()
  @Roles('admin', 'superadmin')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'The list of users.' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'superadmin')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'The found user.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @Roles('superadmin')
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  @ApiBody({
    type: UpdateUserDto,
    examples: {
      'application/json': {
        value: {
          email: 'john.doe.updated@example.com',
          password: 'newpassword123',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  update(@Param('id', ParseIntPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles('superadmin')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', type: 'string', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.remove(+id);
  }
}
