# Lab 13: Persistent Storage Setup for Application Logging

## Objective
The objective of this lab is to set up persistent storage for application logs
using Persistent Volumes (PV) and Persistent Volume Claims (PVC) in Kubernetes.

---

## Environment
- Kubernetes Cluster: Minikube
- Kubernetes Version: v1.34.0
- Container Runtime: containerd

---

## Steps

### Step 1: Prepare Node Directory
Create a directory on the node to store application logs:

```bash
sudo mkdir -p /mnt/app-logs
sudo chmod 777 /mnt/app-logs
```

### Step 2: Create Persistent Volume (PV)
```bash 
vim pv.yaml
```
```bash
kubectl apply -f pv.yaml
```
```bash
kubectl get pv
kubectl describe pv app-logs-pv
```

### Step 3: Create Persistent Volume Claim (PVC)
```bash
vim pvc.yaml
kubectl apply -f pvc.yaml   ### Apply the PVC
kubectl get pvc              ### Verify the PVC
kubectl describe pvc app-logs-pvc
```

### Result
- Persistent Volume (PV) of size 1Gi successfully created at /mnt/app-logs
- PVC requesting 1Gi storage successfully bound to the PV
- Access Mode RWX ensures all Pods can read/write to the storage
- Reclaim Policy Retain keeps data even if the PVC is deleted

### Conclusion
Persistent storage for application logs was successfully configured using PV
and PVC in Kubernetes, following best practices for ReadWriteMany access.
