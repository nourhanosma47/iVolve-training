# Lab 21: Role-based Authorization in Jenkins

## Objective
Create two users and assign different roles:
- **user1** → Admin
- **user2** → Read-only

## Steps

1. **Install Role-based Authorization Strategy Plugin**
   - Manage Jenkins → Manage Plugins → Available → Install "Role-based Authorization Strategy"

2. **Activate Role Strategy**
   - Manage Jenkins → Configure Global Security → Authorization → Role-Based Strategy → Save

3. **Create Users**
   - Manage Jenkins → Manage Users → Create User
   - Created:
     - user1
     - user2

4. **Create Roles**
   - Manage Jenkins → Manage and Assign Roles → Manage Roles
   - Global Roles:
     - admin → all permissions
     - read-only → read-only permissions

5. **Assign Roles**
   - Manage Jenkins → Manage and Assign Roles → Assign Roles
   - Assignments:
     - user1 → admin
     - user2 → read-only

6. **Test Users**
   - Login with user1 → full access
   - Login with user2 → read-only access


