import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  try {
    const newAsset = await prisma.asset.create({
      data: {
        name: req.body.name,
        address: req.body.address,
      },
    });
    res.status(200).json({ asset: newAsset });
  } catch (e) {
    console.log(e);
  }
}
