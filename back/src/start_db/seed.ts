import { PrismaClient, Role, BlocoType } from "@prisma/client";
import { Auth } from "../utils/auth";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create admin user
  const adminPassword = await Auth.hashPassword("admin123");
  const admin = await prisma.user.upsert({
    where: { email: "admin@matrizes.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@matrizes.com",
      password: adminPassword,
      role: Role.ADMIN,
    },
  });

  // Create regular user
  const userPassword = await Auth.hashPassword("user123");
  const user = await prisma.user.upsert({
    where: { email: "user@matrizes.com" },
    update: {},
    create: {
      name: "Regular User",
      email: "user@matrizes.com",
      password: userPassword,
      role: Role.USER,
    },
  });

  console.log("👤 Users created:", { admin: admin.email, user: user.email });

  // Create environments
  const ambiente1 = await prisma.ambiente.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Tecnologia",
      description: "Ambiente dedicado a conteúdos sobre tecnologia e inovação",
    },
  });

  const ambiente2 = await prisma.ambiente.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Educação",
      description: "Ambiente focado em conteúdos educacionais e pedagógicos",
    },
  });

  console.log("🏢 Ambientes created:", { ambiente1: ambiente1.name, ambiente2: ambiente2.name });

  // Create sub-environments
  const subambiente1 = await prisma.subambiente.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Desenvolvimento Web",
      description: "Conteúdos sobre desenvolvimento web moderno",
      ambienteId: ambiente1.id,
    },
  });

  const subambiente2 = await prisma.subambiente.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Inteligência Artificial",
      description: "Artigos e tutoriais sobre IA e Machine Learning",
      ambienteId: ambiente1.id,
    },
  });

  const subambiente3 = await prisma.subambiente.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "Metodologias Ativas",
      description: "Técnicas e estratégias de ensino inovadoras",
      ambienteId: ambiente2.id,
    },
  });

  console.log("🏗️ Subambientes created:", { 
    subambiente1: subambiente1.name, 
    subambiente2: subambiente2.name,
    subambiente3: subambiente3.name 
  });

  // Create articles
  const artigo1 = await prisma.artigo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Introdução ao React",
      description: "Um guia completo para iniciantes em React",
      subambienteId: subambiente1.id,
    },
  });

  const artigo2 = await prisma.artigo.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: "Node.js e APIs RESTful",
      description: "Como criar APIs robustas com Node.js",
      subambienteId: subambiente1.id,
    },
  });

  const artigo3 = await prisma.artigo.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: "Machine Learning com Python",
      description: "Primeiros passos no mundo do ML",
      subambienteId: subambiente2.id,
    },
  });

  const artigo4 = await prisma.artigo.upsert({
    where: { id: 4 },
    update: {},
    create: {
      title: "Aprendizagem Baseada em Projetos",
      description: "Como implementar PBL na sala de aula",
      subambienteId: subambiente3.id,
    },
  });

  console.log("📄 Artigos created:", { 
    artigo1: artigo1.title, 
    artigo2: artigo2.title,
    artigo3: artigo3.title,
    artigo4: artigo4.title
  });

  // Create blocks for React article
  await prisma.bloco.upsert({
    where: { id: 1 },
    update: {},
    create: {
      type: BlocoType.TEXTO,
      order: 1,
      content: {
        text: "React é uma biblioteca JavaScript para construir interfaces de usuário. Desenvolvida pelo Facebook, ela permite criar aplicações web interativas e dinâmicas de forma eficiente.",
        style: {
          fontSize: "medium",
          textAlign: "left",
          fontWeight: "normal",
          fontStyle: "normal",
          color: "#000000"
        }
      },
      artigoId: artigo1.id,
    },
  });

  await prisma.bloco.upsert({
    where: { id: 2 },
    update: {},
    create: {
      type: BlocoType.TEXTO,
      order: 2,
      content: {
        text: "Os componentes são a base do React.",
        style: {
          fontSize: "large",
          textAlign: "center",
          fontWeight: "bold",
          fontStyle: "normal",
          color: "#2563eb"
        }
      },
      artigoId: artigo1.id,
    },
  });

  await prisma.bloco.upsert({
    where: { id: 3 },
    update: {},
    create: {
      type: BlocoType.IMAGEM,
      order: 3,
      content: {
        url: "https://example.com/react-diagram.png",
        alt: "Diagrama de componentes React",
        caption: "Estrutura básica de componentes React",
        style: {
          width: "100%",
          textAlign: "center"
        }
      },
      artigoId: artigo1.id,
    },
  });

  // Create blocks for Node.js article
  await prisma.bloco.upsert({
    where: { id: 4 },
    update: {},
    create: {
      type: BlocoType.TEXTO,
      order: 1,
      content: {
        text: "Node.js é um ambiente de execução JavaScript server-side. Com ele, podemos criar APIs RESTful robustas e escaláveis."
      },
      artigoId: artigo2.id,
    },
  });

  await prisma.bloco.upsert({
    where: { id: 5 },
    update: {},
    create: {
      type: BlocoType.VIDEO,
      order: 2,
      content: {
        url: "https://example.com/nodejs-tutorial.mp4",
        title: "Tutorial Node.js API",
        duration: "15:30"
      },
      artigoId: artigo2.id,
    },
  });

  // Create blocks for ML article
  await prisma.bloco.upsert({
    where: { id: 6 },
    update: {},
    create: {
      type: BlocoType.TEXTO,
      order: 1,
      content: {
        text: "Machine Learning é uma área da inteligência artificial que permite aos computadores aprender e tomar decisões baseadas em dados, sem serem explicitamente programados para cada tarefa."
      },
      artigoId: artigo3.id,
    },
  });

  // Create blocks for PBL article
  await prisma.bloco.upsert({
    where: { id: 7 },
    update: {},
    create: {
      type: BlocoType.TEXTO,
      order: 1,
      content: {
        text: "A Aprendizagem Baseada em Projetos (PBL) é uma metodologia ativa que coloca o aluno no centro do processo de aprendizagem, desenvolvendo projetos reais e significativos."
      },
      artigoId: artigo4.id,
    },
  });

  console.log("🧩 Blocos created for all articles");

  // Add some favorites
  await prisma.favorite.upsert({
    where: {
      userId_artigoId: {
        userId: user.id,
        artigoId: artigo1.id,
      },
    },
    update: {},
    create: {
      userId: user.id,
      artigoId: artigo1.id,
    },
  });

  await prisma.favorite.upsert({
    where: {
      userId_artigoId: {
        userId: user.id,
        artigoId: artigo3.id,
      },
    },
    update: {},
    create: {
      userId: user.id,
      artigoId: artigo3.id,
    },
  });

  // Add some readings
  await prisma.reading.upsert({
    where: {
      userId_blocoId: {
        userId: user.id,
        blocoId: 1,
      },
    },
    update: {},
    create: {
      userId: user.id,
      blocoId: 1,
    },
  });

  await prisma.reading.upsert({
    where: {
      userId_blocoId: {
        userId: user.id,
        blocoId: 2,
      },
    },
    update: {},
    create: {
      userId: user.id,
      blocoId: 2,
    },
  });

  console.log("⭐ Favorites and readings created");

  console.log("✅ Database seed completed successfully!");
  console.log("\n📋 Summary:");
  console.log("- 2 users created (admin@matrizes.com / user@matrizes.com)");
  console.log("- 2 ambientes created");
  console.log("- 3 subambientes created");
  console.log("- 4 artigos created");
  console.log("- 7 blocos created");
  console.log("- Sample favorites and readings added");
  console.log("\n🔑 Login credentials:");
  console.log("Admin: admin@matrizes.com / admin123");
  console.log("User: user@matrizes.com / user123");
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
