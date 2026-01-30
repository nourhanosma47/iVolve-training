### lab22:CI/CD Pipeline for Java App with Jenkins, Docker & Kubernetes

This project demonstrates a complete automated lifecycle for a Java application using Jenkins for orchestration, Docker for containerization, and Kubernetes for deployment.

---------------------------------------------------------------------

🛠️ Technology Stack
- Jenkins 🏗️: Orchestrates the entire CI/CD flow.
- Maven 🛠️: Handles project building and testing.
- Docker 🐳: Packages the application into a portable image.
- Kubernetes (K8s) ⛵: Manages the deployment and scaling of the container.
- GitHub 📂: Source Code Management (SCM).

-----------------------------------------------------------------------

🔄 Pipeline Stages
- Clone Source Code: Pulls the latest code from the GitHub repository.
- Run Unit Test: Executes automated tests using mvn test.
- Build App: Compiles the code and creates a JAR file.
- Build Docker Image: Creates a new image tagged with the specific Jenkins build number.
- Push to Docker Hub: Uploads the image to a public/private registry.
- Edit deployment.yaml: Automatically updates the Kubernetes manifest with the new image tag.
- Deploy to K8s: Applies the updated manifest to the cluste

-------------------------------------------------------------------------

🔄CI/CD Pipeline Workflow 
1. Source Code Integration: We automated the process of pulling the latest code from the GitHub repository.
2. Automated Testing: We integrated a stage to run Unit Tests using Maven to ensure code quality before building.
3. Application Packaging: We used Maven to compile the Java code and package it into a JAR file.
4. Containerization: We configured a stage to build a Docker Image using a specific tag based on the build number.
5. Registry Integration: We successfully handled the login and push process to Docker Hub using secure credentials.
6. Local Cleanup: We added a step to remove the Docker image locally after pushing it to save storage space.
7. Manifest Automation: We used a dynamic script (via sed) to automatically update the deployment.yaml file with the latest image tag.
8. Kubernetes Deployment: We implemented the final step to apply the updated configuration to the K8s cluster.
