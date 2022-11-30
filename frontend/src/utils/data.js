export const categories = [
  {
    name: "math",
    image: "https://i.ibb.co/DR6Rwyw/math.png",
  },
  {
    name: "science",
    image: "https://i.ibb.co/FhyjwFy/science.png",
  },
  {
    name: "programming",
    image: "https://i.ibb.co/cbd9jtH/programming.png",
  },
  {
    name: "debugging",
    image: "https://i.ibb.co/6chMmj2/magnifying-glass.png",
  },
  {
    name: "help-wanted",
    image: "https://i.ibb.co/wgp5MCC/help.png",
  },
  {
    name: "history",
    image: "https://i.ibb.co/C2VsLzT/sword.png",
  },
  {
    name: "civics",
    image: "https://i.ibb.co/WPw74DX/city-hall.png",
  },
  {
    name: "art",
    image: "https://i.ibb.co/JRg8q6h/paint-palette.png",
  },
  {
    name: "web",
    image: "https://i.ibb.co/z8grxwX/www.png",
  },
  {
    name: "ML",
    image: "https://i.ibb.co/qkwfGmT/ml.png",
  },
  {
    name: "AI",
    image: "https://i.ibb.co/BV3fgWV/ai.png",
  },
  {
    name: "Accounting",
    image: "https://i.ibb.co/4YzcN4J/accounting.png",
  },
  {
    name: "others",
    image:
      "https://i.pinimg.com/236x/2e/63/c8/2e63c82dfd49aca8dccf9de3f57e8588.jpg",
  },
];

export const userQuery = (userId) => {
  const query = `*[_type=='user' && _id=='${userId}']`;

  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `*[_type=='doubt' && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
    image {
      asset -> {
        url 
      }
    },
    _id,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy -> {
        _id,
        userName,
        image 
      },
    },
  }`;

  return query;
};

export const feedQuery = `*[_type == "doubt"] | order(_createdAt desc) {
  image{
    asset->{
      url
    }
  },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    } `;

export const userfollowers = (userId) => {
  const query = `*[_type == 'user' && _id == '${userId}'] | order(_createdAt desc) {
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const doubtDetailQuery = (doubtId) => {
  const query = `*[_type == "doubt" && _id == '${doubtId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const doubtDetailMoreDoubtQuery = (doubt) => {
  const query = `*[_type == "doubt" && category == '${doubt.category}' && _id != '${doubt._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userCreatedDoubtsQuery = (userId) => {
  const query = `*[ _type == 'doubt' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedDoubtsQuery = (userId) => {
  const query = `*[_type == 'doubt' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};
