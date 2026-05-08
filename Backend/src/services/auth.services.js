import userModel from "../models/user.model.js";




 const findOrCreateUser = async ({userData, provider}) => {
  // destructure from Google profile
  const { id, displayName, name, emails, photos } = userData;

  console.log(userData)
    // extract email safely
  const email = emails?.[0]?.value;

  // check if user exists
  const user = await userModel.findOne({
  $or: [
    { googleId: id },
    { githubId: id },
    ...(email ? [{ email }] : []),
  ],
});

  if (user) {
    return user;
  }

  // build full name
  const fullName = name
    ? `${name.givenName || ""} ${name.familyName || ""}`.trim()
    : displayName;



  // create new user

  let newUser;
  if(provider == "google"){
     newUser = await userModel.create({
    fullName: fullName,
    googleId: id,
    ...(email && { email }),
    userImg: photos?.[0]?.value, 
  });

  }else if(provider == "github"){
     newUser = await userModel.create({
    fullName: fullName,
    githubId: id,
    ...(email && { email }),
    userImg: photos?.[0]?.value, 
  });

  }


  

  return newUser;
};


export {findOrCreateUser}