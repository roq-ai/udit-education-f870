import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { tutorialValidationSchema } from 'validationSchema/tutorials';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.tutorial
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getTutorialById();
    case 'PUT':
      return updateTutorialById();
    case 'DELETE':
      return deleteTutorialById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTutorialById() {
    const data = await prisma.tutorial.findFirst(convertQueryToPrismaUtil(req.query, 'tutorial'));
    return res.status(200).json(data);
  }

  async function updateTutorialById() {
    await tutorialValidationSchema.validate(req.body);
    const data = await prisma.tutorial.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteTutorialById() {
    const data = await prisma.tutorial.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
