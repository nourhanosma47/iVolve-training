### Lab 18: Control Pod-to-Pod Traffic via Network Policy

This project demonstrates deploying a NodeJS application on Kubernetes with a MySQL backend.  
It covers **Init Containers**, **Resource Management**, and **Pod-to-Pod Traffic Control** using NetworkPolicy.

---

## 🧩 Project Overview

- **NodeJS Application:** Sample NodeJS app running on Kubernetes.  
- **MySQL Database:** MySQL 5.7 pod with pre-created database and user.  
- **Secrets & ConfigMaps:** Secure storage of passwords and environment variables.  
- **NetworkPolicy (Lab18):** Restricts MySQL access to NodeJS pods only.  

---

### Components

### create networkpolicy.yaml
```bash
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-app-to-mysql
spec:
  podSelector:
    matchLabels:
      app: mysql
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: nodejs
    ports:
    - protocol: TCP
      port: 3306
```

### Verification

1. From NodeJS Pod (allowed):
```bash
kubectl exec -it nodejs-deployment-xxxx -- nc -zv mysql-headless 3306
# Should succeed
```
2. from other Pod (not allowed):
```bash
kubectl run test-pod --rm -it --image=busybox -- /bin/sh
nc -zv mysql-headless 3306
```


### Key Takeaways
- Restricts MySQL access to NodeJS pods only
- PolicyTypes: Ingress controls only incoming traffic
- PodSelector targets specific pods
- Ports limit allowed connections


