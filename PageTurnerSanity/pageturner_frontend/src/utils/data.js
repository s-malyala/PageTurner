export const categories = [
    {
      name: 'Fantasy',
      image: 'https://t3.ftcdn.net/jpg/02/81/42/82/360_F_281428216_YWRTOqeBWBmtuWxBci02ClnEnI22Fh7e.jpg',
    },
    {
      name: 'Science Fiction',
      image: 'https://assets.telegraphindia.com/telegraph/0b14c9c9-63b9-482a-a66d-c81be41ae79f.jpg',
    },
    {
      name: 'Dystopian',
      image: 'https://edsurge.imgix.net/uploads/post/image/14892/Shutterstock_Superstar-1657816027.jpg?auto=compress%2Cformat&w=1024&h=512&fit=crop',
    },
    {
      name: 'Action & Adventure',
      image: 'https://wwwnc.cdc.gov/travel/images/mountain-biker.jpg',
    },
    {
      name: 'Mystery',
      image: 'https://celadonbooks.com/wp-content/uploads/2020/03/what-is-a-mystery.jpg',
    },
    {
      name: 'Horror',
      image: 'https://anotherimg-dazedgroup.netdna-ssl.com/779/azure/another-prod/410/6/416736.jpg',
    },
    {
      name: 'Thriller & Suspense',
      image: 'https://images-cdn.reedsy.com/discovery/post/48/featured_image/medium_27767f2a8c2f2a2cc5a8b04a345b67a007335e61.jpg',
    },
    {
      name: 'History',
      image: 'https://alameda.edu/wp-content/uploads/2021/07/History.png',
    }, 
    {
      name: 'Romance',
      image: 'https://cdn.pixabay.com/photo/2020/03/21/02/46/romantic-4952533_1280.jpg',
    },
    {
      name: 'Poems',
      image: 'https://i.pinimg.com/236x/46/7c/17/467c17277badb00b638f8ec4da89a358.jpg',
    }, 
    {
      name: 'Short Stories',
      image: 'https://images-production.bookshop.org/spree/lists/hero_images/84919/original/shortstorypanel1.jpg?1620307551',
    },
    {
      name: 'Biography',
      image: 'https://cdn.profoto.com/cdn/053149e/contentassets/d39349344d004f9b8963df1551f24bf4/profoto-albert-watson-steve-jobs-pinned-image-original.jpg?width=1280&quality=75&format=jpg',
    },
    {
      name: 'Art',
      image: 'https://cdn.pixabay.com/photo/2016/12/15/20/21/texture-1909992__480.jpg',
    }, 
  ];

  export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
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
  
  export const pinDetailQuery = (pinId) => {
    const query = `*[_type == "pin" && _id == '${pinId}']{
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
  
  export const pinDetailMorePinQuery = (pin) => {
    const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
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
  
  export const searchQuery = (searchTerm) => {
    const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
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
  
  export const userQuery = (userId) => {
    const query = `*[_type == "user" && _id == '${userId}']`;
    return query;
  };
  
  export const userCreatedPinsQuery = (userId) => {
    const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
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
  
  export const userSavedPinsQuery = (userId) => {
    const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
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