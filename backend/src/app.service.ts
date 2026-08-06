import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      ok: true,
      message: 'GarageBench backend alive',
      utc: new Date().toISOString(),
    };
  }
}
