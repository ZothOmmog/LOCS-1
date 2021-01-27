using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace Chat.DataBaseModels
{
    public partial class LocsBD_DevContext : DbContext
    {
        public LocsBD_DevContext()
        {
        }

        public LocsBD_DevContext(DbContextOptions<LocsBD_DevContext> options)
            : base(options)
        {
        }

        /// <summary>
        /// модель сообщения
        /// </summary>
        public virtual DbSet<ChatMessage> ChatMessages { get; set; }
        /// <summary>
        /// модель хранения токена- значения (для определения юзера)
        /// </summary>
        public virtual DbSet<Token> Tokens { get; set; }
        /// <summary>
        /// модель юзера
        /// </summary>
        public virtual DbSet<Userlist> Userlists { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=LocsBD_Dev;Username=postgres;Password=123");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Russian_Russia.1251");

            modelBuilder.Entity<ChatMessage>(entity =>
            {
                entity.ToTable("chat_message");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Message).HasColumnName("message");

                entity.Property(e => e.RecipientId).HasColumnName("recipient_id");

                entity.Property(e => e.SenderId).HasColumnName("sender_id");

                entity.HasOne(d => d.Recipient)
                    .WithMany(p => p.ChatMessageRecipients)
                    .HasForeignKey(d => d.RecipientId)
                    .HasConstraintName("chat_message_recipient_id_fkey");

                entity.HasOne(d => d.Sender)
                    .WithMany(p => p.ChatMessageSenders)
                    .HasForeignKey(d => d.SenderId)
                    .HasConstraintName("chat_message_sender_id_fkey");
            });

            modelBuilder.Entity<Token>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("tokens");

                entity.Property(e => e.Obj).HasColumnName("obj");

                entity.Property(e => e.Token1).HasColumnName("token");
            });

            modelBuilder.Entity<Userlist>(entity =>
            {
                entity.ToTable("userlist");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Hashpassword)
                    .HasMaxLength(200)
                    .HasColumnName("hashpassword");

                entity.Property(e => e.IdCity).HasColumnName("id_city");

                entity.Property(e => e.Login)
                    .HasMaxLength(40)
                    .HasColumnName("login");

                entity.Property(e => e.Role)
                    .HasMaxLength(40)
                    .HasColumnName("role");

            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
