# Initial Ansible Configuration and Ad-Hoc Execution
-------------------------------------------------------------------------------
## Objective
- The goal of this lab is to:
* Install and configure Ansible on the control node.
* Set up SSH key-based authentication.
* Create an inventory for the managed node.
* Execute an ad-hoc command using Ansible.
------------------------------------------------------------------------------
## Lab Environment
* **Control Node:** Machine with Ansible installed.
* **Managed Node:** Target machine to be managed by Ansible.
* **Operating System:** Linux (Ubuntu)
------------------------------------------------------------------------------
## Step 1: Verify Ansible Installation
- Check if Ansible is installed on the control node:
```bash
ansible --version
```
-----------------------------------------------------------------------------
## Step 2: Generate SSH Key on Control Node
- Create a new SSH key:
```bash
ssh-keygen
```
Press **Enter** to accept default values.
----------------------------------------------------------------------------
## Step 3: Copy SSH Public Key to Managed Node
- Transfer the public key to the managed node:
```bash
ssh-copy-id -i ~/.ssh/lab3_key.pub user@MANAGED_NODE_IP
```
---------------------------------------------------------------------------
## Step 4: Test SSH Connectivity
- Verify passwordless SSH access:
```bash
ssh -i ~/.ssh/lab3_key user@MANAGED_NODE_IP
```
Exit the session:
```bash
exit
```
-----------------------------------------------------------------------------
## Step 5: Create Ansible Inventory
- Create a file named `inventory`:
```bash
vim inventory
```

- Add the managed node:

```ini
[managed]
192.168.142.131 ansible_user=nourhan ansible_ssh_private_key_file=~/.ssh/lab3_key
```
- Save and exit.
------------------------------------------------------------------------------
## Step 6: Test Connection Using Ansible
- Run the ping module:
```bash
ansible -i inventory managed -m ping
```
Expected output:
```
SUCCESS => "pong"
```
----------------------------------------------------------------------------
## Step 7: Execute Ad-Hoc Command
Check disk space on the managed node:
```bash
ansible -i inventory managed -a "df -h"
```
--------------------------------------------------------------------------
## Result
* Ansible successfully connected to the managed node.
* SSH key-based authentication configured.
* Inventory created.
* Ad-hoc command executed successfully.
----------------------------------------------------------------------------
## Key Concepts Learned
* Control node vs Managed node.
* SSH key-based authentication.
* Ansible inventory.
* Ad-hoc commands.

