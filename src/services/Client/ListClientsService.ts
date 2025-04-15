import prismaClient from "../../prisma";

interface ClientRequest {
  page: number;
  all: boolean;
  name: string;
}

class ListClientsService {
  async execute({ name, page, all }: ClientRequest) {
    let filter = {};

    let where = {
      visible: true,
    };

    if (!all) {
      filter["skip"] = page * 30;
      filter["take"] = 30;
      if (name) {
        where["name"] = {
          contains: name,
          mode: "insensitive",
        };
      }
    }

    const clientsTotal = await prismaClient.client.count({
      where: where,
    });

    const clients = await prismaClient.client.findMany({
      where: where,
      include: {
        processes: true,
      },
      orderBy: {
        name: "asc",
      },
      ...filter,
    });

    return { clients, clientsTotal };
  }
}

export { ListClientsService };
