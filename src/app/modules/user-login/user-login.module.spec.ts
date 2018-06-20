import { UserLoginModule } from './user-login.module';

describe('UserLoginModule', () => {
  let userLoginModule: UserLoginModule;

  beforeEach(() => {
    userLoginModule = new UserLoginModule();
  });

  it('should create an instance', () => {
    expect(userLoginModule).toBeTruthy();
  });
});
