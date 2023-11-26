import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PASSWORD = "$2b$12$D3BHaEp27etNJOQWd74XyOheYXH69aF9Q2Im/a3hT24GnZteDKrge";

async function main() {
	await prisma.professor.deleteMany();
	await prisma.student.deleteMany();
	await prisma.user.deleteMany();

	await prisma.professor.create({
		data: {
			user: {
				create: {
					email: "vlad.pirvan@gmail.com",
					name: "Vlad Alexandru Pirvan",
					role: "PROFESSOR",
					password: PASSWORD,
				},
			},
		},
	});

	await prisma.professor.create({
		data: {
			user: {
				create: {
					email: "iosif.pavel@hotmail.com",
					name: "Iosif Pavel",
					role: "PROFESSOR",
					password: PASSWORD,
				},
			},
		},
	});
	await prisma.professor.create({
		data: {
			user: {
				create: {
					email: "iosif.lungu@gmail.com",
					name: "Iosif Lungu",
					role: "PROFESSOR",
					password: PASSWORD,
				},
			},
		},
	});

	await prisma.student.create({
		data: {
			user: {
				create: {
					email: "larisa14@vlad.info",
					name: "Larisa Vlad",
					role: "STUDENT",
					password: PASSWORD,
				},
			},
		},
	});

	await prisma.student.create({
		data: {
			user: {
				create: {
					email: "botezatu.zaharia@neamtu.com",
					name: "Botezatu Zaharia",
					role: "STUDENT",
					password: PASSWORD,
				},
			},
		},
	});

	await prisma.student.create({
		data: {
			user: {
				create: {
					email: "ivona.danila@yahoo.com",
					name: "Ivona Danila",
					role: "STUDENT",
					password: PASSWORD,
				},
			},
		},
	});

	await prisma.student.create({
		data: {
			user: {
				create: {
					email: "msarbu@andrei.biz",
					name: "Mihai Sarbu",
					role: "STUDENT",
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
