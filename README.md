# Welcome to my README!!!

Step 1: Add MONGODB_URI to the .env
I sent that info in the email to Bonnie Gibbs letting her know I finished this project.

Step 2 : You'll need to open two terminals.

Terminal 1:
npm i
npm start

Terminal 2:
npm run server

# Approximate time and future work

I believe I spent about 4-5 hours on this.
The app uploads Image data to a mongodb database, with urls pointing to the images stored locally in the uploads folder. It would be a huge improvement to store those image files in s3 buckets and have the url point there.
Also, the name we're searching by is based on the filename of the image at time of upload. An improvement would be to allow the user to rename the image on the website, both before upload and while it's in the gallery.
Finally, I could alter the Image type to include the image resolution at time of upload, then maintain that scale in the gallery.