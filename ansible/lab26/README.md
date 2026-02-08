# Automated Web Server Configuration Using Ansible Playbooks

## Objective
The goal of this lab is to:
- Create an Ansible playbook to automate the configuration of a web server.
- Install Nginx.
- Customize the web page.
- Verify the configuration on the managed node.
---
## Lab Environment
- **Control Node:** Machine with Ansible installed.
- **Managed Node:** Ubuntu server to be configured.
- **Web Server:** Nginx
---

## Step 1: Create the Playbook
- On the control node, create a file named `webserver.yml`:
```bash
vim webserver.yml
```
---
## Step 2: Run the Playbook
- Execute the playbook:
```bash
ansible-playbook -i inventory webserver.yml
```
Expected output (summary):

ok: [192.168.142.131]
changed: [192.168.142.131]
---
## Step 3: Verify the Web Server
- Open a web browser and navigate to:
```bash
http://192.168.142.131
```
- Expected output:
<h1>Welcome from Ansible!</h1>
----
## Result
- Nginx installed successfully on the managed node.
- Nginx service started and enabled.
- Web page customized using Ansible playbook.
----
## Key Concepts Learned
- Ansible playbooks structure.
- Package installation using apt.
- Service management (start, enable).
- File deployment using copy module.
- Automating server configuration across nodes.
