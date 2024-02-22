const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.get('/backend-courses', async (req, res) => {
  const client = new MongoClient('mongodb://localhost:27017');

  try {
    await client.connect();
    const db = client.db('mongo-test');
    const courses = await db.collection('courses')
      .find({})
      .project({ _id: 0, '1st Year': { description: -1, tags: 1 }, '2nd Year': { description: -1, tags: 1 }, '3rd Year': { description: -1, tags: 1 }, '4th Year': { description: -1, tags: 1 } })
      .toArray();

    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
