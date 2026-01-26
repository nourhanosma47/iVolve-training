# NodeJS Application with MySQL on Kubernetes (Lab16)

This project demonstrates deploying a NodeJS application on Kubernetes with a MySQL backend, using **Init Containers**, **Secrets**, and **ConfigMaps**. The lab focuses on pre-deployment database setup and proper Kubernetes best practices.

---

## 🧩 Project Overview

- **NodeJS Application:** A sample NodeJS app running on Kubernetes.
- **MySQL Database:** MySQL 5.7 pod with pre-created database and user.
- **Init Container:** Ensures that the database `ivolve` and user `ivolveuser` are created before the main NodeJS container starts.
- **Secrets:** Used to securely store the MySQL root password.
- **ConfigMaps:** Used for application environment variables.

---

## 🛠️ Components
### 1. create secret yaml
### 2.create service.yaml
### 3. MySQL Pod and Headless Service
- Pod: mysql-0
- Service: mysql-headless (ClusterIP: None)
The pod uses the root password from the Secret and exposes port 3306.

### 4.NodeJS Deployment
- Deployment: nodejs-deployment
- Container: nodejs
- Ports: 3000
- Environment Variables:
- DB_HOST: mysql-headless
- DB_USER: ivolveuser
- DB_PASSWORD: ivolvepass
- DB_NAME: ivolve

### Init Container:
Originally used to pre-create the database and user, but manually created in this lab to avoid Init errors.


### Deployment Steps
```bash
kubectl apply -f secret.yaml
kubectl apply -f pod.yaml
kubectl apply -f service.yaml
```


### Connect to MySQL
```bash
kubectl exec -it mysql-0 -- mysql -u root -p
# Password: rootpassword123
```

### Create Database and User
``bash
CREATE DATABASE ivolve;
CREATE USER 'ivolveuser'@'%' IDENTIFIED BY 'ivolvepass';
GRANT ALL PRIVILEGES ON ivolve.* TO 'ivolveuser'@'%';
FLUSH PRIVILEGES;
```
### Deploy NodeJS App
```bash
kubectl apply -f deployment.yaml
```
```bash
kubectl get pods  //verify pods
```
### Access NodeJS App
```bash
kubectl port-forward svc/nodejs-service 3000:3000
```
