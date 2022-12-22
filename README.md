# Background

A demonstration of A Patient Administration Reactjs GUI utilising nodevista and fmql as a backend

 ![Alt text](patadmin.webp?raw=true?raw=true "Patient Administration")

# Gitpod

To run a Gitpod with this repo:

1) Create a free/paid Gitpod account - https://www.gitpod.io/
2) Log into the account
3) Open a new browser tab and add **https://github.com/RamSailopal/fmql-patients-admin** to the address - This will create a new Gitpod cloud instance.
4) Step 3 is for sample only. If you want to make changes to your own repo, first fork this repo and then add that repo after the **gitpod.io/#** prefix to create a new gitpod intance.
5)  Once the message **webpack compiled successfully** can be seen on the screen output, nagivate to the  address:

     https://3001-gitpodaddress
     
     e.g.
     
     https://3001-ramsailopal-fmqlpatient-kwaq1or392o.ws-eu78.gitpod.io
     
 # Local Environment
 
 The environmental variable **GITADD** is used to reference the "backend" fmql server and this should be:
 
 **http:dockerserveraddress:3001**
 
 To set the environment variable, run:
 
     export GITADD="http:dockerserveraddress:3001"
    
     export ZIPADD="http:dockerserveraddress:5000"
     
 Then run:
 
     git clone https://github.com/RamSailopal/fmql-patients-admin.git
     
     cd fmql-patients-admin
     
     docker-compose up

