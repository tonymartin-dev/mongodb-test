//import { afterFind, afterWrite } from './after-queries';
const MongoClient = require('mongodb').MongoClient;
const afterQueries = require('./after-queries');

// replace the uri string with your connection string.
const uri = 'mongodb+srv://accesoDB:chachiwachi@test-ut0wm.gcp.mongodb.net/test?retryWrites=true'
MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {

   //Error management
   if(err) {
      console.log('Error occurred...\n',err);
   }

   console.log('Connected...');

   //DB and collections
   const db = client.db("forum");
   const Posts = db.collection('posts');
   const Comments = db.collection('comments');

   const add2 = async (number) => {

      await Posts.insertMany([
         {
            title: "title n." + number,
            content: "Content of the post n." + number,
            comments: ["first comment in the post n." + number, "second comment in the post n." + number]
         },
         {
            title: "title n." + (number + 1),
            content: "Content of the post n." + (number + 1),
            comments: ["first comment in the post n." + (number + 1), "second comment in the post n." + (number + 1)]
         }
      ])
         
   }

   //add2(2);

   const allPosts = async () => {
      let response = await Posts.find();
      return response;
   }

   console.log('Getting all posts as an Array using toArray()')
   allPosts().then(
      postsResponse => {
         afterQueries.afterFind(postsResponse).then(awaitResponse => {
            //console.log('toArray await' + awaitResponse)
         });
      },
      err => console.log('> ERROR: ', err)
   );

   console.log('Getting all posts throught a loop using .next()')
   allPosts().then(
      postsResponse => {
         afterQueries.afterFindNext(postsResponse).then(awaitResponse => {
            //console.log('next await' + awaitResponse)
         });
      },
      err => console.log('> ERROR: ', err)
   );
   
});
