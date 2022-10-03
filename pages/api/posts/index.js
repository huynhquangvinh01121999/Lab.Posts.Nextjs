import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      var jsonDirectory = path.join(process.cwd(), 'pages/api');
      var fileContents = await fs.readFile(jsonDirectory + '/mock-data.json', 'utf8');
      res.status(200).json(JSON.parse(fileContents));
      break;
    case "POST":
      var newPost = JSON.parse(req.body)
      var jsonDirectory = path.join(process.cwd(), 'pages/api');
      var fileContents = await fs.readFile(jsonDirectory + '/mock-data.json', 'utf8');
      var posts = JSON.parse(fileContents);
      posts.push({ id: posts.length + 1, ...newPost, })

      fs.writeFile(jsonDirectory + '/mock-data.json', JSON.stringify(posts), err => {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });

      res.status(201).json(posts);
      break;
    case "PUT":
      var newPostUpdate = JSON.parse(req.body)
      var jsonDirectory = path.join(process.cwd(), 'pages/api');
      var fileContents = await fs.readFile(jsonDirectory + '/mock-data.json', 'utf8');
      var posts = JSON.parse(fileContents);

      for (var i = 0; i < posts.length; i++) {
        if (posts[i].id == newPostUpdate.id) {
          posts[i] = newPostUpdate;
          break;
        }
      }

      fs.writeFile(jsonDirectory + '/mock-data.json', JSON.stringify(posts), err => {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });

      res.status(201).json("Cập nhật thành công!");
      break;
    case "DELETE":
      var params = req.query;
      var jsonDirectory = path.join(process.cwd(), 'pages/api');
      var fileContents = await fs.readFile(jsonDirectory + '/mock-data.json', 'utf8');
      var posts = JSON.parse(fileContents);

      var results = posts.filter(x => x.id != params.id)

      fs.writeFile(jsonDirectory + '/mock-data.json', JSON.stringify(results), err => {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });

      res.status(201).json("Xóa bài viết thành công!");
      break;
    default:
      res.status(400).json("Not found");
  }
}