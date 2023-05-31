import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  try {
    await prisma.subscriber.update({
      where: {
        id: parseInt(req.body.assetId),
      },
      data: {
        subscribed: false,
      },
    });

    res.status(200).json({ message: "unsubcribed succesfully" });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e.message });
  }
}
