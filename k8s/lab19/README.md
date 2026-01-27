### Lab 19: Node-Wide Pod Management with DaemonSet
### Objective
In this lab, we deployed a DaemonSet to ensure that a monitoring pod runs on every node in the Kubernetes cluster. We used Prometheus Node Exporter to collect system-level metrics from each node.

### Step 1: Create Monitoring Namespace
```bash
kubectl create namespace monitoring
```
- Verify
```bash
kubctl get ns
```

### Step 2: Deploy Node Exporter as a DaemonSet
We created a DaemonSet so that one pod runs on each node.
```bash
vim node-exporter-ds.yaml
````
```bash
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: node-exporter
  namespace: monitoring
  labels:
    app: node-exporter
spec:
  selector:
    matchLabels:
      app: node-exporter
  template:
    metadata:
      labels:
        app: node-exporter
    spec:
      tolerations:
        - operator: "Exists"   # يسمح بالعمل على كل النودز حتى لو عليها taints

      containers:
        - name: node-exporter
          image: prom/node-exporter:latest
          ports:
            - containerPort: 9100
              name: metrics
          resources:
            requests:
              cpu: 50m
              memory: 50Mi
            limits:
              cpu: 100m
              memory: 100Mi

```

### Step 3: Verify Pods on All Nodes
```bash
kubectl get pods -n monitoring -o wide
```
- Each node should have one node-exporter pod.


### Step 4: Expose Metrics via Service
```bash
vim  node-exporter-svc.yaml
```

### Step 5: Access Node Metrics

- Get Minikube IP:
``bash
minikube ip
```
```bash
Open in browser:
http://<MINIKUBE-IP>:30910/metrics
```



