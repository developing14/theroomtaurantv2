import { EmployeeGuard } from './employee.guard';

describe('EmployeeGuard', () => {
  it('should be defined', () => {
    expect(new EmployeeGuard()).toBeDefined();
  });
});
