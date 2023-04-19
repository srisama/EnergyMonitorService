using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnergyMonitorServices.BusinessEntities
{
    public class Users
    {
        private Int32 userId;
        private String userName;
        private String email;
        private String password;
        private Int32 roleId;

        public Users()
        {
        }

        public Users(Int32 userId,String userName,String email,String password,Int32 roleId)
        {
            this.userId = userId;
            this.userName = userName;
            this.email = email;
            this.password = password;
            this.roleId = roleId;
        }

        public Int32 UserId
        {
            get { return userId; }
            set { userId = value; }
        }

        public String UserName
        {
            get { return userName; }
            set { userName = value; }
        }

        public String Email
        {
            get { return email; }
            set { email = value; }
        }

        public String Password
        {
            get { return password; }
            set { password = value; }
        }
        public Int32 RoleId
        {
            get { return roleId; }
            set { roleId = value; }
        }
    }

}
