# NodeJS Application with MySQL on Kubernetes (Labs 16 & 17)

This project demonstrates deploying a NodeJS application on Kubernetes with a MySQL backend.  
Lab16 focuses on **Init Containers** and **pre-deployment database setup**, while Lab17 focuses on **Pod Resource Management** with CPU and Memory Requests & Limits.

---

## 🧩 Project Overview

- **NodeJS Application:** A sample NodeJS app running on Kubernetes.
- **MySQL Database:** MySQL 5.7 pod with pre-created database and user.
- **Init Container:** Ensures that the database `ivolve` and user `ivolveuser` are created before the main NodeJS container starts. (Lab16)
- **Secrets:** Securely store the MySQL root password.
- **ConfigMaps:** Store application environment variables.
- **Resource Management:** CPU and Memory Requests and Limits for NodeJS Pod. (Lab17)

### update deployment.yaml
```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nodejs-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nodejs
  template:
    metadata:
      labels:
        app: nodejs
    spec:
      containers:
      - name: nodejs
        image: nourhanosama/nodejs-app:latest
        ports:
        - containerPort: 3000
        env:
        - name: DB_HOST
          value: "mysql-headless"
        - name: DB_USER
          value: "ivolveuser"
        - name: DB_PASSWORD
          value: "ivolvepass"
        - name: DB_NAME
          value: "ivolve"
        resources:
          requests:
            cpu: "1"      # 1 vCPU
            memory: "1Gi" # 1GiB RAM
          limits:
            cpu: "2"      # 2 vCPU
            memory: "2Gi" # 2GiB RAM
```
### Apply Deployment
```bash
kubectl apply -f deployment.yaml
```

### Verify Requests & Limits
```bash
kubectl describe pod nodejs-deployment-xxxx
```
### Monitor real-time usage (Metrics Server required)
```bash
kubectl top pod
```

Key Takeaways:
Requests: Minimum resources Kubernetes will allocate to a Pod.
Limits: Maximum resources a Pod can use.
Proper resource management prevents resource starvation and ensures fair scheduling.
Metrics Server is required to monitor live usage with kubectl top pod.

Conclusion:
Pod Resource Management is essential for stable and efficient Kubernetes deployments, especially for production workloads. Requests & Limits help the scheduler allocate resources correctly and protect nodes from being overloaded.
