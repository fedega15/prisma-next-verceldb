import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { options } from '../auth/[...nextauth]';

// POST /api/post
// Required fields in body: title, content, movementType
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { title, content, movementType } = req.body;

  const session = await getServerSession(req, res, options);
  if (session) {
    // Crear un objeto separado con todas las propiedades necesarias
    const postData = {
      title: title,
      content: content,
      movementType: movementType,
      author: { connect: { email: session?.user?.email } },
    };

    const result = await prisma.post.create({
      data: postData,
    });

    res.json(result);
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
}
