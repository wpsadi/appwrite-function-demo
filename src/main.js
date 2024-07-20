import { Client, Query, Users } from 'node-appwrite';
const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};


export default async ({ req, res, log, error }) => {
  const statusCode = 200;
  const client = new Client()
     .setEndpoint('https://cloud.appwrite.io/v1')
     .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
     .setKey(process.env.APPWRITE_API_KEY);

      const user = new Users(client)

     try{
      const {email} = req.query // for getting query parameters
      // const {email} = req.body // for getting body parameters
      if (!email){
        return res.json({
          status:false,
          error: "Email is required"},400,{...cors});
      }
      const srchUse = user.list([Query.equal("email",email)])
      
      if (srchUse.length == 0){
        return res.json({
          status:true,
          found:false,
          message: "User not found"},404,{...cors});
      
      }
      return res.json({
        status:true,
        found:true,
        message: srchUse},200,{...cors});
    
   


     }
     catch(err){
        log.error(err.message);
        return res.json({
          status:false,
          error: err.message
        },500,{...cors});
     }



};
