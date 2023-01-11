# Background

A demonstration of A Patient Administration Reactjs GUI utilising nodevista and fmql as a backend

 ![Alt text](patadmin.webp?raw=true?raw=true "Patient Administration")

# Gitpod

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/RamSailopal/fmql-patients-admin) for free (simply create an account)


Once the message **webpack compiled successfully** can be seen on the screen output, navigate to the  address:

     https://3001-gitpodaddress
     
     e.g.
     
     https://3001-ramsailopal-fmqlpatient-kwaq1or392o.ws-eu78.gitpod.io
     
 # Local Environment
 
 The environmental variable **GITADD** is used to reference the "backend" fmql server and this should be:
 
 **http://dockerserveraddress:3001**
 
 Another **ZIPADD** variable is used to reference the "backend" zip api server (to render open street maps for each patient)
 
 To set the environment variables, run:
 
     export GITADD="http://dockerserveraddress:3001"
    
     export ZIPADD="http://dockerserveraddress:5000"
     
 Then run:
 
     git clone https://github.com/RamSailopal/fmql-patients-admin.git
     
     cd fmql-patients-admin
     
     docker-compose up
     
 On completion, navigate to http://localhost:3000

