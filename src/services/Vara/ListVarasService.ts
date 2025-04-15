import prismaClient from "../../prisma";

interface VaraRequest {
  page: number;
  all: boolean;
  name: string;
}

class ListVarasService {
  async execute({ name, page, all }: VaraRequest) {
    let filter = {};

    let where = {
      visible: true,
    };

    if (!all) {
      filter["skip"] = page * 30;
      filter["take"] = 30;
      if (name) {
        where["OR"] = [
          {
            name: {
              contains: name,
              mode: "insensitive",
            },
          },

          {
            judge: {
              contains: name,
              mode: "insensitive",
            },
          },
        ];
      }
    }

    const varasTotal = await prismaClient.vara.count({
      where: where,
    });

    const varas = await prismaClient.vara.findMany({
      where: where,
      orderBy: {
        name: "asc",
      },
      ...filter,
    });

    return { varas, varasTotal };
  }
}

export { ListVarasService };
