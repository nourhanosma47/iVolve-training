# Lab 14: StatefulSet with Headless Service

## Objective
The objective of this lab is to deploy MySQL using a StatefulSet in Kubernetes,
with persistent storage, secrets for credentials, tolerations for node taints,
and a headless service to enable direct DNS access to the pods.

---

## Environment
- Kubernetes Cluster: Minikube
- Kubernetes Version: v1.34.0
- Container Runtime: containerd

---

## Steps

### Step 1: Prepare Secret
Create a Secret to store the MySQL root password:

```yaml
vim mysql-secret.yaml 
```

### Step 2: Create StatefulSet
- Define a StatefulSet for MySQL with 1 replica, using:
- Root password from the secret
- PVC for persistent storage at /var/lib/mysql
- Toleration for taint node=worker:NoSchedule

```bash
vim mysql-statefulset.yaml
```
```bash
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql
spec:
  serviceName: mysql-headless
  replicas: 1
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      tolerations:
        - key: "node"
          operator: "Equal"
          value: "worker"
          effect: "NoSchedule"
      containers:
        - name: mysql
          image: mysql:8.0
          env:
            - name: MYSQL_ROOT_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: mysql-secret
                  key: MYSQL_ROOT_PASSWORD
          ports:
            - containerPort: 3306
          volumeMounts:
            - name: mysql-data
              mountPath: /var/lib/mysql
  volumeClaimTemplates:
    - metadata:
        name: mysql-data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 1Gi
```


### Step 3: Create Headless Service
```bash
vim mysql-headless.yaml
```

### step 4: apply yaml files
```bash
kubectl apply -f mysql-secret.yaml
kubectl apply -f mysql-statefulset.yaml
kubectl apply -f mysql-headless.yaml
```


### Step 4: Verify Deployment
```bash
kubectl get pods -l app=mysql     ### Check pods
kubectl get svc mysql-headless    ### Check service
kubectl exec -it mysql-0 -- mysql -uroot -p     ### Connect to MySQL Pod
```


### Result
- StatefulSet with 1 MySQL replica deployed
- Secret used for root password
- Toleration allows scheduling on node=worker:NoSchedule
- PVC mounted at /var/lib/mysql ensures persistent storage
- Headless service created for direct DNS access


### Conclusion
The MySQL StatefulSet was successfully deployed with persistent storage,
proper secret management, and a headless service, following Kubernetes best
practices for stateful applications.


