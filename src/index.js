const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
const uri = 'mongodb+srv://accesoDB:chachiwachi@test-ut0wm.gcp.mongodb.net/test?retryWrites=true'
MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {

   if(err) {
        console.log('Error occurred...\n',err);
   }
   console.log('Connected...');

   const db = client.db("forum")

   const Posts = db.collection('posts')
   const Comments = db.collection('comments')

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
      console.log('>RESPONSE: ');
      console.log(response);
      
      while(await response.hasNext()){
         console.log('> POST: ');
         let document = await response.next();
         console.log(document);
      }
      return response;
   }

   console.log('Getting all posts as an Array using toArray()')
   allPosts().then(
      res => {
         const getPosts = async () => {
            console.log('> POSTS ARRAY: ');
            var documents = await res.toArray();
            console.log(documents);
            //client.close();
         }
         getPosts();
      },
      err => {
         console.log('> ERROR: ', err);
         //client.close();
      }
   );

   console.log('Getting all posts throught a loop using .next()')
   /*allPosts().then(
      res => {
         const getPosts = async () => {
            while(res.hasNext()){
               console.log('> POST: ');
               let document = await res.next();
               console.log(document);
            }
         }
         getPosts();
         //client.close();
      },
      err => {
         console.log('> ERROR: ', err);
         //client.close();
      }
   );*/

   //console.log('> POSTS: ', postsList)
   
});
