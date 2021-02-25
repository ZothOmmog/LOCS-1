using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Models
{
    public static class Cookie
    {
        public const string userId = "userId";
        public const string userRole = "userRole";
    }

    public static class ErrorsString
    {
        public const string token = "bad token ";
        public const string permissionsGroup = "not have permissions on group";
        public const string broker = "error add to broker messages";
    }

    public enum SendingErrorEnum
    {
        token = 1,
        permissionsGroup = 2,
        broker = 3,
        serverError = 4
    }
}
