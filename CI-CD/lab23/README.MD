🚀 Lab 23: CI/CD Pipeline for Kubernetes Deployment
This repository contains an automated CI/CD Pipeline designed to build, scan, and deploy a containerized application into a Kubernetes (Minikube) cluster using Jenkins Shared Libraries.
-----------------------------------------------------------------------------------------------------------------

🎯 Objectives
The main goal of this lab was to implement a professional DevOps workflow that ensures code quality, security, and automated deployment.
------------------------------------------------------------------------------------------------------------------

🛠️ Infrastructure & Tools
- Jenkins: Orchestrator running as a Docker container. ⚙️
- Kubernetes (Minikube): Container orchestration platform. ⛵
- Docker: Container engine for building and pushing images. 🐳
- Shared Library: Modular Groovy scripts for pipeline reusability. 📚
------------------------------------------------------------------------------------------------------------------

⛓️ Pipeline Stages
- RunUnitTest: Validates the code logic.
- BuildApp: Compiles the application files.
- BuildImage: Packages the app into a Docker image with a dynamic tag (Build ID).
- ScanImage: Performs security checks on the image.
- PushImage: Uploads the image to Docker Hub.
- RemoveImageLocally: Cleans up the environment to optimize storage.
- DeployOnK8s: Applies the Deployment and Service manifests to the cluster.
-------------------------------------------------------------------------------------------------------------------

🧩 Key Solutions & Implementations
Networking: Enabled communication between Jenkins and Minikube by connecting the Jenkins container to the minikube Docker network. 🌐
- Access: Exposed the application using a NodePort service (Port 30001) to make it accessible from the browser. 🔓
- Automation: Integrated kubectl directly into the Jenkins environment to automate the deployment process.
---------------------------------------------------------------------------------------------------------------------

📈 Final Result
The application is successfully deployed as a Pod in Kubernetes, managed by a Deployment, and accessible through a Service.
