import { IDB } from '../../../../layx/others/idb/idb.js';

export class DatabaseManager {
  constructor(config) {
    this.config = config;
    this.db = new IDB(
      config.database.name,
      config.database.version,
      this.upgradeDatabase.bind(this)
    );
  }

  upgradeDatabase(db, oldVersion, newVersion) {
    console.log(`Upgrading database from version ${oldVersion} to ${newVersion}...`);
    const { stores } = this.config;

    Object.values(stores).forEach(storeConfig => {
      const { name, options, indexes } = storeConfig;
      if (!db.objectStoreNames.contains(name)) {
        const objectStore = db.createObjectStore(name, options);
        indexes?.forEach(({ name, keyPath, options }) => {
          objectStore.createIndex(name, keyPath, options);
        });
        console.log(`Created store: ${name}`);
      }
    });
  }

  async initialize() {
    try {
      await this.db.open();
      localStorage.setItem('chatDB', true);
      console.log('Database initialized successfully!');
      return true;
    } catch (error) {
      localStorage.setItem('chatDB', false);
      console.error('Database initialization failed:', error);
      return false;
    }
  }

  async addMessage(sessionId, message) {
    try {
      // Get conversation and session info from the database
      const conversation = await this.db.get(this.config.stores.conversations.name, sessionId);
      const sessionInfo = await this.db.get(this.config.stores.sessions.name, sessionId);

      // Append the new message and update the session timestamp
      conversation.messages.push(message);
      sessionInfo.updateTime = Date.now();

      await this.db.put(this.config.stores.conversations.name, conversation);
      await this.db.put(this.config.stores.sessions.name, sessionInfo);
      console.log(`Message added successfully to conversation: ${sessionId}`);
    } catch (error) {
      console.error(`Error adding message to conversation: ${error.message}`);
    }
  }

  async getRecentItems(storeName, count = 10, indexName) {
    try {
      const store = await this.db.store(storeName);
      const index = indexName ? store.index(indexName) : null;
      return new Promise((resolve, reject) => {
        const results = [];
        let counter = 0;
        const request = index
          ? index.openCursor(null, "prev")
          : store.openCursor(null, "prev");

        request.onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor && counter < count) {
            results.push(cursor.value);
            counter++;
            cursor.continue();
          } else {
            resolve(results);
          }
        };

        request.onerror = (event) => {
          console.error('Error getting recent items:', event.target.error);
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error("Error in getRecentItems:", error);
      throw error;
    }
  }

  async createNewSession() {
    try {
      let sessionId = Number(localStorage.getItem('chatSessions')) || 0;
      sessionId += 1;
      localStorage.setItem('chatSessions', sessionId);

      await this.db.add(this.config.stores.conversations.name, { sessionId: sessionId, messages: [] });
      await this.db.add(this.config.stores.sessions.name, {
        sessionId: sessionId,
        creationTime: Date.now(),
        title: `New Chat ${sessionId}`,
        updateTime: Date.now()
      });
      return sessionId;
    } catch (error) {
      console.error('Error creating new session:', error);
      return null;
    }
  }

  async updateChatHistoryTitle(sessionId, newTitle) {
    try {
      const sessionInfo = await this.db.get(this.config.stores.sessions.name, sessionId);
      sessionInfo.title = newTitle;
      await this.db.put(this.config.stores.sessions.name, sessionInfo);
      console.log(`History item updated: ${newTitle}`);
    } catch (error) {
      console.error('Error updating chat history title:', error);
    }
  }
}
