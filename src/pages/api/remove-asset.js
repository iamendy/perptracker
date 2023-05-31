import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  try {
    await prisma.asset.delete({
      where: {
        id: parseInt(req.body.assetId),
      },
    });
    res.status(200).json({ message: "deleted succesfully" });
  } catch (e) {
    console.log(e);
  }
}
