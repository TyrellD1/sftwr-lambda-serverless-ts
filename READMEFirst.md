# Database setup

1. Create database for prisma
2. Create .env file in root directory
3. Fill in db string from .env.example

Your now ready to start creating schemas in ~/prisma/schema.prisma!

# Environment setup

```
npm i 

# if ts-node is not installed globally
npm i -g ts-node

chmod u+x ./mountFunctions.ts
```

# Creating functions programatically (recommended when adding a new type)

```
./mountFunctions.ts --title <title of db table>
```

In example this

```
./mountFunctions.ts --title video
```

will create the following folders in the functions folder

-functions
|
|-video
|-|
  |-delete-video
  |-get-videos
  |-get-video
  |-put-video

The system will no these routes are delete, get, get, put respectively.

All you have to do is define the schema in put and import the videos into functions/index.ts


Within the confines of this api we use put for creating and updating, unless otherwise notes.

You will always see the method being used in a function in the first word of the folder name.

I.e

put-video
get-all-videos

etc.

This is a convention we stick to because it makes defining handlers much simpler.

(We use the parentFolderName.split('-')[0] as the method name)

This allows us to not have to define the method name again while remaining organized.




