import type { NextApiRequest, NextApiResponse } from 'next'
import {seedData} from '../../database'
import { db } from '../../database';
import { Entry } from '../../models';

type Data = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if(process.env.NODE_ENV === 'production' ){
        return res.status(401).json({message:''})
    }
    try {
            await db.connect();
            await Entry.deleteMany()
            await Entry.insertMany(seedData.entries)
            await db.disconect();
    } catch (error) {
        return res.status(401).json({ message: `error conecting to the db ERROR: ${error}`});
    }

    res.status(200).json({ message: 'Process realized successfully' })
}