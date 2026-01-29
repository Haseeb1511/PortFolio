backend ==> render

fronedn  ==> netligy (no cicd need as )

# Backend deployment
Step 1: Create a New Web Service on Render

Click New → Web Service.

Select your backend GitHub repo.

Environment: Choose Docker.

Name: Give it a name like fastapi-backend.

Region: Choose the one closest to your users.

docker file location : backend/Dockerfile
Branch: main (or whichever branch you want to deploy).


backend url :  https://portfolio-psnx.onrender.com





# Forned
netlify
build command 

project configuration===> build and deploy
In this set:
Base directory	frontend 
Build command	npm run build 
Publish directory	frontend/dist 



 add env key in netligy ==>VITE_API_URL=https://portfolio-psnx.onrender.com
