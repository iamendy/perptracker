import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  //console.log(req.body);
  const subscriber = await prisma.subscriber.create({
    data: {
      proTrader: req.body.proTrader,
      subscriber: req.body.subscriber,
      assetId: parseInt(req.body.assetId),
    },
  });
  res.status(200).json({ message: "subscriber added", subscriber });
}
