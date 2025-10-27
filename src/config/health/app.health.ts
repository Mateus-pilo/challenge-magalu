import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';

export class AppHealthIndicator extends HealthIndicator {
  constructor() {
    super();
  }

  isHealthy(): HealthIndicatorResult {
    const isHealthy = true;
    return this.getStatus(AppHealthIndicator.name, isHealthy, {
      stage: process.env.STAGE,
    });
  }
}
