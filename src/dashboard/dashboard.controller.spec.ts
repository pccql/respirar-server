import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard.controller';
import { UsersService } from '../users/users.service';
import { InterestsService } from '../interests/interests.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

describe('DashboardController', () => {
  let controller: DashboardController;
  let usersService: UsersService;
  let interestsService: InterestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [UsersService, InterestsService],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<DashboardController>(DashboardController);
    usersService = module.get<UsersService>(UsersService);
    interestsService = module.get<InterestsService>(InterestsService);
  });

  describe('getData', () => {
    it('should return user data with hasInterest flag', async () => {
      const mockUser = {
        id: 1,
        name: 'John',
        email: 'teste@teste.com',
        password: 'a',
      };
      const mockInterest = {
        id: 1,
        movies: true,
        tv_shows: true,
        meditation: true,
        exercise: true,
        genres: ['ficção'],
        confort_shows: ['how i met'],
        user: 1,
      };
      jest
        .spyOn(usersService, 'findOne')
        .mockImplementation(async () => mockUser);
      jest
        .spyOn(interestsService, 'findByUser')
        .mockImplementation(async () => mockInterest);

      const req = { user: { id: 1 } };
      const result = await controller.getData(req);

      expect(usersService.findOne).toHaveBeenCalledWith(1);
      expect(interestsService.findByUser).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual({ ...mockUser, hasInterest: mockInterest });
    });
  });
});
