# Lab 15: Node.js Application Deployment with ClusterIP Service on Kubernetes

## Objective
- Deploy a Node.js application with 2 replicas.
- Use a ClusterIP Service to load balance traffic across all pods.
- Attach the application to a Persistent Volume.
- Use ConfigMap and Secret for environment variables.
- Add a toleration to the pod spec.

---

## Requirements
- Kubernetes cluster (Minikube Multi-Node)
- Docker
- kubectl
- Node.js Docker image ready

---

## 1. Create ConfigMap and Secret

**ConfigMap** (`configmap.yaml`):
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: nodejs-config
data:
  NODE_ENV: production
```

### 2. Secret (secret.yaml):
```bash
apiVersion: v1
kind: Secret
metadata:
  name: nodejs-secret
type: Opaque
stringData:
  DB_USER: db_user
  DB_PASS: db_pass
```

### 3. Create PersistentVolumeClaim
- PVC (pvc.yaml):
```bash
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: nodejs-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
  storageClassName: standard
```


### 4. Create Deployment
```bash
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nodejs-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nodejs
  template:
    metadata:
      labels:
        app: nodejs
    spec:
      tolerations:
        - key: "node"
          operator: "Equal"
          value: "worker"
          effect: "NoSchedule"
      containers:
        - name: nodejs-app
          image: nodejs-app:latest
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 3000
          envFrom:
            - configMapRef:
                name: nodejs-config
            - secretRef:
                name: nodejs-secret
          volumeMounts:
            - name: nodejs-storage
              mountPath: /app/data
      volumes:
        - name: nodejs-storage
          persistentVolumeClaim:
            claimName: nodejs-pvc
```




### 5. Create ClusterIP Service
```bash
apiVersion: v1
kind: Service
metadata:
  name: nodejs-service
spec:
  selector:
    app: nodejs
  ports:
    - port: 3000
      targetPort: 3000
  type: ClusterIP
```

### 6. clusteripservice.yaml
```bash
apiVersion: v1
kind: Service
metadata:
  name: nodejs-service
spec:
  selector:
    app: nodejs
  ports:
    - port: 3000
      targetPort: 3000
  type: ClusterIP
```



### 7. Build and Push Docker Image
- Build the image inside Minikube (for Multi-Node cluster):
```bash
minikube -p minikube image build -t nodejs-app:latest .       //This ensures all nodes can access the image without ErrImagePull.
```
- Verify the image exists:
```bash
minikube -p minikube image list
```



### 8.  Apply Resources on the Cluster
```bash
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
kubectl apply -f pvc.yaml
kubectl apply -f deployment.yaml
kubectl apply -f clusteripservice.yaml
kubectl apply -f service.yaml
```

### 9. Verify Pods
```bash
kubectl get pods -l app=nodejs -o wide
```

### 10. Test Application from Another Pod
```bash
kubectl run test --rm -it --image=busybox -- sh
wget -qO- nodejs-service:3000
```



### summery
Sure! Here’s a concise summary for Lab 15:

Lab 15 Summary: Node.js Deployment with ClusterIP on Kubernetes

Objective:
Deploy a Node.js app on Kubernetes with persistent storage, environment variables, tolerations, and load-balanced access using a ClusterIP Service.

Key Steps:

ConfigMap & Secret: Provide environment variables for the app (NODE_ENV, DB credentials).

PersistentVolumeClaim: Attach storage to pods for persistent data.

Deployment:

2 replicas

Mount PVC

Use tolerations for worker node

Pull environment variables from ConfigMap & Secret

ClusterIP Service:

Expose pods on port 3000

Load balances traffic across all replicas

Build Docker Image: Build the Node.js image inside Minikube so all nodes can access it.

Deploy to Cluster: Apply all YAMLs (ConfigMap, Secret, PVC, Deployment, Service).

Test:

Verify pods are Running

Test application from another pod using wget nodejs-service:3000

Check load balancing across replicas

Notes:

targetPort in Service must match Node.js port inside pods.

Use minikube image build for multi-node clusters instead of a registry.

PVC ensures data persistence; tolerations schedule pods on specific nodes.

Outcome: Node.js app running with ClusterIP Service, environment variables applied, persistent storage attached, and traffic balanced across replicas. 


