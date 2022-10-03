import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
    var params = req.query;
    const jsonDirectory = path.join(process.cwd(), 'pages/api');
    const fileContents = await fs.readFile(jsonDirectory + '/mock-data.json', 'utf8');
    var post = JSON.parse(fileContents)
        .find(p => p.id == params.id)
    res.status(200).json(post);
}