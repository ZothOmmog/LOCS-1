using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

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


        public virtual DbSet<ChatMessage> ChatMessages { get; set; }
        public virtual DbSet<Consumer> Consumers { get; set; }
        public virtual DbSet<FriendList> FriendLists { get; set; }
        public virtual DbSet<Group> Groups { get; set; }
        public virtual DbSet<GroupUser> GroupUsers { get; set; }
        public virtual DbSet<Token> Tokens { get; set; }
        public virtual DbSet<UserLastActivity> UserLastActivity { get; set; }
        public virtual DbSet<Userlist> Userlists { get; set; }
        public virtual DbSet<Visitor> Visitors { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=LocsBD_Dev;Username=postgres;Password=23028");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresExtension("pg_prewarm")
                .HasAnnotation("Relational:Collation", "Russian_Russia.1251");

            modelBuilder.Entity<ChatMessage>(entity =>
            {
                entity.ToTable("chat_message");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Datatime)
                    .HasColumnType("timestamp with time zone")
                    .HasColumnName("datatime")
                    .HasDefaultValueSql("timezone('utc'::text, now())");

                entity.Property(e => e.Deleted)
                    .HasColumnName("deleted")
                    .HasDefaultValueSql("false");

                entity.Property(e => e.GroupId).HasColumnName("group_id");

                entity.Property(e => e.Isread).HasColumnName("isread");

                entity.Property(e => e.Message).HasColumnName("message");

                entity.Property(e => e.SenderId).HasColumnName("sender_id");

                entity.HasOne(d => d.Group)
                    .WithMany(p => p.ChatMessages)
                    .HasForeignKey(d => d.GroupId)
                    .HasConstraintName("chat_message_group_id_fkey");

                entity.HasOne(d => d.Sender)
                    .WithMany(p => p.ChatMessages)
                    .HasForeignKey(d => d.SenderId)
                    .HasConstraintName("chat_message_sender_id_fkey");
            });

            modelBuilder.Entity<Consumer>(entity =>
            {
                entity.ToTable("consumers");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Tag).HasColumnName("tag");

                entity.Property(e => e.Userid).HasColumnName("userid");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Consumers)
                    .HasForeignKey(d => d.Userid)
                    .HasConstraintName("consumers_userid_fkey");
            });

            modelBuilder.Entity<FriendList>(entity =>
            {
                entity.ToTable("friend_list");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Accept)
                    .HasColumnName("accept")
                    .HasDefaultValueSql("false");

                entity.Property(e => e.Deleted)
                    .HasColumnName("deleted")
                    .HasDefaultValueSql("false");

                entity.Property(e => e.IdUser).HasColumnName("id_user");

                entity.Property(e => e.IdUser2).HasColumnName("id_user2");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.FriendListIdUserNavigations)
                    .HasForeignKey(d => d.IdUser)
                    .HasConstraintName("friend_list_id_user_fkey");

                entity.HasOne(d => d.IdUser2Navigation)
                    .WithMany(p => p.FriendListIdUser2Navigations)
                    .HasForeignKey(d => d.IdUser2)
                    .HasConstraintName("friend_list_id_user2_fkey");
            });

            modelBuilder.Entity<Group>(entity =>
            {
                entity.ToTable("groups");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CreatorId).HasColumnName("creator_id");

                entity.Property(e => e.Title).HasColumnName("title");

                entity.HasOne(d => d.Creator)
                    .WithMany(p => p.Groups)
                    .HasForeignKey(d => d.CreatorId)
                    .HasConstraintName("groups_creator_id_fkey");
            });

            modelBuilder.Entity<GroupUser>(entity =>
            {
                entity.ToTable("group_users");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.GroupId).HasColumnName("group_id");

                entity.Property(e => e.IsPersonal)
                    .HasColumnName("is_personal")
                    .HasDefaultValueSql("false");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Group)
                    .WithMany(p => p.GroupUsers)
                    .HasForeignKey(d => d.GroupId)
                    .HasConstraintName("group_users_group_id_fkey");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.GroupUsers)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("group_users_user_id_fkey");
            });

            modelBuilder.Entity<Token>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("tokens");

                entity.Property(e => e.Obj).HasColumnName("obj");

                entity.Property(e => e.token).HasColumnName("token");
            });

            modelBuilder.Entity<UserLastActivity>(entity =>
            {
                entity.ToTable("user_last_activity");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.IsOnline)
                    .HasColumnName("is_online")
                    .HasDefaultValueSql("false");

                entity.Property(e => e.LastActivity)
                    .HasColumnType("timestamp with time zone")
                    .HasColumnName("last_activity")
                    .HasDefaultValueSql("timezone('utc'::text, now())");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserLastActivities)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("user_last_activity_user_id_fkey");
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

            modelBuilder.Entity<Visitor>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("visitor");

                entity.Property(e => e.IdUser).HasColumnName("id_user");

                entity.Property(e => e.Nickname)
                    .HasMaxLength(40)
                    .HasColumnName("nickname");

                entity.Property(e => e.ProfilePicture).HasColumnName("profile_picture");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.IdUser)
                    .HasConstraintName("visitor_id_user_fkey");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
