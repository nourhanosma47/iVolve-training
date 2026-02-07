### Spring Boot GitOps CI/CD Pipeline
####Jenkins | Docker | ArgoCD | Kubernetes####
This repository demonstrates a complete End-to-End CI/CD Pipeline following GitOps best practices. The pipeline automates the entire process from code commit to deployment on a Kubernetes cluster.
------------------------------------------------------------------------------
### Architecture Overview
- The workflow is triggered by a code push to GitHub:
- Continuous Integration (Jenkins): Compiles the Java code, builds a Docker image using Google Jib, and pushes it to Docker Hub.
- Automated Manifest Update: Jenkins updates the Kubernetes deployment.yaml with the new image tag and pushes the changes back to the repository.
- Continuous Delivery (ArgoCD): ArgoCD detects the change in the Git repository and synchronizes the state with the Kubernetes Cluster (Minikube).
------------------------------------------------------------------------------
### Tech Stack
- Backend: Java (Spring Boot)
- Build Tool: Maven
- CI Tool: Jenkins
- Containerization: Docker & Google Jib
- GitOps Tool: ArgoCD
- Orchestration: Kubernetes (Minikube)
- Registry: Docker Hub
-----------------------------------------------------------------------------
### Pipeline Stages (Jenkinsfile)
1. Checkout
Clones the source code from the GitHub repository.

2. Build & Push Image
Uses the Jib Maven Plugin to containerize the application without needing a local Docker daemon.

Image Name: nourhanosama/jenkins-app

Tag: Dynamic tagging using ${BUILD_NUMBER}.

3. Update Manifest
Updates the Kubernetes deployment file using sed.

Target file: argocd/deployment.yaml

Action: Replaces the old image tag with the latest version from the current build.

Push: Commits and pushes the updated manifest back to GitHub using a Personal Access Token (PAT).
----------------------------------------------------------------------------
### setup & Configuration
- Jenkins Credentials
The following credentials must be configured in Jenkins: | ID | Type | Purpose | | :--- | :--- | :--- | | dockerhub-id | Username/Password | To push the image to Docker Hub | | github-token-secret | Username/Password | To push manifest updates to GitHub |

- ArgoCD Application
To sync the application, create an ArgoCD app pointing to:

Project: Default

Source Repository: Your GitHub URL

Path: argocd/

Sync Policy: Automated (Self-heal & Prune enabled)
-----------------------------------------------------------------------------
📈 Key Challenges Overcome
Auth Issues: Resolved 401 Unauthorized by aligning Docker Hub namespaces and credentials.

GitOps Flow: Successfully automated the "write-back" to Git, ensuring the Git repository remains the "Single Source of Truth."

ImagePullBackOff: Fixed manifest naming conventions to ensure Kubernetes successfully pulls the image from the registry.
