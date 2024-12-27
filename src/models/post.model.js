export default class Post {
  constructor(id, userId, title, body, comments) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.body = body;
    this.comments = comments;
  }

  static fromDB(dbRow) {
    return new Post(
      dbRow.id,
      dbRow.userId,
      dbRow.title,
      dbRow.body,
      dbRow.comments
    );
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      title: this.title,
      body: this.body,
      comments: this.comments,
    };
  }
}
