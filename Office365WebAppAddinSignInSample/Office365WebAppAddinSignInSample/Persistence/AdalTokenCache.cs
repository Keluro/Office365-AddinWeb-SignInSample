using Microsoft.IdentityModel.Clients.ActiveDirectory;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Office365WebAppAddinSignInSample.Persistence
{
    public class ADALTokenCache : TokenCache
    {
        private string _userObjectId;
        private UserTokenCache _cache;
        private ApplicationDbContext db = new ApplicationDbContext();

        public DbSet<UserTokenCache> TokenCaches
        {
            get
            {
                return db.UserTokenCaches2;
            }
        }

        public UserTokenCache GenerateCache(string userobjectid, byte[] bytes, DateTime lastWrite)
        {
            return new UserTokenCache
            {
                UserObjectId = userobjectid,
                CachedBits = bytes,
                LastWrite = lastWrite
            };
        }

        public void MarkModified(UserTokenCache item)
        {
            db.Entry(item).State = EntityState.Modified;
        }

        public void SaveChanges()
        {
            db.SaveChanges();
        }


        // constructor
        public ADALTokenCache(string userObjectId)
        {
            // associate the cache to the current user of the web app
            _userObjectId = userObjectId;
            this.AfterAccess = AfterAccessNotification;
            this.BeforeAccess = BeforeAccessNotification;
            this.BeforeWrite = BeforeWriteNotification;

            // look up the entry in the DB
            _cache = TokenCaches.Where(c => c.UserObjectId == _userObjectId)
                .OrderByDescending(c => c.LastWrite).FirstOrDefault();
            // place the entry in memory
            this.Deserialize((_cache == null) ? null : _cache.CachedBits);
        }

        // clean up the DB
        public override void Clear()
        {
            base.Clear();
            var cacheEntries = TokenCaches.Where(c => c.UserObjectId == _userObjectId).ToArray();
            foreach (var cacheEntry in cacheEntries)
            {
                TokenCaches.Remove(cacheEntry);
            }
            if (cacheEntries.Any())
            {
                this.SaveChanges();
            }
        }

        // Notification raised before ADAL accesses the cache.
        // This is your chance to update the in-memory copy from the DB, if the in-memory version is stale
        void BeforeAccessNotification(TokenCacheNotificationArgs args)
        {
            if (_cache == null)
            {
                // first time access
                _cache = TokenCaches.FirstOrDefault(c => c.UserObjectId == _userObjectId);
            }
            else
            {   // retrieve last write from the DB
                var status = TokenCaches.Where(c => c.UserObjectId == _userObjectId)
                            .OrderByDescending(c => c.LastWrite).First();
                // if the in-memory copy is older than the persistent copy
                if (status.LastWrite > _cache.LastWrite)
                //// read from from storage, update in-memory copy
                {
                    _cache = TokenCaches.FirstOrDefault(c => c.UserObjectId == _userObjectId);
                }
            }
            this.Deserialize((_cache == null) ? null : _cache.CachedBits);
        }

        // Notification raised after ADAL accessed the cache.
        // If the HasStateChanged flag is set, ADAL changed the content of the cache
        void AfterAccessNotification(TokenCacheNotificationArgs args)
        {
            // if state changed
            if (this.HasStateChanged)
            {
                if (_cache == null)
                {
                    _cache = this.GenerateCache(_userObjectId, this.Serialize(), DateTime.Now);
                    TokenCaches.Add(_cache);
                }
                else
                {
                    this._cache.LastWrite = DateTime.Now;
                    this._cache.CachedBits = this.Serialize();
                    TokenCaches.Attach(this._cache);
                    //this.GetEntry(this._cache).State = EntityState.Modified;
                }

                this.SaveChanges();
                this.HasStateChanged = false;
            }
        }

        void BeforeWriteNotification(TokenCacheNotificationArgs args)
        {
            // if you want to ensure that no concurrent write take place, use this notification to place a lock on the entry
        }
    }
}