import { Test } from '@nestjs/testing';
import { EmailIsUnique } from './validation.email';
import { PrismaService } from '../../../../prisma/prisma.service';

describe('EmailIsUniquer', () => {
  let emailIsUnique: EmailIsUnique;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        EmailIsUnique,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findFirst: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    emailIsUnique = moduleRef.get<EmailIsUnique>(EmailIsUnique);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be return true if email is unique', async () => {
    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null);

    const result = await emailIsUnique.validate('teste@email.com', {
      object: {},
      property: 'email',
      value: 'test@example.com',
      constraints: [],
      targetName: '',
    });

    expect(result).toBe(true);
  });

  it('should return false if the email is not unique', async () => {
    const user = {
      id: 2,
      email: 'teste@email.com',
      name: 'name teste',
      password: '12345',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    jest.spyOn(prismaService.user, 'findFirst').mockResolvedValueOnce(user);

    const result = await emailIsUnique.validate('teste@email.com', {
      object: { id: 1 },
      property: 'email',
      value: 'test@example.com',
      constraints: [],
      targetName: '',
    });

    expect(result).toBe(false);
  });
});
