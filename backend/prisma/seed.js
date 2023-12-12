import { PrismaClient } from '@prisma/client';
import { addDays } from '../src/utils/functions/date.helpers.js';

const prisma = new PrismaClient();

const PASSWORD = '$2b$12$D3BHaEp27etNJOQWd74XyOheYXH69aF9Q2Im/a3hT24GnZteDKrge';

async function main() {
  await prisma.dissertationRequests.deleteMany();
  await prisma.registrationSessions.deleteMany();
  await prisma.professor.deleteMany();
  await prisma.student.deleteMany();
  await prisma.user.deleteMany();

  const session1 = await prisma.registrationSessions.create({
    data: {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
    },
  });

  const session2 = await prisma.registrationSessions.create({
    data: {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
    },
  });

  const session3 = await prisma.registrationSessions.create({
    data: {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
    },
  });

  await prisma.professor.create({
    data: {
      user: {
        create: {
          email: 'vlad.pirvan@gmail.com',
          name: 'Vlad Alexandru Pirvan',
          role: 'PROFESSOR',
          password: PASSWORD,
        },
      },
      RegistrationSessions: {
        connect: {
          id: session1.id,
        },
      },
    },
  });

  await prisma.professor.create({
    data: {
      user: {
        create: {
          email: 'iosif.pavel@hotmail.com',
          name: 'Iosif Pavel',
          role: 'PROFESSOR',
          password: PASSWORD,
        },
      },
      RegistrationSessions: {
        connect: {
          id: session2.id,
        },
      },
    },
  });
  await prisma.professor.create({
    data: {
      user: {
        create: {
          email: 'iosif.lungu@gmail.com',
          name: 'Iosif Lungu',
          role: 'PROFESSOR',
          password: PASSWORD,
        },
      },
      RegistrationSessions: {
        connect: {
          id: session3.id,
        },
      },
    },
  });

  await prisma.student.create({
    data: {
      user: {
        create: {
          email: 'marius@vlad.io',
          name: 'Marius Vlad',
          role: 'STUDENT',
          password: PASSWORD,
        },
      },
    },
  });

  await prisma.student.create({
    data: {
      user: {
        create: {
          email: 'botezatu.zaharia@neamtu.com',
          name: 'Botezatu Zaharia',
          role: 'STUDENT',
          password: PASSWORD,
        },
      },
    },
  });

  await prisma.student.create({
    data: {
      user: {
        create: {
          email: 'ivona.danila@yahoo.com',
          name: 'Ivona Danila',
          role: 'STUDENT',
          password: PASSWORD,
        },
      },
    },
  });

  await prisma.student.create({
    data: {
      user: {
        create: {
          email: 'msarbu@andrei.biz',
          name: 'Mihai Sarbu',
          role: 'STUDENT',
          password: PASSWORD,
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
