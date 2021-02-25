using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Chat
{
    public class CryptoProvider
    {
        public CryptoProvider() { }

        public string CryptMessage(string message, long? userId)
        {
            var part = GetPartKey(userId);
            return Encrypt(message, part);
        }

        public string DecryptMessage(string message, long? userId)
        {
            var part = GetPartKey(userId);
            return Decrypt(message, part);
        }

        private byte GetPartKey(long? userId)
        {
            var str = userId.ToString();
            if (str.Length == 0)
            {
                return Convert.ToByte(1);
            }
            else if (str.Length > 1)
            {
                return Convert.ToByte($"{str[0]}{str[1]}");
            }
            else
            {
                return Convert.ToByte($"{str[0]}9");
            }
        }

        private string Encrypt(string source, byte part)
        {
            DESCryptoServiceProvider des = new DESCryptoServiceProvider();
            byte[] Key = { 1, part, 14, 15, 16, 17, part, 19 };
            byte[] IV = { 12, 13, part, 15, part, 17, 18, 19 };
            ICryptoTransform encryptor = des.CreateEncryptor(Key, IV);

            try
            {
                byte[] IDToBytes = Encoding.UTF8.GetBytes(source);
                byte[] encryptedID = encryptor.TransformFinalBlock(IDToBytes, 0, IDToBytes.Length);
                return Convert.ToBase64String(encryptedID);
            }
            catch (FormatException)
            {
                return null;
            }
            catch (Exception)
            {
                throw;
            }
        }

        private string Decrypt(string encrypted, byte part)
        {
            byte[] Key = { 1, part, 14, 15, 16, 17, part, 19 };
            byte[] IV = { 12, 13, part, 15, part, 17, 18, 19 };

            DESCryptoServiceProvider des = new DESCryptoServiceProvider();
            ICryptoTransform decryptor = des.CreateDecryptor(Key, IV);

            try
            {
                byte[] encryptedIDToBytes = Convert.FromBase64String(encrypted);
                byte[] IDToBytes = decryptor.TransformFinalBlock(encryptedIDToBytes, 0, encryptedIDToBytes.Length);
                return Encoding.UTF8.GetString(IDToBytes);
            }
            catch (FormatException)
            {
                return null;
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
