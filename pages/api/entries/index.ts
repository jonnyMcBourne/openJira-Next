import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';

import { Entry, IEntry } from '../../../models';

type Data = 
    | {message: string}
    | IEntry[]


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getEntries(res)
        case 'POST':
            return postEntry(req,res)
        default:
            return res.status(400).json({ message: "Endpoint does not exist"  });
    }
    
}

const getEntries = async (res: NextApiResponse) => {
    await db.connect();
    const entries = await Entry.find().sort({createdAt: 'ascending'})
    await db.disconect();
    res.status(200).json(entries)
    };

const postEntry = async (req:NextApiRequest,res:NextApiResponse) =>{
    const {description = '',status ='pending'} = req.body;
    const newEntry = new Entry({description,createdAt:Date.now(),status})
    try {
        await db.connect();
        await newEntry.save()
        await db.disconect()
        return res
          .status(201)
          .json({newEntry});
    } catch (error) {
        console.log("ERROR: ",error);
        return res.status(400).json({message:'something went wrong' });
    
        
    }

}