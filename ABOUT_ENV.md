# How to create the .env file

The .env file will be created based on .env.example  
The values to be filled are:

## 1. Firebase configuration

```.env
NEXT_PUBLIC_FB_API_KEY=
NEXT_PUBLIC_FB_AUTH_DOMAIN=
NEXT_PUBLIC_FB_PROJECT_ID=
NEXT_PUBLIC_FB_STORAGE_BUCKET=
NEXT_PUBLIC_FB_SENDER_ID=
NEXT_PUBLIC_FB_APP_ID=
NEXT_PUBLIC_FB_MEASUREMENT_ID=
```

Steps to get the credentials:

- Go to the [Firebase Console](https://console.firebase.google.com/).
- Create a new project or select an existing one.
- Navigate to Project Settings > General.
- Under Your apps, click on the Web app (</>) icon to register a new app.
- Copy the config object's values into your `.env` file.

## 2. TMDB configuration

```.env
  NEXT_PUBLIC_TMDB_API=https://api.themoviedb.org/3
  NEXT_PUBLIC_TMDB_API_KEY=
  NEXT_PUBLIC_TMBD_IMAGE_URL=https://image.tmdb.org/t/p/original/
```

Steps to get TMDB API KEY

- Go to the [TMDB website](https://www.themoviedb.org/).
- Sign up or log in to your account.
- Navigate to Account Settings > API.
- Request an API key if you don't have one already.
- Copy your API key into your `.env` file.

## 3. Video Streaming API

```.env
NEXT_PUBLIC_STREAM_URL_AGG=
NEXT_PUBLIC_STREAM_URL_VID=
NEXT_PUBLIC_STREAM_URL_PRO=
NEXT_PUBLIC_STREAM_URL_EMB=
NEXT_PUBLIC_STREAM_URL_MULTI=
NEXT_PUBLIC_STREAM_URL_SUP=
```

These are all the different streaming services used, that can't be disclosed directly.  
But I can give you a hint..

> [!TIP]  
> We offer free streaming links for movies and episodes that can be  
> effortlessly integrated into your website through our embed links, API

You can do some research over internet using this quote to get the services.  
And if you are going to create your own website, then I would recommend to go through [github-issue](https://github.com/AdvithGopinath/LetMeWatch/issues/4).  
They have created a list of services, but some may have stopped working, still you will get working ones also.  
If you do some researching, then you will find the right services here.

If there are anymore env vars left, give them any random values, as they were used in dev only and not in prod.

## **Disclaimer**

> [!IMPORTANT]
>
> Rive-Next does not host any files, it merely links to 3rd party services.  
> Legal issues should be taken up with the file hosts and providers.  
> Rive-Next is not responsible for any media files shown by the video providers.

Happy Coding :)
