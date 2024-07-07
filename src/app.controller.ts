import { Body, Controller, Get, Param, Query, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

type userTypeDTO={
  email: string,
  username: string,
  password: string,
}
@Controller("/app")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/demo/:id")
  getHello(@Req() req, @Res() res) {
    let {id} = req.params
    let{id2} = req.query
    let {email, username} = req.body
    return '123'
  }
  @Get("/test/:id")
  getDemo(@Param("id") id: string,
          @Query("phone") phone: string,
          @Body() body: userTypeDTO) {
            let {email, username} = body
       return {id, phone, email, username}
  }

}
