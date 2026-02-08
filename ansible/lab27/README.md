# Lab 27 - Configure Docker, kubectl, and Jenkins with Ansible

## Description
This lab demonstrates how to automate the installation and configuration of Docker, kubectl, and Jenkins on a managed node using **Ansible roles**.  

---

## Requirements
- **Ansible** installed on the control machine (Ubuntu 22.04 or similar)
- Managed node with **Ubuntu** (IP: `192.168.142.131` in this lab)
- Internet access from the control machine and managed node
- Docker installed on the managed node (optional if using the Ansible role)
- Python 3.8+ on the managed node

---

## Roles
1. **docker** - Installs Docker and starts/enables the Docker service
2. **kubectl** - Copies the `kubectl` binary to the managed node
3. **jenkins** - Installs Java, downloads Jenkins key, adds Jenkins repository, and configures Jenkins

---

## Setup

### 1.  Prepare inventory file
- Create an `inventory` file containing your managed node
----
### 2. Run the Playbook 
```bash
ansible-playbook -i inventory setup_roles.yml --ask-become-pass
```
- Enter your sudo password when prompted.
The playbook will install and configure Docker, kubectl, and Jenkins.

## Testing the Setup
- Docker
```bash
ssh nourhan@<IP>
docker ps
docker --version
```
- kubectl
```bash
kubectl version --client
```
- Jenkins
Open a browser and go to:
```bash
http://<IP>:8080
```
- If running Jenkins in Docker, get the initial admin password:
```bash
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
``` 
-----------------
### Notes
- If Jenkins apt installation fails due to GPG issues, use the official Docker image:
```bash
sudo docker pull jenkins/jenkins:lts
sudo docker run -d -p 8080:8080 -p 50000:50000 --name jenkins jenkins/jenkins:lts
```
- Remove any existing Jenkins container if the name is already used:
```bash
docker rm -f jenkins
```
