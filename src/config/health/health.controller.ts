import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { AppHealthIndicator } from './app.health';

@ApiTags('Health Check')
@Controller(['health'])
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private appIndicator: AppHealthIndicator,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Verifica a disponibilidade de API',
  })
  @ApiResponse({
    status: 200,
    description: 'Sucesso',
    type: String,
  })
  @HealthCheck()
  check() {
    return this.health.check([() => this.appIndicator.isHealthy()]);
  }
}
