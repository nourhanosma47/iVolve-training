### Lab 20: Securing Kubernetes with RBAC and Service Accounts
### Lab Objective
Secure Kubernetes cluster resources using RBAC and Service Accounts.
Specifically, create a Service Account for Jenkins that can read Pods but cannotmodify or delete them.

1️⃣ Create Namespace
```bash
kubectl create namespace ivolve
```
- Verify:
```bash
kubectl get ns
```

2️⃣ Create Service Account
```bash
kubectl create serviceaccount jenkins-sa -n ivolve
kubectl get sa -n ivolve
```

3️⃣ Create Secret and Link to Service Account
```bash
kubectl create secret generic jenkins-sa-token \
  --from-literal=token="my-super-secret-token" \
  -n ivolve

kubectl patch sa jenkins-sa \
  -p '{"secrets":[{"name":"jenkins-sa-token"}]}' \
  -n ivolve
```

- Verify:
```bash
kubectl get sa jenkins-sa -n ivolve -o yaml
```

- Output should show the secret linked to the SA:
```bash
secrets:
- name: jenkins-sa-token
```


4️⃣ Create Role pod-reader
```bash
vim pod-reader-role.yaml
```
- Apply:
```bash
kubectl apply -f pod-reader-role.yaml
kubectl get role -n ivolve
```


5️⃣ Create RoleBinding
```bash
vim pod-reader-rolebinding.yaml
```

- Apply:
```bash
kubectl apply -f pod-reader-rolebinding.yaml
kubectl get rolebinding -n ivolve
```


6️⃣ Verify Permissions
- Check if the Service Account can list Pods:
```bash
kubectl auth can-i list pods --as=system:serviceaccount:ivolve:jenkins-sa -n ivolve
```
- Expected:
```bash
yes
```

- Check if the Service Account cannot delete Pods:
```bash
kubectl auth can-i delete pods --as=system:serviceaccount:ivolve:jenkins-sa -n ivolve
```
- Expected:
```bash
no
```
