import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../database";
import { Entry, IEntry } from "../../../../models";

type Data =
| {message: string;}
| IEntry

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { id } = req.query;
    
    switch (req.method) {
        case "PUT":
      if (!mongoose.isValidObjectId(id)) {
        return res
          .status(400)
          .json({ message: `there is not a entry with id: ${id}` });
      }
      try {
        await db.connect();
        const entry = await Entry.findById(id);
        if (!entry) {
          await db.disconect();
          return res
            .status(400)
            .json({ message: `there is not a entry with id: ${id}` });
        }
        const { description = entry.description, status = entry.status } = req.body;
        const updated = await Entry.findByIdAndUpdate(id, {description, status},{runValidators:true,new:true});
        res.status(200).json(updated!);
        await db.disconect();
      } catch (error) {
          await db.disconect();
        return res.status(500).json({ message: "Something went wrong" });
      }
    case "DELETE":
      break;
    case 'GET':
      if (!mongoose.isValidObjectId(id)) {
        return res
          .status(400)
          .json({ message: `there is not a entry with id: ${id}` });
      }

      try {
        await db.connect();
         const entry = await Entry.findById(id);
         
         if (!entry) {
           await db.disconect();
           return res
             .status(400)
             .json({ message: `there is not a entry with id: ${id}` });
         }
         db.disconect();
         return res
           .status(200)
           .json(entry);
      } catch (error) {
        return res.status(500).json({message:'something went wrong'});
      }

    default:
      return res.status(400).json({ message: "invalid method" });
  }

}
